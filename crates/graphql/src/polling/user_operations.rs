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

use eyre::Result;

#[cynic::schema("graph")]
mod schema {}

#[derive(cynic::QueryVariables, Debug)]
pub struct GetUserOperationQueryVariables<'a> {
    pub id: &'a str,
}

#[derive(cynic::QueryFragment, Debug)]
#[cynic(graphql_type = "Query", variables = "GetUserOperationQueryVariables")]
pub struct GetUserOperationQuery {
    #[arguments(id: $id)]
    pub user_operation: Option<UserOperation>,
    pub _meta: Option<Meta>,
}

#[derive(cynic::QueryVariables, Debug)]
pub struct GetUserOperationsQueryVariables {
    pub min_block: BigInt,
    pub min_index: BigInt,
}

#[derive(cynic::QueryFragment, Clone, Debug)]
#[cynic(graphql_type = "Query", variables = "GetUserOperationsQueryVariables")]
pub struct GetUserOperationsQuery {
    #[arguments(first: 300, where: { blockNumber_gt: $min_block, index_gt: $min_index }, orderBy: "index")]
    pub user_operations: Vec<UserOperation>,
    pub _meta: Option<Meta>,
}

#[derive(cynic::QueryFragment, Clone, Debug)]
#[cynic(graphql_type = "_Meta_")]
pub struct Meta {
    pub block: Block,
}

#[derive(cynic::QueryFragment, Clone, Debug)]
#[cynic(graphql_type = "_Block_")]
pub struct Block {
    pub number: i32,
}

#[derive(cynic::QueryFragment, Clone, Debug)]
pub struct UserOperation {
    pub id: Bytes,
    pub index: BigInt,
    pub sender: Option<Bytes>,
    pub nonce: Option<BigInt>,
    pub init_code: Option<Bytes>,
    pub call_data: Option<Bytes>,
    pub call_gas_limit: Option<BigInt>,
    pub verification_gas_limit: Option<BigInt>,
    pub pre_verification_gas: Option<BigInt>,
    pub max_fee_per_gas: Option<BigInt>,
    pub max_priority_fee_per_gas: Option<BigInt>,
    pub paymaster_and_data: Option<Bytes>,
    pub signature: Option<Bytes>,
    pub block_number: BigInt,
    pub block_timestamp: BigInt,
    pub transaction_hash: Bytes,
    pub entry_point: Bytes,
    pub paymaster: Option<Bytes>,
    pub user_operation_event: Option<UserOperationEvent>,
    pub user_operation_revert_reason: Option<UserOperationRevertReason>,
    pub light_wallet: LightWallet,
    pub transaction: Transaction,
    pub logs: Option<Vec<Log>>,
}

#[derive(cynic::QueryFragment, Clone, Debug)]
pub struct Transaction {
    pub id: Bytes,
    pub hash: Option<Bytes>,
    pub index: Option<BigInt>,
    pub from: Bytes,
    pub to: Option<Bytes>,
    pub value: Option<BigInt>,
    pub gas_limit: Option<BigInt>,
    pub gas_price: Option<BigInt>,
    pub input: Option<Bytes>,
    pub nonce: Option<BigInt>,
    pub receipt: Option<Receipt>,
}

#[derive(cynic::QueryFragment, Clone, Debug)]
pub struct Receipt {
    pub id: Bytes,
    pub transaction_hash: Bytes,
    pub transaction_index: BigInt,
    pub block_hash: Bytes,
    pub block_number: BigInt,
    pub cumulative_gas_used: BigInt,
    pub gas_used: BigInt,
    pub status: BigInt,
    pub logs_bloom: Bytes,
    pub logs: Option<Vec<Log>>,
}

#[derive(cynic::QueryFragment, Clone, Debug)]
pub struct UserOperationRevertReason {
    pub id: Bytes,
    pub index: BigInt,
    pub user_op_hash: Bytes,
    pub sender: Bytes,
    pub nonce: BigInt,
    pub revert_reason: Bytes,
    pub transaction_hash: Bytes,
}

#[derive(cynic::QueryFragment, Clone, Debug)]
pub struct UserOperationEvent {
    pub id: Bytes,
    pub index: BigInt,
    pub user_op_hash: Bytes,
    pub paymaster: Bytes,
    pub nonce: BigInt,
    pub transaction_hash: Bytes,
}

