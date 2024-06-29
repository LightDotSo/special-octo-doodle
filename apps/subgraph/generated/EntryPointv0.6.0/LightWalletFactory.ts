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

export class LightalletFactory extends ethereum.SmartContract {
  static bind(address: Address): LightalletFactory {
    return new LightalletFactory("LightalletFactory", address);
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

  accountImplementation(): Address {
    let result = super.call(
      "accountImplementation",
      "accountImplementation():(address)",
      []
    );

    return result[0].toAddress();
  }

  try_accountImplementation(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "accountImplementation",
      "accountImplementation():(address)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  createAccount(hash: Bytes, salt: Bytes): Address {
    let result = super.call(
      "createAccount",
      "createAccount(bytes32,bytes32):(address)",
      [ethereum.Value.fromFixedBytes(hash), ethereum.Value.fromFixedBytes(salt)]
    );

    return result[0].toAddress();
  }

  try_createAccount(hash: Bytes, salt: Bytes): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "createAccount",
      "createAccount(bytes32,bytes32):(address)",
      [ethereum.Value.fromFixedBytes(hash), ethereum.Value.fromFixedBytes(salt)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  getAddress(hash: Bytes, salt: Bytes): Address {
    let result = super.call(
      "getAddress",
      "getAddress(bytes32,bytes32):(address)",
      [ethereum.Value.fromFixedBytes(hash), ethereum.Value.fromFixedBytes(salt)]
    );

    return result[0].toAddress();
  }

  try_getAddress(hash: Bytes, salt: Bytes): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "getAddress",
      "getAddress(bytes32,bytes32):(address)",
      [ethereum.Value.fromFixedBytes(hash), ethereum.Value.fromFixedBytes(salt)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
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

  get entryPoint(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class CreateAccountCall extends ethereum.Call {
  get inputs(): CreateAccountCall__Inputs {
    return new CreateAccountCall__Inputs(this);
  }

  get outputs(): CreateAccountCall__Outputs {
    return new CreateAccountCall__Outputs(this);
  }
}

export class CreateAccountCall__Inputs {
  _call: CreateAccountCall;

  constructor(call: CreateAccountCall) {
    this._call = call;
  }

  get hash(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }

  get salt(): Bytes {
    return this._call.inputValues[1].value.toBytes();
  }
}

export class CreateAccountCall__Outputs {
  _call: CreateAccountCall;

  constructor(call: CreateAccountCall) {
    this._call = call;
  }

  get ret(): Address {
    return this._call.outputValues[0].value.toAddress();
  }
}
