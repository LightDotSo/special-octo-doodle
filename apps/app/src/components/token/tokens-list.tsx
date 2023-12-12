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

import { getTokens } from "@lightdotso/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@lightdotso/ui";
import { useSuspenseQuery, useQueryClient } from "@tanstack/react-query";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type { FC } from "react";
import type { Address } from "viem";
import { columns } from "@/app/(wallet)/[address]/overview/tokens/(components)/data-table/columns";
import { TokensEmpty } from "@/components/token/tokens-empty";
import type { TokenData, WalletSettingsData } from "@/data";
import { queries } from "@/queries";
import { useTables } from "@/stores/useTables";

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

export type TokensListProps = {
  address: Address;
  limit?: number;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export const TokensList: FC<TokensListProps> = ({ address, limit }) => {
  // ---------------------------------------------------------------------------
  // Store
  // ---------------------------------------------------------------------------

  const {
    transactionColumnFilters,
    transactionColumnVisibility,
    transactionRowSelection,
    transactionSorting,
  } = useTables();

  // ---------------------------------------------------------------------------
  // Query
  // ---------------------------------------------------------------------------

  const queryClient = useQueryClient();

  const walletSettings: WalletSettingsData | undefined =
    queryClient.getQueryData(queries.wallet.settings(address).queryKey);

  const currentData: TokenData[] | undefined = queryClient.getQueryData(
    queries.token.list({
      address,
      is_testnet: walletSettings?.is_enabled_testnet,
    }).queryKey,
  );

  const { data } = useSuspenseQuery<TokenData[] | null>({
    queryKey: queries.token.list({
      address,
      is_testnet: walletSettings?.is_enabled_testnet,
    }).queryKey,
    queryFn: async () => {
      const res = await getTokens({
        params: {
          query: {
            address,
            is_testnet: walletSettings?.is_enabled_testnet,
          },
        },
      });

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

  // ---------------------------------------------------------------------------
  // Table
  // ---------------------------------------------------------------------------

  const table = useReactTable({
    data: data ?? ([] as TokenData[]),
    columns: columns,
    state: {
      sorting: transactionSorting,
      columnVisibility: transactionColumnVisibility,
      rowSelection: transactionRowSelection,
      columnFilters: transactionColumnFilters,
      pagination: {
        pageIndex: 0,
        pageSize: -1,
      },
    },
    paginateExpandedRows: false,
    enableRowSelection: false,
    getCoreRowModel: getCoreRowModel(),
  });

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map(headerGroup => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map(header => {
              return (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </TableHead>
              );
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows?.length ? (
          table
            .getRowModel()
            .rows.slice(0, limit || table.getRowModel().rows?.length)
            .map(row => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
        ) : (
          <TokensEmpty />
        )}
      </TableBody>
    </Table>
  );
};
