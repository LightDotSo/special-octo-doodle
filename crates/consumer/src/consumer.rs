// Copyright 2023-2024 LightDotSo.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

#![allow(clippy::expect_used)]
#![allow(clippy::unwrap_used)]

use crate::{
    config::ConsumerArgs,
    state::ConsumerState,
    topics::{
        activity::activity_consumer, covalent::covalent_consumer,
        interpretation::interpretation_consumer, node::node_consumer,
        notification::notification_consumer, paymaster_operation::paymaster_operation_consumer,
        portfolio::portfolio_consumer, routescan::routescan_consumer,
        transaction::transaction_consumer, unknown::unknown_consumer,
        user_operation::user_operation_consumer, TopicConsumer, TOPIC_CONSUMERS,
    },
};
use clap::Parser;
use eyre::Result;
use lightdotso_billing::config::BillingArgs;
use lightdotso_db::db::{create_client, create_postgres_client};
use lightdotso_hyper::get_hyper_client;
use lightdotso_indexer::config::IndexerArgs;
use lightdotso_kafka::{
    get_consumer, get_producer,
    namespace::{
        ACTIVITY, COVALENT, INTERPRETATION, NODE, NOTIFICATION, PAYMASTER_OPERATION, PORTFOLIO,
        RETRY_TRANSACTION, RETRY_TRANSACTION_0, RETRY_TRANSACTION_1, RETRY_TRANSACTION_2,
        ROUTESCAN, TRANSACTION, USER_OPERATION,
    },
};
use lightdotso_node::config::NodeArgs;
use lightdotso_notifier::config::NotifierArgs;
use lightdotso_polling::config::PollingArgs;
use lightdotso_redis::get_redis_client;
use lightdotso_tracing::tracing::{info, warn};
use rdkafka::{
    consumer::{stream_consumer::StreamConsumer, CommitMode, Consumer as KafkaConsumer},
    message::BorrowedMessage,
    producer::FutureProducer,
    Message,
};
use std::{collections::HashMap, sync::Arc};

#[derive(Clone)]
pub struct Consumer {
    consumer: Arc<StreamConsumer>,
    producer: Arc<FutureProducer>,
    pub state: ConsumerState,
    topics: Vec<String>,
    pub topic_consumers: HashMap<String, Arc<dyn TopicConsumer + Send + Sync>>,
}

impl Consumer {
    pub async fn new(args: &ConsumerArgs) -> Result<Self> {
        info!("Consumer new, starting");

        // If the group is empty, read it from the environment var `FLY_APP_NAME`
        let group = if args.group.is_empty() {
            std::env::var("FLY_APP_NAME").unwrap_or("default".to_string())
        } else {
            args.group.clone()
        };
        info!("Consumer group: {}", group);

        // Panic if the topics are empty
        if args.topics.is_empty() {
            panic!("No topics specified");
        }

        // Construct the consumer
        let consumer = Arc::new(get_consumer(&group).unwrap());

        // Construct the producer
        let producer = Arc::new(get_producer().unwrap());

        // Parse the billing command line arguments
        let billing_args = BillingArgs::parse();
        let billing = Arc::new(billing_args.create().await?);

        // Parse the indexer command line arguments
        let indexer_args = IndexerArgs::parse();
        let indexer = Arc::new(indexer_args.create().await);

        // Create a shared state
        let hyper = Arc::new(get_hyper_client()?);
        let db = Arc::new(create_client().await?);
        let pool = Arc::new(create_postgres_client().await?);
        let redis = Arc::new(get_redis_client()?);
        let state = ConsumerState {
            hyper,
            billing,
            client: db,
            producer: producer.clone(),
            pool,
            redis,
            indexer,
        };

        // Create the consumer
        Ok(Self {
            consumer,
            producer,
            state,
            topics: args.topics.clone(),
            topic_consumers: TOPIC_CONSUMERS.clone(),
        })
    }

