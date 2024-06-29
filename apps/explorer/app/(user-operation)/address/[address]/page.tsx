// Copyright 2023-2024 Light
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

import { queryKeys } from "@lightdotso/query-keys";
import { getQueryClient } from "@lightdotso/services";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { unstable_noStore } from "next/cache";
import type { Address } from "viem";
import { UserOperationsDataTable } from "@/app/(user-operation)/(components)/user-operations-data-table";
import { UserOperationsDataTablePagination } from "@/app/(user-operation)/(components)/user-operations-data-table-pagination";
import { handler } from "@/handlers/address/[address]/handler";
import { preloader } from "@/preloaders/address/[address]/preloader";

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type PageProps = {
  params: { address: string };
  searchParams: {
    isTestnet?: string;
    pagination?: string;
  };
};

// -----------------------------------------------------------------------------
// Page
// -----------------------------------------------------------------------------

export default async function Page({ params, searchParams }: PageProps) {
  // ---------------------------------------------------------------------------
  // Cache
  // ---------------------------------------------------------------------------

  unstable_noStore();

  // ---------------------------------------------------------------------------
  // Preloaders
  // ---------------------------------------------------------------------------

  preloader(params, searchParams);

  // ---------------------------------------------------------------------------
  // Handlers
  // ---------------------------------------------------------------------------

  const {
    isTestnetState,
    paginationState,
    userOperations,
    userOperationsCount,
  } = await handler(params, searchParams);

  // ---------------------------------------------------------------------------
  // Query
  // ---------------------------------------------------------------------------

  const queryClient = getQueryClient();

  queryClient.setQueryData(
    queryKeys.user_operation.list({
      address: params.address as Address,
      status: "history",
      order: "asc",
      limit: paginationState.pageSize,
      offset: paginationState.pageIndex * paginationState.pageSize,
      is_testnet: isTestnetState ?? false,
    }).queryKey,
    userOperations,
  );

  queryClient.setQueryData(
    queryKeys.user_operation.listCount({
      address: params.address as Address,
      status: "history",
      is_testnet: isTestnetState ?? false,
    }).queryKey,
    userOperationsCount,
  );

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <UserOperationsDataTable address={params.address as Address} />
      <UserOperationsDataTablePagination />
    </HydrationBoundary>
  );
}
