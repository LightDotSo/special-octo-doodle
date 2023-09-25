// Copyright (C) 2023 Light, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

use crate::{constants::ENTRYPOINT_ADDRESSES, eth_api::EthApiServer};
use async_trait::async_trait;
use ethers::{types::U64, utils::to_checksum};
use jsonrpsee::core::RpcResult;

/// Entire file derved from: https://github.com/Vid201/silius/blob/b1841aa614a9410907d1801128bf500f2a87596f/crates/rpc/src/eth.rs
/// License: MIT or Apache-2.0
/// Thank you to Vid201 for the wonderful work!

/// EthApiServer implements the ERC-4337 `eth` namespace RPC methods trait
/// [EthApiServer](EthApiServer).
pub struct EthApiServerImpl {}

#[async_trait]
impl EthApiServer for EthApiServerImpl {
    /// Retrieve the current [EIP-155](https://eips.ethereum.org/EIPS/eip-155) chain ID.
    ///
    /// # Returns
    /// * `RpcResult<U64>` - The chain ID as a U64.
    async fn chain_id(&self) -> RpcResult<U64> {
        Ok(U64::from(1))
    }

    /// Get the supported entry points for [UserOperations](UserOperation).
    ///
    /// # Returns
    /// * `RpcResult<Vec<String>>` - A array of the entry point addresses as strings.
    async fn supported_entry_points(&self) -> RpcResult<Vec<String>> {
        return Ok(ENTRYPOINT_ADDRESSES.into_iter().map(|ep| to_checksum(&ep, None)).collect());
    }
}
