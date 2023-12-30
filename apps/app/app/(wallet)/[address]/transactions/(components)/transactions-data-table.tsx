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

"use client";

import { getUserOperations, getUserOperationsCount } from "@lightdotso/client";
import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useMemo, type FC } from "react";
import type { Address } from "viem";
import { columns } from "@/app/(wallet)/[address]/transactions/(components)/data-table/columns";
import { DataTable } from "@/app/(wallet)/[address]/transactions/(components)/data-table/data-table";
import type {
  UserOperationCountData,
  UserOperationData,
  WalletSettingsData,
} from "@/data";
import { queryKeys } from "@/queryKeys";
import { usePaginationQueryState } from "@/querystates";
import { useAuth } from "@/stores";

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

interface TransactionsDataTableProps {
  address: Address;
  status: "proposed" | "history";
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export const TransactionsDataTable: FC<TransactionsDataTableProps> = ({
  address,
  status,
}) => {
  // ---------------------------------------------------------------------------
  // Stores
  // ---------------------------------------------------------------------------

  const { clientType } = useAuth();

  // ---------------------------------------------------------------------------
  // Query State Hooks
  // ---------------------------------------------------------------------------

  const [paginationState] = usePaginationQueryState();

  // ---------------------------------------------------------------------------
  // Effect Hooks
  // ---------------------------------------------------------------------------

  const offsetCount = useMemo(() => {
    return paginationState.pageSize * paginationState.pageIndex;
  }, [paginationState.pageSize, paginationState.pageIndex]);

  // ---------------------------------------------------------------------------
  // Query
  // ---------------------------------------------------------------------------

  const queryClient = useQueryClient();

  const walletSettings: WalletSettingsData | undefined =
    queryClient.getQueryData(queryKeys.wallet.settings({ address }).queryKey);

  const currentData: UserOperationData[] | undefined = queryClient.getQueryData(
    queryKeys.user_operation.list({
      address,
      status,
      order: status === "proposed" ? "asc" : "desc",
      limit: paginationState.pageSize,
      offset: offsetCount,
      is_testnet: walletSettings?.is_enabled_testnet ?? false,
    }).queryKey,
  );

  const { data: transactions } = useQuery<UserOperationData[] | null>({
    placeholderData: keepPreviousData,
    queryKey: queryKeys.user_operation.list({
      address,
      status,
      order: status === "proposed" ? "asc" : "desc",
      limit: paginationState.pageSize,
      offset: offsetCount,
      is_testnet: walletSettings?.is_enabled_testnet ?? false,
    }).queryKey,
    queryFn: async () => {
      const res = await getUserOperations(
        {
          params: {
            query: {
              address,
              status,
              order: status === "proposed" ? "asc" : "desc",
              limit: paginationState.pageSize,
              offset: offsetCount,
              is_testnet: walletSettings?.is_enabled_testnet ?? false,
            },
          },
        },
        clientType,
      );

      // Return if the response is 200
      return res.match(
        data => {
          return data;
        },
        _ => {
          return currentData ?? null;
        },
      );
    },
  });

  const currentCountData: UserOperationCountData | undefined =
    queryClient.getQueryData(
      queryKeys.user_operation.listCount({
        address: address as Address,
        status,
        is_testnet: walletSettings?.is_enabled_testnet ?? false,
      }).queryKey,
    );

  const { data: userOperationsCount } = useQuery<UserOperationCountData | null>(
    {
      queryKey: queryKeys.user_operation.listCount({
        address: address as Address,
        status,
        is_testnet: walletSettings?.is_enabled_testnet ?? false,
      }).queryKey,
      queryFn: async () => {
        if (!address) {
          return null;
        }

        const res = await getUserOperationsCount(
          {
            params: {
              query: {
                address: address,
                status: status,
                is_testnet: walletSettings?.is_enabled_testnet ?? false,
              },
            },
          },
          clientType,
        );

        // Return if the response is 200
        return res.match(
          data => {
            return data;
          },
          _ => {
            return currentCountData ?? null;
          },
        );
      },
    },
  );

  // ---------------------------------------------------------------------------
  // Effect Hooks
  // ---------------------------------------------------------------------------

  const pageCount = useMemo(() => {
    if (!userOperationsCount || !userOperationsCount?.count) {
      return null;
    }
    return Math.ceil(userOperationsCount.count / paginationState.pageSize);
  }, [userOperationsCount, paginationState.pageSize]);

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <DataTable
      data={transactions ?? []}
      address={address}
      columns={columns}
      pageCount={pageCount ?? 0}
    />
  );
};
