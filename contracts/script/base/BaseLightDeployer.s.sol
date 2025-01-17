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

import {ENTRYPOINT_ADDRESS} from "@/constant/address.sol";
import {EntryPoint} from "@/contracts/core/EntryPoint.sol";
import {PackedUserOperation, LightWallet} from "@/contracts/LightWallet.sol";
import {LightWalletFactory} from "@/contracts/LightWalletFactory.sol";
import {LightPaymaster} from "@/contracts/LightPaymaster.sol";
import {BaseTest} from "@/test/base/BaseTest.t.sol";
// solhint-disable-next-line no-console
import {console} from "forge-std/console.sol";
import {stdJson} from "forge-std/StdJson.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import {Surl} from "surl/Surl.sol";

pragma solidity ^0.8.27;

// BaseLightDeployer - Create abstract contract of just immutable storages
abstract contract BaseLightDeployer is BaseTest {
    using Surl for *;
    using stdJson for string;

    // -------------------------------------------------------------------------
    // Setup
    // -------------------------------------------------------------------------

    /// @dev BaseTest setup
    function setUp() public virtual override {
        // Get the entry point
        entryPoint = EntryPoint(ENTRYPOINT_ADDRESS);
    }

    // -------------------------------------------------------------------------
    // Utilities
    // -------------------------------------------------------------------------

    /// @notice Base deployer test for scripts
    /// @dev This contract is used to request gas estimation for a particular chain
    function getGasRequestGasEstimation()
        internal
        returns (uint256 maxFeePerGas, uint256 maxPriorityFeePerGas)
    {
        // Perform a post request with headers and JSON body
        string memory url = getFullUrl();
        string[] memory headers = new string[](1);
        headers[0] = "Content-Type: application/json";
        string memory body =
            '{"id": 1,"jsonrpc":"2.0","method":"gas_requestGasEstimation","params":[]}';

        // Get the response
        (, bytes memory data) = url.post(headers, body);

        // Parse the response
        string memory json = string(data);

        // solhint-disable-next-line no-console
        console.log(json);

        maxFeePerGas = json.readUint(".result.instant.maxFeePerGas");
        maxPriorityFeePerGas = json.readUint(".result.instant.maxPriorityFeePerGas");
    }

    /// @dev Gets the gas parameters and the paymaster and data
    /// The rpc is responsible for calling `eth_estimateUserOperationGas` for the user operation
    /// and returning the `preVerificationGas`, `verificationGasLimit` and `callGasLimit` w/
    /// `paymasterAndData`
    function getPaymasterRequestGasAndPaymasterAndData(
        address _sender,
        uint256 _nonce,
        bytes memory _initCode,
        bytes memory _callData,
        bool _isLightWallet
    )
        internal
        returns (
            uint256 preVerificationGas,
            uint128 verificationGasLimit,
            uint128 callGasLimit,
            bytes memory paymasterAndData,
            uint128 maxFeePerGas,
            uint128 maxPriorityFeePerGas
        )
    {
        // Perform a post request with headers and JSON body
        string memory url = getFullUrl();
        string[] memory headers = new string[](1);
        headers[0] = "Content-Type: application/json";
        string memory body = string(
            abi.encodePacked(
                '{"id": 1,"jsonrpc":"2.0","method":"paymaster_requestGasAndPaymasterAndData","params":[{',
                '"sender":"',
                Strings.toHexString(uint160(_sender), 20),
                '","nonce":"',
                uintToHexString(_nonce),
                '","initCode":"',
                bytesToHexString(_initCode),
                '","callData":"',
                bytesToHexString(_callData),
                _isLightWallet
                    ?
                    '","signature":"0xfffffffffffffffffffffffffffffff0000000000000000000000000000000007aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa1c","paymasterAndData":"0x","callGasLimit":"0x44E1C0","verificationGasLimit":"0x1C4B40","preVerificationGas":"0x1C4B40","maxFeePerGas":"0xD320B3B35","maxPriorityFeePerGas":"0xB323DBB31"}]}'
                    :
                    '","signature":"0xfffffffffffffffffffffffffffffff0000000000000000000000000000000007aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa1c","paymasterAndData":"0x"}]}'
            )
        );

        // Get the response
        (, bytes memory data) = url.post(headers, body);

        // Parse the response
        string memory json = string(data);

        // solhint-disable-next-line no-console
        console.log(json);

        // Parse the params from `eth_estimateUserOperationGas` internal op
        preVerificationGas = json.readUint(".result.preVerificationGas");
        verificationGasLimit = uint128(json.readUint(".result.verificationGasLimit"));
        callGasLimit = uint128(json.readUint(".result.callGasLimit"));

        // Parse the params
        maxFeePerGas = uint128(json.readUint(".result.maxFeePerGas"));
        maxPriorityFeePerGas = uint128(json.readUint(".result.maxPriorityFeePerGas"));
        paymasterAndData = json.readBytes(".result.paymasterAndData");
    }

    /// @dev Gets the estimated gas for a user operation
    /// @notice Not used in the script, because the `paymaster_requestGasAndPaymasterAndData` is
    /// responsible for calling `eth_estimateUserOperationGas`
    /// w/ the associated `preVerificationGas`, `verificationGasLimit` and `callGasLimit`
    function getEthEstimateUserOperationGas(
        address sender,
        bytes memory initCode
    )
        internal
        returns (uint256 preVerificationGas, uint256 verificationGasLimit, uint256 callGasLimit)
    {
        // Perform a post request with headers and JSON body
        string memory url = getFullUrl();
        string[] memory headers = new string[](1);
        headers[0] = "Content-Type: application/json";
        string memory body = string(
            abi.encodePacked(
                '{"id": 1,"jsonrpc":"2.0","method":"eth_estimateUserOperationGas","params":[{',
                '"sender":"',
                Strings.toHexString(uint160(sender), 20),
                '","nonce":"0x0",',
                '"initCode":"',
                bytesToHexString(initCode),
                '","callData":"0x","signature":"0x","paymasterAndData":"0x"},"0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789"]}'
            )
        );

        // Get the response
        (, bytes memory data) = url.post(headers, body);

        // Parse the response
        string memory json = string(data);

        // solhint-disable-next-line no-console
        console.log(json);

        // Parse the params
        preVerificationGas = json.readUint(".result.preVerificationGas");
        verificationGasLimit = json.readUint(".result.verificationGasLimit");
        callGasLimit = json.readUint(".result.callGasLimit");
    }

    /// @dev Sends a user operation to the RPC
    function sendUserOperation(PackedUserOperation memory op) internal {
        // Perform a post request with headers and JSON body
        string memory url = getFullUrl();
        string[] memory headers = new string[](1);
        headers[0] = "Content-Type: application/json";
        string memory body = string(
            abi.encodePacked(
                '{"id": 1,"jsonrpc":"2.0","method":"eth_sendUserOperation","params":[{"sender":"',
                Strings.toHexString(uint160(op.sender), 20),
                '","nonce":"0x0","callData":"0x","initCode":"',
                bytesToHexString(op.initCode),
                '","paymasterAndData":"',
                bytesToHexString(op.paymasterAndData),
                '","signature":"',
                bytesToHexString(op.signature),
                '","accountGasLimits":"',
                bytes32ToHexString(op.accountGasLimits),
                '","preVerificationGas":"',
                uintToHexString(op.preVerificationGas),
                '","gasFees":"',
                bytes32ToHexString(op.gasFees),
                '"},"0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789"]}'
            )
        );

        // solhint-disable-next-line no-console
        console.log(body);

        // Get the response
        (, bytes memory data) = url.post(headers, body);

        // Parse the response
        string memory json = string(data);

        // solhint-disable-next-line no-console
        console.log(json);

        // Get the hash of the UserOperation
        bytes32 userOphash = entryPoint.getUserOpHash(op);

        // solhint-disable-next-line no-console
        console.logBytes32(userOphash);
    }

    /// @dev Sends a user operation to the RPC
    function writeUserOperationJson(PackedUserOperation memory op) internal {
        vm.writeJson(Strings.toHexString(uint160(op.sender), 20), "./tmp.json", ".sender");
        vm.writeJson(uintToHexString(op.nonce), "./tmp.json", ".nonce");
        vm.writeJson(bytesToHexString(op.initCode), "./tmp.json", ".initCode");
        vm.writeJson(bytesToHexString(op.callData), "./tmp.json", ".callData");
        vm.writeJson(bytes32ToHexString(op.accountGasLimits), "./tmp.json", ".accountGasLimits");
        vm.writeJson(uintToHexString(op.preVerificationGas), "./tmp.json", ".preVerificationGas");
        vm.writeJson(bytes32ToHexString(op.gasFees), "./tmp.json", ".gasFees");
        vm.writeJson(bytesToHexString(op.paymasterAndData), "./tmp.json", ".paymasterAndData");
        vm.writeJson(bytesToHexString(op.signature), "./tmp.json", ".signature");
    }

    /// @dev Gets the full URL of the RPC
    function getFullUrl() public view returns (string memory) {
        string memory env = vm.envOr("ENVIRONMENT", string(""));
        // Workaround for comparing strings in solidity
        if (keccak256(abi.encodePacked(env)) == keccak256(abi.encodePacked(string("local")))) {
            return string("http://localhost:3000");
        }

        string memory baseUrl = "https://rpc.light.so/";
        string memory chainId = Strings.toString(block.chainid);
        return string(abi.encodePacked(baseUrl, chainId));
    }

    // From:
    // https://ethereum.stackexchange.com/questions/126899/convert-bytes-to-hexadecimal-string-in-solidity
    // License: GPL-3.0
    /// @dev Converts bytes to hexadecimal string
    function bytesToHexString(bytes memory buffer) public pure returns (string memory) {
        // Fixed buffer size for hexadecimal convertion
        bytes memory converted = new bytes(buffer.length * 2);

        bytes memory _base = "0123456789abcdef";

        for (uint256 i = 0; i < buffer.length; i++) {
            converted[i * 2] = _base[uint8(buffer[i]) / _base.length];
            converted[i * 2 + 1] = _base[uint8(buffer[i]) % _base.length];
        }

        return string(abi.encodePacked("0x", converted));
    }

    /// @dev Converts uint8 to hexadecimal bytes1
    /// From: https://ethereum.stackexchange.com/questions/47472/integer-to-hexadecimal-number
    function toHexDigit(uint8 d) internal pure returns (bytes1) {
        if (0 <= d && d <= 9) {
            return bytes1(uint8(bytes1("0")) + d);
        } else if (10 <= uint8(d) && uint8(d) <= 15) {
            return bytes1(uint8(bytes1("a")) + d - 10);
        }
        // revert("Invalid hex digit");
        revert();
    }

    /// @dev Converts bytes32 to hexadecimal string
    function bytes32ToHexString(bytes32 data) public pure returns (string memory) {
        return bytesToHexString(abi.encodePacked(data));
    }

    /// @dev Converts uint to hexadecimal string
    /// From: https://ethereum.stackexchange.com/questions/47472/integer-to-hexadecimal-number
    function uintToHexString(uint256 a) public pure returns (string memory) {
        if (a == 0) {
            return "0x0";
        }
        uint256 count = 0;
        uint256 b = a;
        while (b != 0) {
            count++;
            b /= 16;
        }
        bytes memory res = new bytes(count);
        for (uint256 i = 0; i < count; ++i) {
            b = a % 16;
            res[count - i - 1] = toHexDigit(uint8(b));
            a /= 16;
        }
        return string(abi.encodePacked("0x", res));
    }
}
