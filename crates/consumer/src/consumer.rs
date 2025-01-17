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
    state::{create_consumer_state, ConsumerState},
    topics::{unknown::UnknownConsumer, TopicConsumer, TOPIC_CONSUMERS},
};
use eyre::Result;
use lightdotso_kafka::get_consumer;
use lightdotso_state::{create_client_state, ClientState};
use lightdotso_tracing::tracing::{info, warn};
use rdkafka::{
    consumer::{stream_consumer::StreamConsumer, CommitMode, Consumer as KafkaConsumer},
    Message,
};
use std::{collections::HashMap, sync::Arc};

#[derive(Clone)]
pub struct Consumer {
    // Kafka consumer
    consumer: Arc<StreamConsumer>,
    // State
    state: ClientState,
    consumer_state: Option<ConsumerState>,
    // Topics
    topics: Vec<String>,
    topic_consumers: HashMap<String, Arc<dyn TopicConsumer + Send + Sync>>,
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

        // If the topics contain `all`, then set the topics to all topics
        let topics = if args.topics.contains(&"all".to_string()) {
            TOPIC_CONSUMERS.keys().map(|s| s.to_string()).collect()
            // If the topic are empty, panic
        } else if args.topics.is_empty() {
            panic!("No topics specified");
        } else {
            args.topics.clone()
        };

        // Construct the consumer
        let consumer = Arc::new(get_consumer(&group).unwrap());

        // Create a client state
        let state = match create_client_state().await {
            Ok(state) => state,
            Err(e) => {
                warn!("Client state creation failed: {:?}", e);
                return Err(e);
            }
        };

        // Create a consumer state
        let consumer_state = match create_consumer_state().await {
            Ok(consumer_state) => Some(consumer_state),
            Err(e) => {
                warn!("Consumer state creation failed: {:?}", e);
                None
            }
        };

        // Create the consumer
        Ok(Self {
            consumer,
            state,
            consumer_state,
            topics,
            topic_consumers: TOPIC_CONSUMERS.clone(),
        })
    }

    pub async fn run(&self) -> Result<()> {
        info!("Consumer run, starting");

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
                        if let Err(e) =
                            consumer.consume(&state, self.consumer_state.as_ref(), &m).await
                        {
                            warn!("Error processing message for topic {}: {:?}", topic, e);
                        }
                    } else {
                        let consumer = UnknownConsumer;
                        if let Err(e) =
                            consumer.consume(&state, self.consumer_state.as_ref(), &m).await
                        {
                            warn!("Unknown topic consumer error processing message for topic {}: {:?}", topic, e);
                        }
                    }

                    self.consumer.commit_message(&m, CommitMode::Async)?;
                }
            };
        }
    }
}
