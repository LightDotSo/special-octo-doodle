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

import { Loading } from "@/app/(wallet)/[address]/transactions/history/loading";
import type { PageProps as OriginalPageProps } from "@/app/(wallet)/[address]/transactions/history/page";
import dynamic from "next/dynamic";
import type { Address } from "viem";

// -----------------------------------------------------------------------------
// Dynamic
// -----------------------------------------------------------------------------

const TransactionsDataTable = dynamic(
  () =>
    import(
      "@/app/(wallet)/[address]/transactions/(components)/transactions-data-table"
    ).then((mod) => mod.TransactionsDataTable),
  {
    loading: () => <Loading />,
    ssr: false,
  },
);

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type PageProps = {
  params: Awaited<OriginalPageProps["params"]>;
  searchParams: Awaited<OriginalPageProps["searchParams"]>;
};

// -----------------------------------------------------------------------------
// Loader
// -----------------------------------------------------------------------------

export function Loader({ params }: PageProps) {
  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <TransactionsDataTable
      address={params.address as Address}
      status="history"
      tableType="card"
    />
  );
}
