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

"use client";

import {
  useMutationQueueUserOperation,
  useMutationUserOperationSend,
  useQueryConfiguration,
  useQueryPaymasterOperation,
  useQueryUserOperation,
  useQueryUserOperationReceipt,
  useQueryUserOperationSignature,
} from "@lightdotso/query";
import {
  useReadLightVerifyingPaymasterGetHash,
  useReadLightVerifyingPaymasterSenderNonce,
  useReadLightWalletImageHash,
} from "@lightdotso/wagmi";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  type Hex,
  type Address,
  toHex,
  fromHex,
  recoverMessageAddress,
} from "viem";

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type UserOperationSendProps = {
  address: Address;
  hash: Hex;
  isSend?: boolean;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export const useUserOperationSend = ({
  address,
  hash,
  isSend = false,
}: UserOperationSendProps) => {
  // ---------------------------------------------------------------------------
  // State Hooks
  // ---------------------------------------------------------------------------

  const [recoveredAddress, setRecoveredAddress] = useState<Address>();

  // ---------------------------------------------------------------------------
  // Query
  // ---------------------------------------------------------------------------

  const { queueUserOperation, isQueueUserOperationPending } =
    useMutationQueueUserOperation({
      address: address as Address,
    });

  const { userOperation, isUserOperationLoading } = useQueryUserOperation({
    hash: hash,
  });

  // ---------------------------------------------------------------------------
  // Wagmi
  // ---------------------------------------------------------------------------

  const { data: paymasterHash } = useReadLightVerifyingPaymasterGetHash({
    address: userOperation?.paymaster_and_data.slice(0, 42) as Address,
    chainId: userOperation?.chain_id,
    args: [
      {
        sender: userOperation?.sender as Address,
        nonce: BigInt(userOperation?.nonce ?? 0),
        initCode: userOperation?.init_code as Hex,
        callData: userOperation?.call_data as Hex,
        callGasLimit: BigInt(userOperation?.call_gas_limit ?? 0),
        verificationGasLimit: BigInt(
          userOperation?.verification_gas_limit ?? 0,
        ),
        preVerificationGas: BigInt(userOperation?.pre_verification_gas ?? 0),
        maxFeePerGas: BigInt(userOperation?.max_fee_per_gas ?? 0),
        maxPriorityFeePerGas: BigInt(
          userOperation?.max_priority_fee_per_gas ?? 0,
        ),
        paymasterAndData: userOperation?.paymaster_and_data as Hex,
        signature: toHex(new Uint8Array([2])),
      },
      fromHex(
        `0x${userOperation?.paymaster_and_data ? userOperation?.paymaster_and_data.slice(154, 162) : 0}`,
        "number",
      ),
      fromHex(
        `0x${userOperation?.paymaster_and_data ? userOperation?.paymaster_and_data.slice(162, 170) : 0}`,
        "number",
      ),
    ],
  });

  const { data: paymasterNonce } = useReadLightVerifyingPaymasterSenderNonce({
    address: userOperation?.paymaster_and_data.slice(0, 42) as Address,
    chainId: Number(userOperation?.chain_id),
    args: [userOperation?.sender as Address],
  });

  const { data: imageHash } = useReadLightWalletImageHash({
    address: userOperation?.sender as Address,
    chainId: userOperation?.chain_id ?? undefined,
  });

  // ---------------------------------------------------------------------------
  // Query
  // ---------------------------------------------------------------------------

  const { configuration } = useQueryConfiguration({
    address: address as Address,
    image_hash: imageHash,
    checkpoint: !imageHash ? 0 : undefined,
  });

  const { userOperationSignature, isUserOperationSignatureLoading } =
    useQueryUserOperationSignature({
      hash: hash,
      configuration_id: configuration?.id,
    });

  const { paymasterOperation } = useQueryPaymasterOperation({
    address: userOperation?.paymaster_and_data.slice(0, 42) as Address,
    // eslint-disable-next-line no-unsafe-optional-chaining, @typescript-eslint/no-non-null-asserted-optional-chain
    chain_id: userOperation?.chain_id!,
    valid_until: fromHex(
      `0x${userOperation?.paymaster_and_data ? userOperation?.paymaster_and_data.slice(154, 162) : 0}`,
      "number",
    ),
    valid_after: fromHex(
      `0x${userOperation?.paymaster_and_data ? userOperation?.paymaster_and_data.slice(162, 170) : 0}`,
      "number",
    ),
  });

  const {
    userOperationReceipt,
    isUserOperationReceiptLoading,
    isUserOperationReceiptError,
  } = useQueryUserOperationReceipt({
    chainId: userOperation?.chain_id ?? null,
    hash: hash,
  });

  const { userOperationSend } = useMutationUserOperationSend({
    address: address as Address,
    configuration: configuration,
    hash: userOperation?.hash as Hex,
  });

  // ---------------------------------------------------------------------------
  // Local Variables
  // ---------------------------------------------------------------------------

  const paymasterSignedMsg = `0x${userOperation?.paymaster_and_data.slice(
    170,
  )}` as Hex;

  // Get the cumulative weight of all owners in the userOperation signatures array and check if it is greater than or equal to the threshold
  const isUserOperationSendReady = userOperation
    ? userOperation.signatures.reduce((acc, signature) => {
        return (
          acc +
          ((configuration &&
            configuration.owners.find(owner => owner.id === signature?.owner_id)
              ?.weight) ||
            0)
        );
      }, 0) >= (configuration ? configuration.threshold : 0)
    : false;

  // ---------------------------------------------------------------------------
  // Effect Hooks
  // ---------------------------------------------------------------------------

  useEffect(() => {
    const recoverAddress = async () => {
      if (paymasterHash) {
        try {
          const address = await recoverMessageAddress({
            message: { raw: paymasterHash },
            signature: paymasterSignedMsg,
          });
          setRecoveredAddress(address);
        } catch (e) {
          console.error(e);
        }
      }
    };

    recoverAddress();
  }, [paymasterHash, paymasterSignedMsg]);

  // ---------------------------------------------------------------------------
  // Memoized Hooks
  // ---------------------------------------------------------------------------

  const isUserOperationSendPending = useMemo(
    () =>
      userOperation
        ? userOperation?.status === "PROPOSED" ||
          userOperation?.status === "PENDING"
        : // Send is pending if the operation is not found
          true,
    [userOperation],
  );

  const isUserOperationSendLoading = useMemo(
    () =>
      isQueueUserOperationPending ||
      isUserOperationLoading ||
      isUserOperationSignatureLoading ||
      isUserOperationReceiptLoading,
    [
      isQueueUserOperationPending,
      isUserOperationLoading,
      isUserOperationSignatureLoading,
      isUserOperationReceiptLoading,
    ],
  );

  const isUserOperationSendSuccess = useMemo(
    () =>
      userOperation?.status === "INVALID" ||
      userOperation?.status === "EXECUTED" ||
      userOperation?.status === "REVERTED",
    [userOperation],
  );

  const isUserOperationSendValid = useMemo(
    () =>
      typeof userOperation !== "undefined" &&
      typeof userOperationSignature !== "undefined" &&
      !isUserOperationSendLoading &&
      isUserOperationSendReady,
    [
      userOperation,
      userOperationSignature,
      isUserOperationLoading,
      isUserOperationSendReady,
    ],
  );

  const isUserOperationSendDisabled = useMemo(
    () =>
      !isUserOperationSendValid ||
      !isUserOperationSendPending ||
      isUserOperationSendSuccess,
    [
      isUserOperationSendValid,
      isUserOperationSendPending,
      isUserOperationSendSuccess,
    ],
  );

  // ---------------------------------------------------------------------------
  // Callback Hooks
  // ---------------------------------------------------------------------------

  const handleSubmit = useCallback(() => {
    if (!userOperation) {
      console.warn("User operation not found");
      return;
    }

    if (!userOperationSignature) {
      console.warn("User operation signature not found");
      return;
    }

    if (userOperationReceipt) {
      if (isUserOperationSendPending) {
        // Queue the user operation if the user operation has been sent but isn't indexed yet
        queueUserOperation({ hash: hash });
      }
      // Finally, return early
      return;
    }

    // If the optional parameter isSend is true or the user operation receipt
    // is an error, send the user operation
    if (isSend || isUserOperationReceiptError) {
      // Send the user operation if the user operation hasn't been sent yet
      userOperationSend({
        userOperation: userOperation,
        userOperationSignature: userOperationSignature as Hex,
      });
      // Finally, return
      return;
    }
  }, [
    userOperation,
    userOperationReceipt,
    userOperationSignature,
    isSend,
    isUserOperationReceiptError,
    isUserOperationSendPending,
    userOperationSend,
    queueUserOperation,
    hash,
  ]);

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return {
    handleSubmit: handleSubmit,
    paymasterNonce: paymasterNonce,
    paymasterOperation: paymasterOperation,
    paymasterSignedMsg: paymasterSignedMsg,
    recoveredAddress: recoveredAddress,
    isUserOperationSendValid: isUserOperationSendValid,
    isUserOperationSendDisabled: isUserOperationSendDisabled,
    isUserOperationSendLoading: isUserOperationSendLoading,
    isUserOperationSendPending: isUserOperationSendPending,
    isUserOperationSendSuccess: isUserOperationSendSuccess,
  };
};
