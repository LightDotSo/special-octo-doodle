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

// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class AdminChanged extends ethereum.Event {
  get params(): AdminChanged__Params {
    return new AdminChanged__Params(this);
  }
}

export class AdminChanged__Params {
  _event: AdminChanged;

  constructor(event: AdminChanged) {
    this._event = event;
  }

  get previousAdmin(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get newAdmin(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class BeaconUpgraded extends ethereum.Event {
  get params(): BeaconUpgraded__Params {
    return new BeaconUpgraded__Params(this);
  }
}

export class BeaconUpgraded__Params {
  _event: BeaconUpgraded;

  constructor(event: BeaconUpgraded) {
    this._event = event;
  }

  get beacon(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class ImageHashUpdated extends ethereum.Event {
  get params(): ImageHashUpdated__Params {
    return new ImageHashUpdated__Params(this);
  }
}

export class ImageHashUpdated__Params {
  _event: ImageHashUpdated;

  constructor(event: ImageHashUpdated) {
    this._event = event;
  }

  get newImageHash(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }
}

export class Initialized extends ethereum.Event {
  get params(): Initialized__Params {
    return new Initialized__Params(this);
  }
}

export class Initialized__Params {
  _event: Initialized;

  constructor(event: Initialized) {
    this._event = event;
  }

  get version(): i32 {
    return this._event.parameters[0].value.toI32();
  }
}

export class LightWalletInitialized extends ethereum.Event {
  get params(): LightWalletInitialized__Params {
    return new LightWalletInitialized__Params(this);
  }
}

export class LightWalletInitialized__Params {
  _event: LightWalletInitialized;

  constructor(event: LightWalletInitialized) {
    this._event = event;
  }

  get entryPoint(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get hash(): Bytes {
    return this._event.parameters[1].value.toBytes();
  }
}

export class Upgraded extends ethereum.Event {
  get params(): Upgraded__Params {
    return new Upgraded__Params(this);
  }
}

export class Upgraded__Params {
  _event: Upgraded;

  constructor(event: Upgraded) {
    this._event = event;
  }

  get implementation(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class LightWallet__signatureRecoveryResult {
  value0: BigInt;
  value1: BigInt;
  value2: Bytes;
  value3: Bytes;
  value4: BigInt;

  constructor(
    value0: BigInt,
    value1: BigInt,
    value2: Bytes,
    value3: Bytes,
    value4: BigInt
  ) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
    this.value4 = value4;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromUnsignedBigInt(this.value0));
    map.set("value1", ethereum.Value.fromUnsignedBigInt(this.value1));
    map.set("value2", ethereum.Value.fromFixedBytes(this.value2));
    map.set("value3", ethereum.Value.fromFixedBytes(this.value3));
    map.set("value4", ethereum.Value.fromUnsignedBigInt(this.value4));
    return map;
  }

  getThreshold(): BigInt {
    return this.value0;
  }

  getWeight(): BigInt {
    return this.value1;
  }

  getImageHash(): Bytes {
    return this.value2;
  }

  getSubdigest(): Bytes {
    return this.value3;
  }

  getCheckpoint(): BigInt {
    return this.value4;
  }
}

export class LightWallet__validateUserOpInputUserOpStruct extends ethereum.Tuple {
  get sender(): Address {
    return this[0].toAddress();
  }

  get nonce(): BigInt {
    return this[1].toBigInt();
  }

  get initCode(): Bytes {
    return this[2].toBytes();
  }

  get callData(): Bytes {
    return this[3].toBytes();
  }

  get callGasLimit(): BigInt {
    return this[4].toBigInt();
  }

  get verificationGasLimit(): BigInt {
    return this[5].toBigInt();
  }

  get preVerificationGas(): BigInt {
    return this[6].toBigInt();
  }

  get maxFeePerGas(): BigInt {
    return this[7].toBigInt();
  }

  get maxPriorityFeePerGas(): BigInt {
    return this[8].toBigInt();
  }

  get paymasterAndData(): Bytes {
    return this[9].toBytes();
  }

  get signature(): Bytes {
    return this[10].toBytes();
  }
}

export class LightWallet extends ethereum.SmartContract {
  static bind(address: Address): LightWallet {
    return new LightWallet("LightWallet", address);
  }

  NAME(): string {
    let result = super.call("NAME", "NAME():(string)", []);

    return result[0].toString();
  }

  try_NAME(): ethereum.CallResult<string> {
    let result = super.tryCall("NAME", "NAME():(string)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  SET_IMAGE_HASH_TYPE_HASH(): Bytes {
    let result = super.call(
      "SET_IMAGE_HASH_TYPE_HASH",
      "SET_IMAGE_HASH_TYPE_HASH():(bytes32)",
      []
    );

    return result[0].toBytes();
  }

  try_SET_IMAGE_HASH_TYPE_HASH(): ethereum.CallResult<Bytes> {
    let result = super.tryCall(
      "SET_IMAGE_HASH_TYPE_HASH",
      "SET_IMAGE_HASH_TYPE_HASH():(bytes32)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBytes());
  }

  VERSION(): string {
    let result = super.call("VERSION", "VERSION():(string)", []);

    return result[0].toString();
  }

  try_VERSION(): ethereum.CallResult<string> {
    let result = super.tryCall("VERSION", "VERSION():(string)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  entryPoint(): Address {
    let result = super.call("entryPoint", "entryPoint():(address)", []);

    return result[0].toAddress();
  }

  try_entryPoint(): ethereum.CallResult<Address> {
    let result = super.tryCall("entryPoint", "entryPoint():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  getNonce(): BigInt {
    let result = super.call("getNonce", "getNonce():(uint256)", []);

    return result[0].toBigInt();
  }

  try_getNonce(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("getNonce", "getNonce():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  imageHash(): Bytes {
    let result = super.call("imageHash", "imageHash():(bytes32)", []);

    return result[0].toBytes();
  }

  try_imageHash(): ethereum.CallResult<Bytes> {
    let result = super.tryCall("imageHash", "imageHash():(bytes32)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBytes());
  }

  isValidSignature(hash: Bytes, signatures: Bytes): Bytes {
    let result = super.call(
      "isValidSignature",
      "isValidSignature(bytes32,bytes):(bytes4)",
      [
        ethereum.Value.fromFixedBytes(hash),
        ethereum.Value.fromBytes(signatures)
      ]
    );

    return result[0].toBytes();
  }

  try_isValidSignature(
    hash: Bytes,
    signatures: Bytes
  ): ethereum.CallResult<Bytes> {
    let result = super.tryCall(
      "isValidSignature",
      "isValidSignature(bytes32,bytes):(bytes4)",
      [
        ethereum.Value.fromFixedBytes(hash),
        ethereum.Value.fromBytes(signatures)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBytes());
  }

  isValidSignature1(_data: Bytes, _signatures: Bytes): Bytes {
    let result = super.call(
      "isValidSignature",
      "isValidSignature(bytes,bytes):(bytes4)",
      [ethereum.Value.fromBytes(_data), ethereum.Value.fromBytes(_signatures)]
    );

    return result[0].toBytes();
  }

  try_isValidSignature1(
    _data: Bytes,
    _signatures: Bytes
  ): ethereum.CallResult<Bytes> {
    let result = super.tryCall(
      "isValidSignature",
      "isValidSignature(bytes,bytes):(bytes4)",
      [ethereum.Value.fromBytes(_data), ethereum.Value.fromBytes(_signatures)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBytes());
  }

  onERC1155BatchReceived(
    param0: Address,
    param1: Address,
    param2: Array<BigInt>,
    param3: Array<BigInt>,
    param4: Bytes
  ): Bytes {
    let result = super.call(
      "onERC1155BatchReceived",
      "onERC1155BatchReceived(address,address,uint256[],uint256[],bytes):(bytes4)",
      [
        ethereum.Value.fromAddress(param0),
        ethereum.Value.fromAddress(param1),
        ethereum.Value.fromUnsignedBigIntArray(param2),
        ethereum.Value.fromUnsignedBigIntArray(param3),
        ethereum.Value.fromBytes(param4)
      ]
    );

    return result[0].toBytes();
  }

  try_onERC1155BatchReceived(
    param0: Address,
    param1: Address,
    param2: Array<BigInt>,
    param3: Array<BigInt>,
    param4: Bytes
  ): ethereum.CallResult<Bytes> {
    let result = super.tryCall(
      "onERC1155BatchReceived",
      "onERC1155BatchReceived(address,address,uint256[],uint256[],bytes):(bytes4)",
      [
        ethereum.Value.fromAddress(param0),
        ethereum.Value.fromAddress(param1),
        ethereum.Value.fromUnsignedBigIntArray(param2),
        ethereum.Value.fromUnsignedBigIntArray(param3),
        ethereum.Value.fromBytes(param4)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBytes());
  }

  onERC1155Received(
    param0: Address,
    param1: Address,
    param2: BigInt,
    param3: BigInt,
    param4: Bytes
  ): Bytes {
    let result = super.call(
      "onERC1155Received",
      "onERC1155Received(address,address,uint256,uint256,bytes):(bytes4)",
      [
        ethereum.Value.fromAddress(param0),
        ethereum.Value.fromAddress(param1),
        ethereum.Value.fromUnsignedBigInt(param2),
        ethereum.Value.fromUnsignedBigInt(param3),
        ethereum.Value.fromBytes(param4)
      ]
    );

    return result[0].toBytes();
  }

  try_onERC1155Received(
    param0: Address,
    param1: Address,
    param2: BigInt,
    param3: BigInt,
    param4: Bytes
  ): ethereum.CallResult<Bytes> {
    let result = super.tryCall(
      "onERC1155Received",
      "onERC1155Received(address,address,uint256,uint256,bytes):(bytes4)",
      [
        ethereum.Value.fromAddress(param0),
        ethereum.Value.fromAddress(param1),
        ethereum.Value.fromUnsignedBigInt(param2),
        ethereum.Value.fromUnsignedBigInt(param3),
        ethereum.Value.fromBytes(param4)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBytes());
  }

  onERC721Received(
    param0: Address,
    param1: Address,
    param2: BigInt,
    param3: Bytes
  ): Bytes {
    let result = super.call(
      "onERC721Received",
      "onERC721Received(address,address,uint256,bytes):(bytes4)",
      [
        ethereum.Value.fromAddress(param0),
        ethereum.Value.fromAddress(param1),
        ethereum.Value.fromUnsignedBigInt(param2),
        ethereum.Value.fromBytes(param3)
      ]
    );

    return result[0].toBytes();
  }

  try_onERC721Received(
    param0: Address,
    param1: Address,
    param2: BigInt,
    param3: Bytes
  ): ethereum.CallResult<Bytes> {
    let result = super.tryCall(
      "onERC721Received",
      "onERC721Received(address,address,uint256,bytes):(bytes4)",
      [
        ethereum.Value.fromAddress(param0),
        ethereum.Value.fromAddress(param1),
        ethereum.Value.fromUnsignedBigInt(param2),
        ethereum.Value.fromBytes(param3)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBytes());
  }

  proxiableUUID(): Bytes {
    let result = super.call("proxiableUUID", "proxiableUUID():(bytes32)", []);

    return result[0].toBytes();
  }

  try_proxiableUUID(): ethereum.CallResult<Bytes> {
    let result = super.tryCall(
      "proxiableUUID",
      "proxiableUUID():(bytes32)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBytes());
  }

  signatureRecovery(
    _digest: Bytes,
    _signature: Bytes
  ): LightWallet__signatureRecoveryResult {
    let result = super.call(
      "signatureRecovery",
      "signatureRecovery(bytes32,bytes):(uint256,uint256,bytes32,bytes32,uint256)",
      [
        ethereum.Value.fromFixedBytes(_digest),
        ethereum.Value.fromBytes(_signature)
      ]
    );

    return new LightWallet__signatureRecoveryResult(
      result[0].toBigInt(),
      result[1].toBigInt(),
      result[2].toBytes(),
      result[3].toBytes(),
      result[4].toBigInt()
    );
  }

  try_signatureRecovery(
    _digest: Bytes,
    _signature: Bytes
  ): ethereum.CallResult<LightWallet__signatureRecoveryResult> {
    let result = super.tryCall(
      "signatureRecovery",
      "signatureRecovery(bytes32,bytes):(uint256,uint256,bytes32,bytes32,uint256)",
      [
        ethereum.Value.fromFixedBytes(_digest),
        ethereum.Value.fromBytes(_signature)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new LightWallet__signatureRecoveryResult(
        value[0].toBigInt(),
        value[1].toBigInt(),
        value[2].toBytes(),
        value[3].toBytes(),
        value[4].toBigInt()
      )
    );
  }

  supportsInterface(interfaceId: Bytes): boolean {
    let result = super.call(
      "supportsInterface",
      "supportsInterface(bytes4):(bool)",
      [ethereum.Value.fromFixedBytes(interfaceId)]
    );

    return result[0].toBoolean();
  }

  try_supportsInterface(interfaceId: Bytes): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "supportsInterface",
      "supportsInterface(bytes4):(bool)",
      [ethereum.Value.fromFixedBytes(interfaceId)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  validateUserOp(
    userOp: LightWallet__validateUserOpInputUserOpStruct,
    userOpHash: Bytes,
    missingAccountFunds: BigInt
  ): BigInt {
    let result = super.call(
      "validateUserOp",
      "validateUserOp((address,uint256,bytes,bytes,uint256,uint256,uint256,uint256,uint256,bytes,bytes),bytes32,uint256):(uint256)",
      [
        ethereum.Value.fromTuple(userOp),
        ethereum.Value.fromFixedBytes(userOpHash),
        ethereum.Value.fromUnsignedBigInt(missingAccountFunds)
      ]
    );

    return result[0].toBigInt();
  }

  try_validateUserOp(
    userOp: LightWallet__validateUserOpInputUserOpStruct,
    userOpHash: Bytes,
    missingAccountFunds: BigInt
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "validateUserOp",
      "validateUserOp((address,uint256,bytes,bytes,uint256,uint256,uint256,uint256,uint256,bytes,bytes),bytes32,uint256):(uint256)",
      [
        ethereum.Value.fromTuple(userOp),
        ethereum.Value.fromFixedBytes(userOpHash),
        ethereum.Value.fromUnsignedBigInt(missingAccountFunds)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }

  get anEntryPoint(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class ExecuteCall extends ethereum.Call {
  get inputs(): ExecuteCall__Inputs {
    return new ExecuteCall__Inputs(this);
  }

  get outputs(): ExecuteCall__Outputs {
    return new ExecuteCall__Outputs(this);
  }
}

export class ExecuteCall__Inputs {
  _call: ExecuteCall;

  constructor(call: ExecuteCall) {
    this._call = call;
  }

  get dest(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get value(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get func(): Bytes {
    return this._call.inputValues[2].value.toBytes();
  }
}

export class ExecuteCall__Outputs {
  _call: ExecuteCall;

  constructor(call: ExecuteCall) {
    this._call = call;
  }
}

export class ExecuteBatchCall extends ethereum.Call {
  get inputs(): ExecuteBatchCall__Inputs {
    return new ExecuteBatchCall__Inputs(this);
  }

  get outputs(): ExecuteBatchCall__Outputs {
    return new ExecuteBatchCall__Outputs(this);
  }
}

export class ExecuteBatchCall__Inputs {
  _call: ExecuteBatchCall;

  constructor(call: ExecuteBatchCall) {
    this._call = call;
  }

  get dest(): Array<Address> {
    return this._call.inputValues[0].value.toAddressArray();
  }

  get value(): Array<BigInt> {
    return this._call.inputValues[1].value.toBigIntArray();
  }

  get func(): Array<Bytes> {
    return this._call.inputValues[2].value.toBytesArray();
  }
}

export class ExecuteBatchCall__Outputs {
  _call: ExecuteBatchCall;

  constructor(call: ExecuteBatchCall) {
    this._call = call;
  }
}

export class InitializeCall extends ethereum.Call {
  get inputs(): InitializeCall__Inputs {
    return new InitializeCall__Inputs(this);
  }

  get outputs(): InitializeCall__Outputs {
    return new InitializeCall__Outputs(this);
  }
}

export class InitializeCall__Inputs {
  _call: InitializeCall;

  constructor(call: InitializeCall) {
    this._call = call;
  }

  get imageHash(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }
}

export class InitializeCall__Outputs {
  _call: InitializeCall;

  constructor(call: InitializeCall) {
    this._call = call;
  }
}

export class UpdateImageHashCall extends ethereum.Call {
  get inputs(): UpdateImageHashCall__Inputs {
    return new UpdateImageHashCall__Inputs(this);
  }

  get outputs(): UpdateImageHashCall__Outputs {
    return new UpdateImageHashCall__Outputs(this);
  }
}

export class UpdateImageHashCall__Inputs {
  _call: UpdateImageHashCall;

  constructor(call: UpdateImageHashCall) {
    this._call = call;
  }

  get _imageHash(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }
}

export class UpdateImageHashCall__Outputs {
  _call: UpdateImageHashCall;

  constructor(call: UpdateImageHashCall) {
    this._call = call;
  }
}

export class UpgradeToCall extends ethereum.Call {
  get inputs(): UpgradeToCall__Inputs {
    return new UpgradeToCall__Inputs(this);
  }

  get outputs(): UpgradeToCall__Outputs {
    return new UpgradeToCall__Outputs(this);
  }
}

export class UpgradeToCall__Inputs {
  _call: UpgradeToCall;

  constructor(call: UpgradeToCall) {
    this._call = call;
  }

  get newImplementation(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class UpgradeToCall__Outputs {
  _call: UpgradeToCall;

  constructor(call: UpgradeToCall) {
    this._call = call;
  }
}

export class UpgradeToAndCallCall extends ethereum.Call {
  get inputs(): UpgradeToAndCallCall__Inputs {
    return new UpgradeToAndCallCall__Inputs(this);
  }

  get outputs(): UpgradeToAndCallCall__Outputs {
    return new UpgradeToAndCallCall__Outputs(this);
  }
}

export class UpgradeToAndCallCall__Inputs {
  _call: UpgradeToAndCallCall;

  constructor(call: UpgradeToAndCallCall) {
    this._call = call;
  }

  get newImplementation(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get data(): Bytes {
    return this._call.inputValues[1].value.toBytes();
  }
}

export class UpgradeToAndCallCall__Outputs {
  _call: UpgradeToAndCallCall;

  constructor(call: UpgradeToAndCallCall) {
    this._call = call;
  }
}

export class ValidateUserOpCall extends ethereum.Call {
  get inputs(): ValidateUserOpCall__Inputs {
    return new ValidateUserOpCall__Inputs(this);
  }

  get outputs(): ValidateUserOpCall__Outputs {
    return new ValidateUserOpCall__Outputs(this);
  }
}

export class ValidateUserOpCall__Inputs {
  _call: ValidateUserOpCall;

  constructor(call: ValidateUserOpCall) {
    this._call = call;
  }

  get userOp(): ValidateUserOpCallUserOpStruct {
    return changetype<ValidateUserOpCallUserOpStruct>(
      this._call.inputValues[0].value.toTuple()
    );
  }

  get userOpHash(): Bytes {
    return this._call.inputValues[1].value.toBytes();
  }

  get missingAccountFunds(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }
}

export class ValidateUserOpCall__Outputs {
  _call: ValidateUserOpCall;

  constructor(call: ValidateUserOpCall) {
    this._call = call;
  }

  get validationData(): BigInt {
    return this._call.outputValues[0].value.toBigInt();
  }
}

export class ValidateUserOpCallUserOpStruct extends ethereum.Tuple {
  get sender(): Address {
    return this[0].toAddress();
  }

  get nonce(): BigInt {
    return this[1].toBigInt();
  }

  get initCode(): Bytes {
    return this[2].toBytes();
  }

  get callData(): Bytes {
    return this[3].toBytes();
  }

  get callGasLimit(): BigInt {
    return this[4].toBigInt();
  }

  get verificationGasLimit(): BigInt {
    return this[5].toBigInt();
  }

  get preVerificationGas(): BigInt {
    return this[6].toBigInt();
  }

  get maxFeePerGas(): BigInt {
    return this[7].toBigInt();
  }

  get maxPriorityFeePerGas(): BigInt {
    return this[8].toBigInt();
  }

  get paymasterAndData(): Bytes {
    return this[9].toBytes();
  }

  get signature(): Bytes {
    return this[10].toBytes();
  }
}
