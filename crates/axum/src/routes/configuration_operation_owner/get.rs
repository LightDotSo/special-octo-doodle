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

use super::{error::ConfigurationOperationOwnerError, types::ConfigurationOperationOwner};
use crate::{error::RouteError, result::AppJsonResult, tags::CONFIGURATION_OPERATION_OWNER_TAG};
use autometrics::autometrics;
use axum::{
    extract::{Query, State},
    Json,
};
use lightdotso_prisma::configuration_operation_owner;
use lightdotso_state::ClientState;
use lightdotso_tracing::tracing::info;
use serde::Deserialize;
use utoipa::IntoParams;

// -----------------------------------------------------------------------------
// Query
// -----------------------------------------------------------------------------

#[derive(Debug, Deserialize, Default, IntoParams)]
#[serde(rename_all = "snake_case")]
#[into_params(parameter_in = Query)]
pub struct GetQuery {
    pub id: String,
}

// -----------------------------------------------------------------------------
// Handler
// -----------------------------------------------------------------------------

/// Get a owner
///
/// Gets a owner by id.
#[utoipa::path(
        get,
        path = "/configuration_operation_owner/get",
        params(
            GetQuery
        ),
        responses(
            (status = 200, description = "Configuration operation owner returned successfully", body = ConfigurationOperationOwner),
            (status = 404, description = "Configuration operation owner found", body = ConfigurationOperationOwnerError),
        ),
        tag = CONFIGURATION_OPERATION_OWNER_TAG.as_str()
    )]
#[autometrics]
pub(crate) async fn v1_configuration_operation_owner_get_handler(
    get_query: Query<GetQuery>,
    State(state): State<ClientState>,
) -> AppJsonResult<ConfigurationOperationOwner> {
    // -------------------------------------------------------------------------
    // Parse
    // -------------------------------------------------------------------------

    // Get the get query.
    let Query(query) = get_query;

    info!("Get owner for address: {:?}", query);

    // -------------------------------------------------------------------------
    // DB
    // -------------------------------------------------------------------------

    // Get the owners from the database.
    let configuration_operation_owner = state
        .client
        .configuration_operation_owner()
        .find_unique(configuration_operation_owner::id::equals(query.id))
        .exec()
        .await?;

    // If the configuration owner is not found, return a 404.
    let configuration_operation_owner = configuration_operation_owner.ok_or(
        RouteError::ConfigurationOperationOwnerError(ConfigurationOperationOwnerError::NotFound(
            "Configuration operation owner found".to_string(),
        )),
    )?;

    // -------------------------------------------------------------------------
    // Return
    // -------------------------------------------------------------------------

    // Change the owner to the format that the API expects.
    let configuration_operation_owner: ConfigurationOperationOwner =
        configuration_operation_owner.into();

    Ok(Json::from(configuration_operation_owner))
}
