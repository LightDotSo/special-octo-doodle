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

import {
  useAddressQueryState,
  usePaginationQueryState,
} from "@lightdotso/nuqs";
import {
  useQueryNotifications,
  useQueryNotificationsCount,
} from "@lightdotso/query";
import { useAuth } from "@lightdotso/stores";
import { notificationColumns } from "@lightdotso/tables";
import { Login } from "@lightdotso/templates";
import { TableSectionWrapper } from "@lightdotso/ui";
import { cn } from "@lightdotso/utils";
import { useMemo, type FC } from "react";
import type { Address } from "viem";
import { DataTable } from "@/app/(authenticated)/notifications/(components)/data-table/data-table";

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export const NotificationsDataTable: FC = () => {
  // ---------------------------------------------------------------------------
  // Stores
  // ---------------------------------------------------------------------------

  const { sessionId } = useAuth();

  // ---------------------------------------------------------------------------
  // Query State Hooks
  // ---------------------------------------------------------------------------

  const [paginationState] = usePaginationQueryState();
  const [addressState] = useAddressQueryState();

  // ---------------------------------------------------------------------------
  // Memoized Hooks
  // ---------------------------------------------------------------------------

  const offsetCount = useMemo(() => {
    return paginationState.pageSize * paginationState.pageIndex;
  }, [paginationState.pageSize, paginationState.pageIndex]);

  // ---------------------------------------------------------------------------
  // Query
  // ---------------------------------------------------------------------------

  const { notifications, isNotificationsLoading } = useQueryNotifications({
    address: addressState as Address,
    limit: paginationState.pageSize,
    offset: offsetCount,
  });

  const { notificationsCount, isNotificationsCountLoading } =
    useQueryNotificationsCount({
      address: addressState as Address,
    });

  // ---------------------------------------------------------------------------
  // Memoized Hooks
  // ---------------------------------------------------------------------------

  const isLoading = useMemo(() => {
    return isNotificationsLoading || isNotificationsCountLoading;
  }, [isNotificationsLoading, isNotificationsCountLoading]);

  const pageCount = useMemo(() => {
    if (!notificationsCount || !notificationsCount?.count) {
      return null;
    }
    return Math.ceil(notificationsCount.count / paginationState.pageSize);
  }, [notificationsCount, paginationState.pageSize]);

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <>
      {!sessionId && <Login />}
      <TableSectionWrapper className={cn(sessionId ? "block" : "hidden")}>
        <DataTable
          isLoading={isLoading}
          data={notifications ?? []}
          columns={notificationColumns}
          pageCount={pageCount ?? 0}
        />
      </TableSectionWrapper>
    </>
  );
};
