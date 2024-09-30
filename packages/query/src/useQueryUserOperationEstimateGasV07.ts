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

import { estimateUserOperationGasV07 } from "@lightdotso/client";
import { CONTRACT_ADDRESSES, ContractAddress } from "@lightdotso/const";
import type { EstimateUserOperationGasDataV07 } from "@lightdotso/data";
import type { RpcEstimateUserOperationGasParams } from "@lightdotso/params";
import { queryKeys } from "@lightdotso/query-keys";
import { useAuth } from "@lightdotso/stores";
import { useQuery } from "@tanstack/react-query";
import { type Hex, fromHex, toHex } from "viem";
import { USER_OPERATION_CONFIG } from "./config";

// -----------------------------------------------------------------------------
// Query
// -----------------------------------------------------------------------------

export const useQueryUserOperationEstimateGasV07 = (
  params: RpcEstimateUserOperationGasParams,
  isEnabled: boolean,
) => {
  // ---------------------------------------------------------------------------
  // Stores
  // ---------------------------------------------------------------------------

  const { clientType } = useAuth();

  // ---------------------------------------------------------------------------
  // Query
  // ---------------------------------------------------------------------------

  const {
    data: estimateUserOperationGasData,
    isLoading: isEstimateUserOperationGasDataLoading,
    error: estimateUserOperationGasDataError,
  } = useQuery<EstimateUserOperationGasDataV07 | null>({
    ...USER_OPERATION_CONFIG,
    retry: 10,
    enabled: isEnabled,
    queryKey: queryKeys.rpc.estimate_user_operation_gas_v07({
      chainId: params?.chainId,
      sender: params?.sender,
      nonce: params?.nonce,
      factory: params?.factory,
      factoryData: params?.factoryData,
      callData: params?.callData,
    }).queryKey,
    queryFn: async () => {
      if (
        !params?.chainId ||
        typeof params?.nonce === "undefined" ||
        params?.nonce === null ||
        !params?.initCode ||
        !params?.sender ||
        !params?.callData
      ) {
        return null;
      }

      const res = await estimateUserOperationGasV07(
        Number(params?.chainId) as number,
        [
          {
            sender: params?.sender,
            nonce: toHex(params?.nonce),
            factory: params?.factory,
            factoryData: params?.factoryData,
            callData: params?.callData,
            signature:
              "0x00010000000100013b31d8e3cafd8454ccaf0d4ad859bc76bbefbb7a7533197ca12fa852eba6a38a2e52c99c3b297f1935f9bfabb554176e65b601863cf6a80aa566930e0c05eef51c01",
          },
          CONTRACT_ADDRESSES[ContractAddress.ENTRYPOINT_V070_ADDRESS],
        ],
        clientType,
      );

      // Throw error if response is not ok
      return res._unsafeUnwrap();
    },
  });

  return {
    isUserOperationEstimateGasLoading: isEstimateUserOperationGasDataLoading,
    userOperationEstimateGasError: estimateUserOperationGasDataError,
    callGasLimit: estimateUserOperationGasData?.callGasLimit
      ? fromHex(estimateUserOperationGasData?.callGasLimit as Hex, {
          to: "bigint",
        })
      : undefined,
    preVerificationGas: estimateUserOperationGasData?.preVerificationGas
      ? fromHex(estimateUserOperationGasData?.preVerificationGas as Hex, {
          to: "bigint",
        })
      : undefined,
    verificationGasLimit: estimateUserOperationGasData?.verificationGasLimit
      ? fromHex(estimateUserOperationGasData?.verificationGasLimit as Hex, {
          to: "bigint",
        })
      : undefined,
    paymasterVerificationGasLimit:
      estimateUserOperationGasData?.paymasterVerificationGasLimit
        ? fromHex(
            estimateUserOperationGasData?.paymasterVerificationGasLimit as Hex,
            {
              to: "bigint",
            },
          )
        : undefined,
  };
};
