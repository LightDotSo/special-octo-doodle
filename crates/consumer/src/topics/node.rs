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

use super::TopicConsumer;
use crate::state::ConsumerState;
use alloy::primitives::Address;
use async_trait::async_trait;
use eyre::{eyre, Result};
use lightdotso_client::get_user_operation_signature;
use lightdotso_common::traits::VecU8ToHex;
use lightdotso_contracts::{
    address::ENTRYPOINT_V060_ADDRESS, light_wallet::get_light_wallet, types::PackedUserOperation,
};
use lightdotso_db::models::user_operation::get_user_operation_with_chain_id;
use lightdotso_kafka::types::node::NodeMessage;
use lightdotso_prisma::{configuration, PrismaClient};
use lightdotso_state::ClientState;
use lightdotso_tracing::tracing::{info, warn};
use rdkafka::{message::BorrowedMessage, Message};
use std::sync::Arc;

// -----------------------------------------------------------------------------
// Consumer
// -----------------------------------------------------------------------------

pub struct NodeConsumer;

// -----------------------------------------------------------------------------
// Implementation
// -----------------------------------------------------------------------------

#[async_trait]
impl TopicConsumer for NodeConsumer {
    async fn consume(
        &self,
        state: &ClientState,
        consumer_state: Option<&ConsumerState>,
        msg: &BorrowedMessage<'_>,
    ) -> Result<()> {
        // Since we use consumer_state, we need to unwrap it
        let consumer_state = consumer_state.ok_or_else(|| eyre!("Consumer state is None"))?;

        // Convert the payload to a string
        let payload_opt = msg.payload_view::<str>();
        info!("payload_opt: {:?}", payload_opt);

        // If the payload is valid
        if let Some(Ok(payload)) = payload_opt {
            // Parse the payload into a JSON object, `NodeMessage`
            let payload: NodeMessage = serde_json::from_slice(payload.as_bytes())?;
            info!("payload: {:?}", payload);

            // Consume the message
            self.consume_with_message(state, consumer_state, payload).await?;
        }

        Ok(())
    }
}

// -----------------------------------------------------------------------------
// Implementation
// -----------------------------------------------------------------------------

impl NodeConsumer {
    async fn consume_with_message(
        &self,
        state: &ClientState,
        consumer_state: &ConsumerState,
        payload: NodeMessage,
    ) -> Result<()> {
        // Get the hash from the payload
        let hash = payload.hash;
        info!("hash: {:?}", hash);

        // Get the unique user operation from the db
        let (mut uop, chain_id) =
            get_user_operation_with_chain_id(state.client.clone(), hash).await?;

        // Get the configuration id
        let configuration_id =
            get_configuration_id(state.client.clone(), chain_id, uop.sender).await?;

        // Get the user operation signature
        let signature = get_user_operation_signature(hash, configuration_id).await?;

        // Set the signature
        uop.signature = signature.into();

        // Get the entrypoint
        let entrypoint = uop.try_valid_op_hash(chain_id, hash)?;

        // If the entrypoint is v0.6
        if entrypoint == *ENTRYPOINT_V060_ADDRESS {
            // Simulate the user operation
            let res_catch = consumer_state
                .node
                .simulate_user_operation_with_backon(chain_id, entrypoint, &uop)
                .await;

            // Log the response
            info!("res_catch: {:?}", res_catch);

            // Simulate the user operation with the tracer
            let res_catch = consumer_state
                .node
                .simulate_user_operation_with_tracer_with_backon(chain_id, entrypoint, &uop)
                .await;

            // Log the response
            info!("res_catch: {:?}", res_catch);

            // Attempt to submit the user operation to the node
            let res = consumer_state
                .node
                .send_user_operation_with_backon(chain_id, entrypoint, &uop)
                .await;

            // Log the response
            info!("res: {:?}", res);

            if res.is_err() {
                warn!("Failed to send user operation to the node, trying raw...");

                // Send the user operation raw
                let res =
                    consumer_state.node.send_raw_user_operation_with_backon(chain_id, &uop).await;

                // Log the response
                info!("res: {:?}", res);
            }
        } else {
            // Convert the user operation to a packed user operation
            let puop: PackedUserOperation = uop.into();

            // Attempt to submit the packed user operation to the node
            let res = consumer_state
                .node
                .send_packed_user_operation_with_backon(chain_id, entrypoint, &puop)
                .await;

            // If the response is an error
            if res.is_err() {
                warn!("Failed to send packed user operation to the node, trying raw...");

                // Send the packed user operation raw
                let res = consumer_state
                    .node
                    .send_raw_packed_user_operation_with_backon(chain_id, &puop)
                    .await;

                // Log the response
                info!("res: {:?}", res);
            }

            // Log the response
            info!("res: {:?}", res);
        }
        Ok(())
    }
}

// -----------------------------------------------------------------------------
// Utils
// -----------------------------------------------------------------------------

// Inner function to get the configuration id
async fn get_configuration_id(
    db: Arc<PrismaClient>,
    chain_id: u64,
    sender: Address,
) -> Result<Option<String>> {
    // Get the light wallet contract
    let light_wallet_contract = get_light_wallet(chain_id, sender).await?;

    // Get the image from the chain_id
    let image_hash: [u8; 32] = *light_wallet_contract.imageHash().call().await?._0;

    // Get the configuration from the chain_id
    let configuration = db
        .configuration()
        .find_unique(configuration::address_image_hash(
            sender.to_checksum(None),
            image_hash.to_vec().to_hex_string(),
        ))
        .exec()
        .await?;

    // Get the configuration id
    let configuration_id = configuration.map(|c| c.id);

    // Log the configuration id
    info!("configuration_id: {:?}", configuration_id);

    Ok(configuration_id)
}