#[derive(cynic::QueryFragment, Clone, Debug)]
pub struct Log {
    pub id: cynic::Id,
    pub address: Bytes,
    pub topics: Option<Vec<Bytes>>,
    pub data: Bytes,
    pub block_hash: Bytes,
    pub block_number: Bytes,
    pub transaction_hash: Bytes,
    pub transaction_index: BigInt,
    pub log_index: BigInt,
}

#[derive(cynic::QueryFragment, Clone, Debug)]
pub struct LightWallet {
    pub id: Bytes,
    pub index: BigInt,
    pub address: Bytes,
    pub image_hash: Option<Bytes>,
    pub user_op_hash: Bytes,
    pub sender: Bytes,
    pub factory: Bytes,
    pub paymaster: Bytes,
    pub block_number: BigInt,
    pub block_timestamp: BigInt,
    pub transaction_hash: Bytes,
}

#[derive(cynic::Enum, Clone, Copy, Debug)]
#[cynic(graphql_type = "UserOperation_orderBy")]
pub enum UserOperationOrderBy {
    #[cynic(rename = "id")]
    Id,
    #[cynic(rename = "index")]
    Index,
    #[cynic(rename = "sender")]
    Sender,
    #[cynic(rename = "nonce")]
    Nonce,
    #[cynic(rename = "initCode")]
    InitCode,
    #[cynic(rename = "callData")]
    CallData,
    #[cynic(rename = "callGasLimit")]
    CallGasLimit,
    #[cynic(rename = "verificationGasLimit")]
    VerificationGasLimit,
    #[cynic(rename = "preVerificationGas")]
    PreVerificationGas,
    #[cynic(rename = "maxFeePerGas")]
    MaxFeePerGas,
    #[cynic(rename = "maxPriorityFeePerGas")]
    MaxPriorityFeePerGas,
    #[cynic(rename = "paymasterAndData")]
    PaymasterAndData,
    #[cynic(rename = "signature")]
    Signature,
    #[cynic(rename = "blockNumber")]
    BlockNumber,
    #[cynic(rename = "blockTimestamp")]
    BlockTimestamp,
    #[cynic(rename = "transactionHash")]
    TransactionHash,
    #[cynic(rename = "entryPoint")]
    EntryPoint,
    #[cynic(rename = "paymaster")]
    Paymaster,
    #[cynic(rename = "lightWallet")]
    LightWallet,
    #[cynic(rename = "lightWallet__id")]
    LightWalletId,
    #[cynic(rename = "lightWallet__index")]
    LightWalletIndex,
    #[cynic(rename = "lightWallet__address")]
    LightWalletAddress,
    #[cynic(rename = "lightWallet__imageHash")]
    LightWalletImageHash,
    #[cynic(rename = "lightWallet__userOpHash")]
    LightWalletUserOpHash,
    #[cynic(rename = "lightWallet__sender")]
    LightWalletSender,
    #[cynic(rename = "lightWallet__factory")]
    LightWalletFactory,
    #[cynic(rename = "lightWallet__paymaster")]
    LightWalletPaymaster,
    #[cynic(rename = "lightWallet__blockNumber")]
    LightWalletBlockNumber,
    #[cynic(rename = "lightWallet__blockTimestamp")]
    LightWalletBlockTimestamp,
    #[cynic(rename = "lightWallet__transactionHash")]
    LightWalletTransactionHash,
    #[cynic(rename = "logs")]
    Logs,
    #[cynic(rename = "transaction")]
    Transaction,
    #[cynic(rename = "transaction__id")]
    TransactionId,
    #[cynic(rename = "transaction__hash")]
    _TransactionHash,
    #[cynic(rename = "transaction__index")]
    TransactionIndex,
    #[cynic(rename = "transaction__from")]
    TransactionFrom,
    #[cynic(rename = "transaction__to")]
    TransactionTo,
    #[cynic(rename = "transaction__value")]
    TransactionValue,
    #[cynic(rename = "transaction__gasLimit")]
    TransactionGasLimit,
    #[cynic(rename = "transaction__gasPrice")]
    TransactionGasPrice,
    #[cynic(rename = "transaction__input")]
    TransactionInput,
    #[cynic(rename = "transaction__nonce")]
    TransactionNonce,
    #[cynic(rename = "userOperationEvent")]
    UserOperationEvent,
    #[cynic(rename = "userOperationEvent__id")]
    UserOperationEventId,
    #[cynic(rename = "userOperationEvent__index")]
    UserOperationEventIndex,
    #[cynic(rename = "userOperationEvent__userOpHash")]
    UserOperationEventUserOpHash,
    #[cynic(rename = "userOperationEvent__sender")]
    UserOperationEventSender,
    #[cynic(rename = "userOperationEvent__paymaster")]
    UserOperationEventPaymaster,
    #[cynic(rename = "userOperationEvent__nonce")]
    UserOperationEventNonce,
    #[cynic(rename = "userOperationEvent__success")]
    UserOperationEventSuccess,
    #[cynic(rename = "userOperationEvent__actualGasCost")]
    UserOperationEventActualGasCost,
    #[cynic(rename = "userOperationEvent__actualGasUsed")]
    UserOperationEventActualGasUsed,
    #[cynic(rename = "userOperationEvent__blockNumber")]
    UserOperationEventBlockNumber,
    #[cynic(rename = "userOperationEvent__blockTimestamp")]
    UserOperationEventBlockTimestamp,
    #[cynic(rename = "userOperationEvent__transactionHash")]
    UserOperationEventTransactionHash,
    #[cynic(rename = "userOperationRevertReason")]
    UserOperationRevertReason,
    #[cynic(rename = "userOperationRevertReason__id")]
    UserOperationRevertReasonId,
    #[cynic(rename = "userOperationRevertReason__index")]
    UserOperationRevertReasonIndex,
    #[cynic(rename = "userOperationRevertReason__userOpHash")]
    UserOperationRevertReasonUserOpHash,
    #[cynic(rename = "userOperationRevertReason__sender")]
    UserOperationRevertReasonSender,
    #[cynic(rename = "userOperationRevertReason__nonce")]
    UserOperationRevertReasonNonce,
    #[cynic(rename = "userOperationRevertReason__revertReason")]
    UserOperationRevertReasonRevertReason,
    #[cynic(rename = "userOperationRevertReason__blockNumber")]
    UserOperationRevertReasonBlockNumber,
    #[cynic(rename = "userOperationRevertReason__blockTimestamp")]
    UserOperationRevertReasonBlockTimestamp,
    #[cynic(rename = "userOperationRevertReason__transactionHash")]
    UserOperationRevertReasonTransactionHash,
}

