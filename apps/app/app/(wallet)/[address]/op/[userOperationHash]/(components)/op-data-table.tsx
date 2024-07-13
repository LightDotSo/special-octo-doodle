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

import type { WalletSettingsData } from "@lightdotso/data";
import { useQueryUserOperation } from "@lightdotso/query";
import { userOperationColumns } from "@lightdotso/tables";
import { type FC } from "react";
import type { Address, Hex } from "viem";
import { DataTable } from "@/app/(wallet)/[address]/transactions/(components)/data-table/data-table";

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

interface OpDataTableProps {
  userOperationHash: Hex;
  walletSettings: WalletSettingsData;
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export const OpDataTable: FC<OpDataTableProps> = ({
  userOperationHash,
  walletSettings,
}) => {
  // ---------------------------------------------------------------------------
  // Query
  // ---------------------------------------------------------------------------

  const { userOperation, isUserOperationLoading } = useQueryUserOperation({
    hash: userOperationHash,
  });

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  if (!userOperation) {
    return null;
  }

  return (
    <DataTable
      isDefaultOpen
      isLoading={isUserOperationLoading}
      isTestnet={walletSettings.is_enabled_testnet}
      data={userOperation ? [userOperation] : []}
      address={userOperation.sender as Address}
      columns={userOperationColumns}
      tableType="user-operation-details"
      pageCount={1}
    />
  );
};
