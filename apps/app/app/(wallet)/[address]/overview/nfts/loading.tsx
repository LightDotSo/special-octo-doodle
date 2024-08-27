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

import { DataTable } from "@/app/(wallet)/[address]/overview/nfts/(components)/data-table/data-table";
import { PortfolioSection } from "@/components/section/portfolio-section";
import { nftListData } from "@lightdotso/demo";
import { DataTablePagination } from "@lightdotso/templates";
import { Skeleton, TableSectionWrapper } from "@lightdotso/ui";

// -----------------------------------------------------------------------------
// Loading
// -----------------------------------------------------------------------------

// biome-ignore lint/style/noDefaultExport: <explanation>
export default function Loading() {
  <>
    <PortfolioSection title="Total Token Value">
      <Skeleton className="h-10 w-8" />
    </PortfolioSection>
    <TableSectionWrapper>
      <DataTable isLoading data={nftListData.nfts} columns={[]} />
    </TableSectionWrapper>
    <DataTablePagination isLoading table={null} />
  </>;
}