#[derive(cynic::Scalar, Debug, Clone)]
pub struct BigInt(pub String);

#[derive(cynic::Scalar, Debug, Clone)]
pub struct Bytes(pub String);

pub fn build_user_operation_query(
    vars: GetUserOperationQueryVariables,
) -> cynic::Operation<GetUserOperationQuery, GetUserOperationQueryVariables> {
    use cynic::QueryBuilder;

    GetUserOperationQuery::build(vars)
}

pub async fn run_user_operation_query(
    url: String,
    vars: GetUserOperationQueryVariables<'_>,
) -> Result<cynic::GraphQlResponse<GetUserOperationQuery>> {
    use cynic::http::ReqwestExt;

    let query = build_user_operation_query(vars);

    Ok(reqwest::Client::new().post(url).run_graphql(query).await?)
}

pub fn build_user_operations_query(
    vars: GetUserOperationsQueryVariables,
) -> cynic::Operation<GetUserOperationsQuery, GetUserOperationsQueryVariables> {
    use cynic::QueryBuilder;

    GetUserOperationsQuery::build(vars)
}

pub async fn run_user_operations_query(
    url: String,
    vars: GetUserOperationsQueryVariables,
) -> Result<cynic::GraphQlResponse<GetUserOperationsQuery>> {
    use cynic::http::ReqwestExt;

    let query = build_user_operations_query(vars);

    Ok(reqwest::Client::new().post(url).run_graphql(query).await?)
}

#[cfg(test)]
mod test {
    use super::*;

    #[test]
    fn snapshot_test_query() {
        // Running a snapshot test of the query building functionality as that gives us
        // a place to copy and paste the actual GQL we're using for running elsewhere,
        // and also helps ensure we don't change queries by mistake

        let query = build_user_operations_query(GetUserOperationsQueryVariables {
            min_block: BigInt("0".to_string()),
            min_index: BigInt("0".to_string()),
        });

        insta::assert_snapshot!(query.query);

        let query = build_user_operation_query(GetUserOperationQueryVariables { id: "0x1234" });

        insta::assert_snapshot!(query.query);
    }
}
