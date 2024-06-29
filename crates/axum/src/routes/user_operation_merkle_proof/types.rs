// Copyright 2023-2024 Light
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

use lightdotso_prisma::user_operation_merkle_proof;
use serde::{Deserialize, Serialize};
use utoipa::ToSchema;

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

/// UserOperationMerkleProof root type.
#[derive(Serialize, Deserialize, ToSchema, Clone)]
#[serde(rename_all = "snake_case")]
pub(crate) struct UserOperationMerkleProof {
    /// The id of the user operation merkle proof.
    id: String,
}

// -----------------------------------------------------------------------------
// From
// -----------------------------------------------------------------------------

/// Implement From<user_operation_merkle_proof::Data> for UserOperationMerkleProofProof.
impl From<user_operation_merkle_proof::Data> for UserOperationMerkleProof {
    fn from(user_operation_merkle_proof: user_operation_merkle_proof::Data) -> Self {
        Self { id: user_operation_merkle_proof.id }
    }
}