    pub async fn run(&self) -> Result<()> {
        info!("Consumer run, starting");

        // Parse the billing command line arguments
        let billing_args = BillingArgs::parse();

        // Parse the command line arguments
        let args = IndexerArgs::parse();

        // Parse the polling command line arguments
        let polling_args = PollingArgs::parse();

        // Parse the node command line arguments
        let node_args = NodeArgs::parse();

        // Parse the notifer command line arguments
        let notifier_args = NotifierArgs::parse();

        // Create the billing
        let _billing = billing_args.create().await?;

        // Create the poller
        let poller = polling_args.create().await?;

        // Create the indexer
        let indexer = args.create().await;

        // Create the node
        let node = node_args.create().await?;

        // Create the notifier
        let notifier = notifier_args.create().await?;

        // Create the db client
        let db = Arc::new(create_client().await.unwrap());

        // Convert the topics to a vector of strings
        let topics: Vec<&str> = self.topics.iter().map(AsRef::as_ref).collect();

        // Create the subscription
        self.consumer.subscribe(&topics[..]).expect("Can't subscribe to specified topics");

        loop {
            match self.consumer.recv().await {
                Err(e) => warn!("Kafka error: {}", e),
                Ok(m) => {
                    let topic = m.topic().to_string();
                    let state = self.state.clone();

                    if let Some(consumer) = self.topic_consumers.get(&topic) {
                        if let Err(e) = consumer.consume(&state, &m).await {
                            warn!("Error processing message for topic {}: {:?}", topic, e);
                        }
                    } else {
                        self.handle_unknown(&m)?;
                    }

                    self.consumer.commit_message(&m, CommitMode::Async)?;

                    match m.topic() {
                        // If the topic is the transaction topic
                        topic
                            if topic == TRANSACTION.to_string() ||
                                topic == RETRY_TRANSACTION.to_string() ||
                                topic == RETRY_TRANSACTION_0.to_string() ||
                                topic == RETRY_TRANSACTION_1.to_string() ||
                                topic == RETRY_TRANSACTION_2.to_string() =>
                        {
                            let _ = transaction_consumer(
                                self.producer.clone(),
                                topic,
                                &m,
                                db.clone(),
                                indexer.clone(),
                            )
                            .await;
                            let _ = self.consumer.commit_message(&m, CommitMode::Async);
                        }
                        topic if topic == ACTIVITY.to_string() => {
                            let res =
                                activity_consumer(self.producer.clone(), &m, db.clone()).await;
                            // If the consumer failed
                            if let Err(e) = res {
                                // Log the error
                                warn!("Activity consumer failed with error: {:?}", e);
                            }
                            let _ = self.consumer.commit_message(&m, CommitMode::Async);
                        }
                        // topic if topic == BILLING_OPERATION.to_string() => {
                        //     let res = billing_operation_consumer(&billing, &m).await;
                        //     // If the consumer failed
                        //     if let Err(e) = res {
                        //         // Log the error
                        //         warn!("Billing operation consumer failed with error: {:?}", e);
                        //     }
                        //     let _ = self.consumer.commit_message(&m, CommitMode::Async);
                        // }
                        topic if topic == COVALENT.to_string() => {
                            let res =
                                covalent_consumer(self.producer.clone(), &m, db.clone()).await;
                            // If the consumer failed
                            if let Err(e) = res {
                                // Log the error
                                warn!("Covalent consumer failed with error: {:?}", e);
                            }
                            let _ = self.consumer.commit_message(&m, CommitMode::Async);
                        }
                        topic if topic == INTERPRETATION.to_string() => {
                            let res = interpretation_consumer(&m, db.clone()).await;
                            // If the consumer failed
                            if let Err(e) = res {
                                // Log the error
                                warn!("Interpretation consumer failed with error: {:?}", e);
                            }
                            let _ = self.consumer.commit_message(&m, CommitMode::Async);
                        }
                        topic if topic == PAYMASTER_OPERATION.to_string() => {
                            let res =
                                paymaster_operation_consumer(self.producer.clone(), &m, db.clone())
                                    .await;
                            // If the consumer failed
                            if let Err(e) = res {
                                // Log the error
                                warn!("Paymaster operation consumer failed with error: {:?}", e);
                            }
                            let _ = self.consumer.commit_message(&m, CommitMode::Async);
                        }
                        topic if topic == PORTFOLIO.to_string() => {
                            let res = portfolio_consumer(&m, db.clone()).await;
                            // If the consumer failed
                            if let Err(e) = res {
                                // Log the error
                                warn!("Portfolio consumer failed with error: {:?}", e);
                            }
                            let _ = self.consumer.commit_message(&m, CommitMode::Async);
                        }
                        topic if topic == ROUTESCAN.to_string() => {
                            let res = routescan_consumer(&m, db.clone()).await;
                            // If the consumer failed
                            if let Err(e) = res {
                                // Log the error
                                warn!("Routescan consumer failed with error: {:?}", e);
                            }
                            let _ = self.consumer.commit_message(&m, CommitMode::Async);
                        }
                        topic if topic == NODE.to_string() => {
                            let res = node_consumer(&m, &node, db.clone()).await;
                            // If the consumer failed
                            if let Err(e) = res {
                                // Log the error
                                warn!("Node consumer failed with error: {:?}", e);
                            }
                            let _ = self.consumer.commit_message(&m, CommitMode::Async);
                        }
                        topic if topic == NOTIFICATION.to_string() => {
                            let res = notification_consumer(&m, &notifier, db.clone()).await;
                            // If the consumer failed
                            if let Err(e) = res {
                                // Log the error
                                warn!("Notification consumer failed with error: {:?}", e);
                            }
                            let _ = self.consumer.commit_message(&m, CommitMode::Async);
                        }
                        // topic if topic == ERROR_TRANSACTION.to_string() => {
                        //     let _ = error_transaction_consumer(&m);
                        //     let _ = self.consumer.commit_message(&m, CommitMode::Async);
                        // }
                        topic if topic == USER_OPERATION.to_string() => {
                            let res = user_operation_consumer(&m, &poller, db.clone()).await;
                            // If the consumer failed
                            if let Err(e) = res {
                                // Log the error
                                warn!("User operation consumer failed with error: {:?}", e);
                            }
                            let _ = self.consumer.commit_message(&m, CommitMode::Async);
                        }
                        _ => {
                            let _ = unknown_consumer(&m);
                            let _ = self.consumer.commit_message(&m, CommitMode::Async);
                        }
                    }
                }
            };
        }
    }

    fn handle_unknown(&self, message: &BorrowedMessage<'_>) -> Result<()> {
        unknown_consumer(message)?;
        Ok(())
    }
}
