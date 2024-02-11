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

import { SIMPLEHASH_MAX_COUNT } from "@lightdotso/const";
import type { NftData } from "@lightdotso/data";
import { useCursorQueryState, usePaginationQueryState } from "@lightdotso/nuqs";
import { useTables } from "@lightdotso/stores";
import { NftTable } from "@lightdotso/tables";
import type { ColumnDef } from "@tanstack/react-table";

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

interface DataTableProps {
  isLoading: boolean;
  columns: ColumnDef<NftData>[];
  data: NftData[];
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export function DataTable({ isLoading, columns, data }: DataTableProps) {
  // ---------------------------------------------------------------------------
  // Query State Hooks
  // ---------------------------------------------------------------------------

  const [cursorState] = useCursorQueryState();
  const [paginationState, setPaginationState] = usePaginationQueryState();

  // ---------------------------------------------------------------------------
  // Stores
  // ---------------------------------------------------------------------------

  const {
    nftColumnFilters,
    nftColumnVisibility,
    nftRowSelection,
    nftSorting,
    setNftColumnFilters,
    setNftColumnVisibility,
    setNftRowSelection,
    setNftSorting,
    setNftTable,
  } = useTables();

  // ---------------------------------------------------------------------------
  // Table
  // ---------------------------------------------------------------------------

  const tableOoptions = {
    state: {
      sorting: nftSorting,
      columnVisibility: nftColumnVisibility,
      rowSelection: nftRowSelection,
      columnFilters: nftColumnFilters,
      pagination: paginationState,
    },
    pageCount: cursorState
      ? paginationState.pageIndex + 2
      : paginationState.pageIndex + 1,
    paginateExpandedRows: false,
    enableRowSelection: true,
    manualPagination: true,
    onRowSelectionChange: setNftRowSelection,
    onSortingChange: setNftSorting,
    onColumnFiltersChange: setNftColumnFilters,
    onColumnVisibilityChange: setNftColumnVisibility,
    onPaginationChange: setPaginationState,
  };

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <NftTable
      isLoading={isLoading}
      pageSize={SIMPLEHASH_MAX_COUNT}
      data={data}
      columns={columns}
      tableOptions={tableOoptions}
      setNftTable={setNftTable}
    />
  );
}
