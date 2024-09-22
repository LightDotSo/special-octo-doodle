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

// SPDX-License-Identifier: Apache-2.0

pragma solidity ^0.8.27;

import {Initializable} from "@openzeppelin/contracts/proxy/utils/Initializable.sol";
import {EntryPoint} from "@/contracts/core/EntryPoint.sol";
import {LightWallet} from "@/contracts/LightWallet.sol";
import {BaseIntegrationTest} from "@/test/base/BaseIntegrationTest.t.sol";
import {ERC4337Utils} from "@/test/utils/ERC4337Utils.sol";

using ERC4337Utils for EntryPoint;

/// @notice Unit tests for `LightWallet` upgradeability
contract LightWalletProxyIntegrationTest is BaseIntegrationTest {
    // -------------------------------------------------------------------------
    // Setup
    // -------------------------------------------------------------------------

    function setUp() public virtual override {
        // Setup the base factory tests
        BaseIntegrationTest.setUp();
    }

    // -------------------------------------------------------------------------
    // Tests
    // -------------------------------------------------------------------------

    function test_WhenTheProxyIsInitialized() external {
        // It should revert for initialize
        // It should revert on a {Initializable} error
    }

    function test_WhenTheProxyIsNotInitialized() external {
        // It should initialize
        // It should emit a {Initialized} event
    }

    /// Tests that the account can not be initialized twice
    function test_revertWhenAlreadyInitialized_proxy() public {
        // Ensure that the account is not initializable on the implementation contract
        vm.expectRevert(Initializable.InvalidInitialization.selector);
        account.initialize(bytes32(uint256(1)));
    }

    /// Tests that the account is initialized properly
    function test_proxy_initialize() public {
        vm.expectEmit(true, true, true, true);
        emit Initialized(type(uint64).max);
        // Create a new account for the implementation
        account = new LightWallet(entryPoint);
    }
}
