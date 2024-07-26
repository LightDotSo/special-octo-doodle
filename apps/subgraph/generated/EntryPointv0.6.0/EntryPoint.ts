// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  type Address,
  type BigInt,
  type Bytes,
  Entity,
  JSONValue,
  TypedMap,
  ethereum,
} from "@graphprotocol/graph-ts";

export class AccountDeployed extends ethereum.Event {
  get params(): AccountDeployed__Params {
    return new AccountDeployed__Params(this);
  }
}

export class AccountDeployed__Params {
  _event: AccountDeployed;

  constructor(event: AccountDeployed) {
    this._event = event;
  }

  get userOpHash(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get sender(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get factory(): Address {
    return this._event.parameters[2].value.toAddress();
  }

  get paymaster(): Address {
    return this._event.parameters[3].value.toAddress();
  }
}

export class BeforeExecution extends ethereum.Event {
  get params(): BeforeExecution__Params {
    return new BeforeExecution__Params(this);
  }
}

export class BeforeExecution__Params {
  _event: BeforeExecution;

  constructor(event: BeforeExecution) {
    this._event = event;
  }
}

export class Deposited extends ethereum.Event {
  get params(): Deposited__Params {
    return new Deposited__Params(this);
  }
}

export class Deposited__Params {
  _event: Deposited;

  constructor(event: Deposited) {
    this._event = event;
  }

  get account(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get totalDeposit(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class SignatureAggregatorChanged extends ethereum.Event {
  get params(): SignatureAggregatorChanged__Params {
    return new SignatureAggregatorChanged__Params(this);
  }
}

export class SignatureAggregatorChanged__Params {
  _event: SignatureAggregatorChanged;

  constructor(event: SignatureAggregatorChanged) {
    this._event = event;
  }

  get aggregator(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class StakeLocked extends ethereum.Event {
  get params(): StakeLocked__Params {
    return new StakeLocked__Params(this);
  }
}

export class StakeLocked__Params {
  _event: StakeLocked;

  constructor(event: StakeLocked) {
    this._event = event;
  }

  get account(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get totalStaked(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get unstakeDelaySec(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class StakeUnlocked extends ethereum.Event {
  get params(): StakeUnlocked__Params {
    return new StakeUnlocked__Params(this);
  }
}

export class StakeUnlocked__Params {
  _event: StakeUnlocked;

  constructor(event: StakeUnlocked) {
    this._event = event;
  }

  get account(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get withdrawTime(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class StakeWithdrawn extends ethereum.Event {
  get params(): StakeWithdrawn__Params {
    return new StakeWithdrawn__Params(this);
  }
}

export class StakeWithdrawn__Params {
  _event: StakeWithdrawn;

  constructor(event: StakeWithdrawn) {
    this._event = event;
  }

  get account(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get withdrawAddress(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get amount(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class UserOperationEvent extends ethereum.Event {
  get params(): UserOperationEvent__Params {
    return new UserOperationEvent__Params(this);
  }
}

export class UserOperationEvent__Params {
  _event: UserOperationEvent;

  constructor(event: UserOperationEvent) {
    this._event = event;
  }

  get userOpHash(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get sender(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get paymaster(): Address {
    return this._event.parameters[2].value.toAddress();
  }

  get nonce(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }

  get success(): boolean {
    return this._event.parameters[4].value.toBoolean();
  }

  get actualGasCost(): BigInt {
    return this._event.parameters[5].value.toBigInt();
  }

  get actualGasUsed(): BigInt {
    return this._event.parameters[6].value.toBigInt();
  }
}

export class UserOperationRevertReason extends ethereum.Event {
  get params(): UserOperationRevertReason__Params {
    return new UserOperationRevertReason__Params(this);
  }
}

export class UserOperationRevertReason__Params {
  _event: UserOperationRevertReason;

  constructor(event: UserOperationRevertReason) {
    this._event = event;
  }

  get userOpHash(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get sender(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get nonce(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get revertReason(): Bytes {
    return this._event.parameters[3].value.toBytes();
  }
}

export class Withdrawn extends ethereum.Event {
  get params(): Withdrawn__Params {
    return new Withdrawn__Params(this);
  }
}

export class Withdrawn__Params {
  _event: Withdrawn;

  constructor(event: Withdrawn) {
    this._event = event;
  }

  get account(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get withdrawAddress(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get amount(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class EntryPoint__depositsResult {
  value0: BigInt;
  value1: boolean;
  value2: BigInt;
  value3: BigInt;
  value4: BigInt;

  constructor(
    value0: BigInt,
    value1: boolean,
    value2: BigInt,
    value3: BigInt,
    value4: BigInt,
  ) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
    this.value4 = value4;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    const map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromUnsignedBigInt(this.value0));
    map.set("value1", ethereum.Value.fromBoolean(this.value1));
    map.set("value2", ethereum.Value.fromUnsignedBigInt(this.value2));
    map.set("value3", ethereum.Value.fromUnsignedBigInt(this.value3));
    map.set("value4", ethereum.Value.fromUnsignedBigInt(this.value4));
    return map;
  }

  getDeposit(): BigInt {
    return this.value0;
  }

  getStaked(): boolean {
    return this.value1;
  }

  getStake(): BigInt {
    return this.value2;
  }

  getUnstakeDelaySec(): BigInt {
    return this.value3;
  }

  getWithdrawTime(): BigInt {
    return this.value4;
  }
}

export class EntryPoint__getDepositInfoResultInfoStruct extends ethereum.Tuple {
  get deposit(): BigInt {
    return this[0].toBigInt();
  }

  get staked(): boolean {
    return this[1].toBoolean();
  }

  get stake(): BigInt {
    return this[2].toBigInt();
  }

  get unstakeDelaySec(): BigInt {
    return this[3].toBigInt();
  }

  get withdrawTime(): BigInt {
    return this[4].toBigInt();
  }
}

export class EntryPoint__getUserOpHashInputUserOpStruct extends ethereum.Tuple {
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

export class EntryPoint__innerHandleOpInputOpInfoStruct extends ethereum.Tuple {
  get mUserOp(): EntryPoint__innerHandleOpInputOpInfoMUserOpStruct {
    return changetype<EntryPoint__innerHandleOpInputOpInfoMUserOpStruct>(
      this[0].toTuple(),
    );
  }

  get userOpHash(): Bytes {
    return this[1].toBytes();
  }

  get prefund(): BigInt {
    return this[2].toBigInt();
  }

  get contextOffset(): BigInt {
    return this[3].toBigInt();
  }

  get preOpGas(): BigInt {
    return this[4].toBigInt();
  }
}

export class EntryPoint__innerHandleOpInputOpInfoMUserOpStruct extends ethereum.Tuple {
  get sender(): Address {
    return this[0].toAddress();
  }

  get nonce(): BigInt {
    return this[1].toBigInt();
  }

  get callGasLimit(): BigInt {
    return this[2].toBigInt();
  }

  get verificationGasLimit(): BigInt {
    return this[3].toBigInt();
  }

  get preVerificationGas(): BigInt {
    return this[4].toBigInt();
  }

  get paymaster(): Address {
    return this[5].toAddress();
  }

  get maxFeePerGas(): BigInt {
    return this[6].toBigInt();
  }

  get maxPriorityFeePerGas(): BigInt {
    return this[7].toBigInt();
  }
}

export class EntryPoint extends ethereum.SmartContract {
  static bind(address: Address): EntryPoint {
    return new EntryPoint("EntryPoint", address);
  }

  SIG_VALIDATION_FAILED(): BigInt {
    const result = super.call(
      "SIG_VALIDATION_FAILED",
      "SIG_VALIDATION_FAILED():(uint256)",
      [],
    );

    return result[0].toBigInt();
  }

  try_SIG_VALIDATION_FAILED(): ethereum.CallResult<BigInt> {
    const result = super.tryCall(
      "SIG_VALIDATION_FAILED",
      "SIG_VALIDATION_FAILED():(uint256)",
      [],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    const value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  balanceOf(account: Address): BigInt {
    const result = super.call("balanceOf", "balanceOf(address):(uint256)", [
      ethereum.Value.fromAddress(account),
    ]);

    return result[0].toBigInt();
  }

  try_balanceOf(account: Address): ethereum.CallResult<BigInt> {
    const result = super.tryCall("balanceOf", "balanceOf(address):(uint256)", [
      ethereum.Value.fromAddress(account),
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    const value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  deposits(param0: Address): EntryPoint__depositsResult {
    const result = super.call(
      "deposits",
      "deposits(address):(uint112,bool,uint112,uint32,uint48)",
      [ethereum.Value.fromAddress(param0)],
    );

    return new EntryPoint__depositsResult(
      result[0].toBigInt(),
      result[1].toBoolean(),
      result[2].toBigInt(),
      result[3].toBigInt(),
      result[4].toBigInt(),
    );
  }

  try_deposits(
    param0: Address,
  ): ethereum.CallResult<EntryPoint__depositsResult> {
    const result = super.tryCall(
      "deposits",
      "deposits(address):(uint112,bool,uint112,uint32,uint48)",
      [ethereum.Value.fromAddress(param0)],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    const value = result.value;
    return ethereum.CallResult.fromValue(
      new EntryPoint__depositsResult(
        value[0].toBigInt(),
        value[1].toBoolean(),
        value[2].toBigInt(),
        value[3].toBigInt(),
        value[4].toBigInt(),
      ),
    );
  }

  getDepositInfo(account: Address): EntryPoint__getDepositInfoResultInfoStruct {
    const result = super.call(
      "getDepositInfo",
      "getDepositInfo(address):((uint112,bool,uint112,uint32,uint48))",
      [ethereum.Value.fromAddress(account)],
    );

    return changetype<EntryPoint__getDepositInfoResultInfoStruct>(
      result[0].toTuple(),
    );
  }

  try_getDepositInfo(
    account: Address,
  ): ethereum.CallResult<EntryPoint__getDepositInfoResultInfoStruct> {
    const result = super.tryCall(
      "getDepositInfo",
      "getDepositInfo(address):((uint112,bool,uint112,uint32,uint48))",
      [ethereum.Value.fromAddress(account)],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    const value = result.value;
    return ethereum.CallResult.fromValue(
      changetype<EntryPoint__getDepositInfoResultInfoStruct>(
        value[0].toTuple(),
      ),
    );
  }

  getNonce(sender: Address, key: BigInt): BigInt {
    const result = super.call(
      "getNonce",
      "getNonce(address,uint192):(uint256)",
      [
        ethereum.Value.fromAddress(sender),
        ethereum.Value.fromUnsignedBigInt(key),
      ],
    );

    return result[0].toBigInt();
  }

  try_getNonce(sender: Address, key: BigInt): ethereum.CallResult<BigInt> {
    const result = super.tryCall(
      "getNonce",
      "getNonce(address,uint192):(uint256)",
      [
        ethereum.Value.fromAddress(sender),
        ethereum.Value.fromUnsignedBigInt(key),
      ],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    const value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getUserOpHash(userOp: EntryPoint__getUserOpHashInputUserOpStruct): Bytes {
    const result = super.call(
      "getUserOpHash",
      "getUserOpHash((address,uint256,bytes,bytes,uint256,uint256,uint256,uint256,uint256,bytes,bytes)):(bytes32)",
      [ethereum.Value.fromTuple(userOp)],
    );

    return result[0].toBytes();
  }

  try_getUserOpHash(
    userOp: EntryPoint__getUserOpHashInputUserOpStruct,
  ): ethereum.CallResult<Bytes> {
    const result = super.tryCall(
      "getUserOpHash",
      "getUserOpHash((address,uint256,bytes,bytes,uint256,uint256,uint256,uint256,uint256,bytes,bytes)):(bytes32)",
      [ethereum.Value.fromTuple(userOp)],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    const value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBytes());
  }

  innerHandleOp(
    callData: Bytes,
    opInfo: EntryPoint__innerHandleOpInputOpInfoStruct,
    context: Bytes,
  ): BigInt {
    const result = super.call(
      "innerHandleOp",
      "innerHandleOp(bytes,((address,uint256,uint256,uint256,uint256,address,uint256,uint256),bytes32,uint256,uint256,uint256),bytes):(uint256)",
      [
        ethereum.Value.fromBytes(callData),
        ethereum.Value.fromTuple(opInfo),
        ethereum.Value.fromBytes(context),
      ],
    );

    return result[0].toBigInt();
  }

  try_innerHandleOp(
    callData: Bytes,
    opInfo: EntryPoint__innerHandleOpInputOpInfoStruct,
    context: Bytes,
  ): ethereum.CallResult<BigInt> {
    const result = super.tryCall(
      "innerHandleOp",
      "innerHandleOp(bytes,((address,uint256,uint256,uint256,uint256,address,uint256,uint256),bytes32,uint256,uint256,uint256),bytes):(uint256)",
      [
        ethereum.Value.fromBytes(callData),
        ethereum.Value.fromTuple(opInfo),
        ethereum.Value.fromBytes(context),
      ],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    const value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  nonceSequenceNumber(param0: Address, param1: BigInt): BigInt {
    const result = super.call(
      "nonceSequenceNumber",
      "nonceSequenceNumber(address,uint192):(uint256)",
      [
        ethereum.Value.fromAddress(param0),
        ethereum.Value.fromUnsignedBigInt(param1),
      ],
    );

    return result[0].toBigInt();
  }

  try_nonceSequenceNumber(
    param0: Address,
    param1: BigInt,
  ): ethereum.CallResult<BigInt> {
    const result = super.tryCall(
      "nonceSequenceNumber",
      "nonceSequenceNumber(address,uint192):(uint256)",
      [
        ethereum.Value.fromAddress(param0),
        ethereum.Value.fromUnsignedBigInt(param1),
      ],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    const value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }
}

export class AddStakeCall extends ethereum.Call {
  get inputs(): AddStakeCall__Inputs {
    return new AddStakeCall__Inputs(this);
  }

  get outputs(): AddStakeCall__Outputs {
    return new AddStakeCall__Outputs(this);
  }
}

export class AddStakeCall__Inputs {
  _call: AddStakeCall;

  constructor(call: AddStakeCall) {
    this._call = call;
  }

  get unstakeDelaySec(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class AddStakeCall__Outputs {
  _call: AddStakeCall;

  constructor(call: AddStakeCall) {
    this._call = call;
  }
}

export class DepositToCall extends ethereum.Call {
  get inputs(): DepositToCall__Inputs {
    return new DepositToCall__Inputs(this);
  }

  get outputs(): DepositToCall__Outputs {
    return new DepositToCall__Outputs(this);
  }
}

export class DepositToCall__Inputs {
  _call: DepositToCall;

  constructor(call: DepositToCall) {
    this._call = call;
  }

  get account(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class DepositToCall__Outputs {
  _call: DepositToCall;

  constructor(call: DepositToCall) {
    this._call = call;
  }
}

export class GetSenderAddressCall extends ethereum.Call {
  get inputs(): GetSenderAddressCall__Inputs {
    return new GetSenderAddressCall__Inputs(this);
  }

  get outputs(): GetSenderAddressCall__Outputs {
    return new GetSenderAddressCall__Outputs(this);
  }
}

export class GetSenderAddressCall__Inputs {
  _call: GetSenderAddressCall;

  constructor(call: GetSenderAddressCall) {
    this._call = call;
  }

  get initCode(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }
}

export class GetSenderAddressCall__Outputs {
  _call: GetSenderAddressCall;

  constructor(call: GetSenderAddressCall) {
    this._call = call;
  }
}

export class HandleAggregatedOpsCall extends ethereum.Call {
  get inputs(): HandleAggregatedOpsCall__Inputs {
    return new HandleAggregatedOpsCall__Inputs(this);
  }

  get outputs(): HandleAggregatedOpsCall__Outputs {
    return new HandleAggregatedOpsCall__Outputs(this);
  }
}

export class HandleAggregatedOpsCall__Inputs {
  _call: HandleAggregatedOpsCall;

  constructor(call: HandleAggregatedOpsCall) {
    this._call = call;
  }

  get opsPerAggregator(): Array<HandleAggregatedOpsCallOpsPerAggregatorStruct> {
    return this._call.inputValues[0].value.toTupleArray<HandleAggregatedOpsCallOpsPerAggregatorStruct>();
  }

  get beneficiary(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class HandleAggregatedOpsCall__Outputs {
  _call: HandleAggregatedOpsCall;

  constructor(call: HandleAggregatedOpsCall) {
    this._call = call;
  }
}

export class HandleAggregatedOpsCallOpsPerAggregatorStruct extends ethereum.Tuple {
  get userOps(): Array<HandleAggregatedOpsCallOpsPerAggregatorUserOpsStruct> {
    return this[0].toTupleArray<HandleAggregatedOpsCallOpsPerAggregatorUserOpsStruct>();
  }

  get aggregator(): Address {
    return this[1].toAddress();
  }

  get signature(): Bytes {
    return this[2].toBytes();
  }
}

export class HandleAggregatedOpsCallOpsPerAggregatorUserOpsStruct extends ethereum.Tuple {
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

export class HandleOpsCall extends ethereum.Call {
  get inputs(): HandleOpsCall__Inputs {
    return new HandleOpsCall__Inputs(this);
  }

  get outputs(): HandleOpsCall__Outputs {
    return new HandleOpsCall__Outputs(this);
  }
}

export class HandleOpsCall__Inputs {
  _call: HandleOpsCall;

  constructor(call: HandleOpsCall) {
    this._call = call;
  }

  get ops(): Array<HandleOpsCallOpsStruct> {
    return this._call.inputValues[0].value.toTupleArray<HandleOpsCallOpsStruct>();
  }

  get beneficiary(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class HandleOpsCall__Outputs {
  _call: HandleOpsCall;

  constructor(call: HandleOpsCall) {
    this._call = call;
  }
}

export class HandleOpsCallOpsStruct extends ethereum.Tuple {
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

export class IncrementNonceCall extends ethereum.Call {
  get inputs(): IncrementNonceCall__Inputs {
    return new IncrementNonceCall__Inputs(this);
  }

  get outputs(): IncrementNonceCall__Outputs {
    return new IncrementNonceCall__Outputs(this);
  }
}

export class IncrementNonceCall__Inputs {
  _call: IncrementNonceCall;

  constructor(call: IncrementNonceCall) {
    this._call = call;
  }

  get key(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class IncrementNonceCall__Outputs {
  _call: IncrementNonceCall;

  constructor(call: IncrementNonceCall) {
    this._call = call;
  }
}

export class InnerHandleOpCall extends ethereum.Call {
  get inputs(): InnerHandleOpCall__Inputs {
    return new InnerHandleOpCall__Inputs(this);
  }

  get outputs(): InnerHandleOpCall__Outputs {
    return new InnerHandleOpCall__Outputs(this);
  }
}

export class InnerHandleOpCall__Inputs {
  _call: InnerHandleOpCall;

  constructor(call: InnerHandleOpCall) {
    this._call = call;
  }

  get callData(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }

  get opInfo(): InnerHandleOpCallOpInfoStruct {
    return changetype<InnerHandleOpCallOpInfoStruct>(
      this._call.inputValues[1].value.toTuple(),
    );
  }

  get context(): Bytes {
    return this._call.inputValues[2].value.toBytes();
  }
}

export class InnerHandleOpCall__Outputs {
  _call: InnerHandleOpCall;

  constructor(call: InnerHandleOpCall) {
    this._call = call;
  }

  get actualGasCost(): BigInt {
    return this._call.outputValues[0].value.toBigInt();
  }
}

export class InnerHandleOpCallOpInfoStruct extends ethereum.Tuple {
  get mUserOp(): InnerHandleOpCallOpInfoMUserOpStruct {
    return changetype<InnerHandleOpCallOpInfoMUserOpStruct>(this[0].toTuple());
  }

  get userOpHash(): Bytes {
    return this[1].toBytes();
  }

  get prefund(): BigInt {
    return this[2].toBigInt();
  }

  get contextOffset(): BigInt {
    return this[3].toBigInt();
  }

  get preOpGas(): BigInt {
    return this[4].toBigInt();
  }
}

export class InnerHandleOpCallOpInfoMUserOpStruct extends ethereum.Tuple {
  get sender(): Address {
    return this[0].toAddress();
  }

  get nonce(): BigInt {
    return this[1].toBigInt();
  }

  get callGasLimit(): BigInt {
    return this[2].toBigInt();
  }

  get verificationGasLimit(): BigInt {
    return this[3].toBigInt();
  }

  get preVerificationGas(): BigInt {
    return this[4].toBigInt();
  }

  get paymaster(): Address {
    return this[5].toAddress();
  }

  get maxFeePerGas(): BigInt {
    return this[6].toBigInt();
  }

  get maxPriorityFeePerGas(): BigInt {
    return this[7].toBigInt();
  }
}

export class SimulateHandleOpCall extends ethereum.Call {
  get inputs(): SimulateHandleOpCall__Inputs {
    return new SimulateHandleOpCall__Inputs(this);
  }

  get outputs(): SimulateHandleOpCall__Outputs {
    return new SimulateHandleOpCall__Outputs(this);
  }
}

export class SimulateHandleOpCall__Inputs {
  _call: SimulateHandleOpCall;

  constructor(call: SimulateHandleOpCall) {
    this._call = call;
  }

  get op(): SimulateHandleOpCallOpStruct {
    return changetype<SimulateHandleOpCallOpStruct>(
      this._call.inputValues[0].value.toTuple(),
    );
  }

  get target(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get targetCallData(): Bytes {
    return this._call.inputValues[2].value.toBytes();
  }
}

export class SimulateHandleOpCall__Outputs {
  _call: SimulateHandleOpCall;

  constructor(call: SimulateHandleOpCall) {
    this._call = call;
  }
}

export class SimulateHandleOpCallOpStruct extends ethereum.Tuple {
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

export class SimulateValidationCall extends ethereum.Call {
  get inputs(): SimulateValidationCall__Inputs {
    return new SimulateValidationCall__Inputs(this);
  }

  get outputs(): SimulateValidationCall__Outputs {
    return new SimulateValidationCall__Outputs(this);
  }
}

export class SimulateValidationCall__Inputs {
  _call: SimulateValidationCall;

  constructor(call: SimulateValidationCall) {
    this._call = call;
  }

  get userOp(): SimulateValidationCallUserOpStruct {
    return changetype<SimulateValidationCallUserOpStruct>(
      this._call.inputValues[0].value.toTuple(),
    );
  }
}

export class SimulateValidationCall__Outputs {
  _call: SimulateValidationCall;

  constructor(call: SimulateValidationCall) {
    this._call = call;
  }
}

export class SimulateValidationCallUserOpStruct extends ethereum.Tuple {
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

export class UnlockStakeCall extends ethereum.Call {
  get inputs(): UnlockStakeCall__Inputs {
    return new UnlockStakeCall__Inputs(this);
  }

  get outputs(): UnlockStakeCall__Outputs {
    return new UnlockStakeCall__Outputs(this);
  }
}

export class UnlockStakeCall__Inputs {
  _call: UnlockStakeCall;

  constructor(call: UnlockStakeCall) {
    this._call = call;
  }
}

export class UnlockStakeCall__Outputs {
  _call: UnlockStakeCall;

  constructor(call: UnlockStakeCall) {
    this._call = call;
  }
}

export class WithdrawStakeCall extends ethereum.Call {
  get inputs(): WithdrawStakeCall__Inputs {
    return new WithdrawStakeCall__Inputs(this);
  }

  get outputs(): WithdrawStakeCall__Outputs {
    return new WithdrawStakeCall__Outputs(this);
  }
}

export class WithdrawStakeCall__Inputs {
  _call: WithdrawStakeCall;

  constructor(call: WithdrawStakeCall) {
    this._call = call;
  }

  get withdrawAddress(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class WithdrawStakeCall__Outputs {
  _call: WithdrawStakeCall;

  constructor(call: WithdrawStakeCall) {
    this._call = call;
  }
}

export class WithdrawToCall extends ethereum.Call {
  get inputs(): WithdrawToCall__Inputs {
    return new WithdrawToCall__Inputs(this);
  }

  get outputs(): WithdrawToCall__Outputs {
    return new WithdrawToCall__Outputs(this);
  }
}

export class WithdrawToCall__Inputs {
  _call: WithdrawToCall;

  constructor(call: WithdrawToCall) {
    this._call = call;
  }

  get withdrawAddress(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get withdrawAmount(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class WithdrawToCall__Outputs {
  _call: WithdrawToCall;

  constructor(call: WithdrawToCall) {
    this._call = call;
  }
}
