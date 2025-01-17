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

use super::{error::PaymasterOperationError, types::PaymasterOperation};
use crate::{result::AppJsonResult, tags::PAYMASTER_OPERATION_TAG};
use autometrics::autometrics;
use axum::{
    extract::{Query, State},
    Json,
};
use lightdotso_prisma::{billing_operation, paymaster_operation, token_price};
use lightdotso_state::ClientState;
use serde::Deserialize;
use utoipa::IntoParams;

// -----------------------------------------------------------------------------
// Query
// -----------------------------------------------------------------------------

#[derive(Debug, Deserialize, Default, IntoParams)]
#[serde(rename_all = "snake_case")]
#[into_params(parameter_in = Query)]
pub struct ListQuery {
    /// The offset of the first paymaster operation to return.
    pub offset: Option<i64>,
    /// The maximum number of paymaster operations to return.
    pub limit: Option<i64>,
}

// -----------------------------------------------------------------------------
// Handler
// -----------------------------------------------------------------------------

/// List paymaster operations
///
/// Returns a list of paymaster operations with optional filtering.
#[utoipa::path(
        get,
        path = "/paymaster_operation/list",
        params(
            ListQuery
        ),
        responses(
            (status = 200, description = "Paymaster operations returned successfully", body = [PaymasterOperation]),
            (status = 500, description = "Paymaster operation bad request", body = PaymasterOperationError),
        ),
        tag = PAYMASTER_OPERATION_TAG.as_str()
    )]
#[autometrics]
pub(crate) async fn v1_paymaster_operation_list_handler(
    list_query: Query<ListQuery>,
    State(state): State<ClientState>,
) -> AppJsonResult<Vec<PaymasterOperation>> {
    // -------------------------------------------------------------------------
    // Parse
    // -------------------------------------------------------------------------

    // Get the list query.
    let Query(query) = list_query;

    // -------------------------------------------------------------------------
    // DB
    // -------------------------------------------------------------------------

    // Get the paymasters from the database.
    let paymasters = state
        .client
        .paymaster_operation()
        .find_many(vec![])
        .with(
            paymaster_operation::billing_operation::fetch()
                .with(billing_operation::token_price::fetch().with(token_price::token::fetch())),
        )
        .skip(query.offset.unwrap_or(0))
        .take(query.limit.unwrap_or(10))
        .exec()
        .await?;

    // -------------------------------------------------------------------------
    // Return
    // -------------------------------------------------------------------------

    // Change the paymasters to the format that the API expects.
    let paymasters: Vec<PaymasterOperation> =
        paymasters.into_iter().map(PaymasterOperation::from).collect();

    Ok(Json::from(paymasters))
}
