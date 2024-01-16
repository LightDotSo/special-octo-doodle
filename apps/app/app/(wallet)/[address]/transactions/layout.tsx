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

import {
  BaseLayerWrapper,
  MiddleLayerWrapper,
  BasicPageWrapper,
} from "@lightdotso/ui";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import type { Address } from "viem";
import { OverviewInvokeButton } from "@/app/(wallet)/[address]/transactions/(components)/overview/overview-invoke-button";
import { BannerSection } from "@/components/section/banner-section";
import { LinkButtonGroup } from "@/components/section/link-button-group";
import { TITLES } from "@/const";

// -----------------------------------------------------------------------------
// Const
// -----------------------------------------------------------------------------

const transactionsNavItems = [
  {
    title: "All",
    href: "/transactions",
    id: "transactions",
  },
  {
    title: "Queue",
    href: "/transactions/queue",
    id: "queue",
  },
  {
    title: "History",
    href: "/transactions/history",
    id: "history",
  },
];

// -----------------------------------------------------------------------------
// Metadata
// -----------------------------------------------------------------------------

export const metadata: Metadata = {
  title: TITLES.Transactions.title,
  description: TITLES.Transactions.description,
};

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

interface TransactionsLayoutProps {
  children: ReactNode;
  nav: ReactNode;
  params: {
    address: string;
  };
}

// -----------------------------------------------------------------------------
// Layout
// -----------------------------------------------------------------------------

export default function TransactionsLayout({
  children,
  nav,
  params,
}: TransactionsLayoutProps) {
  return (
    // ---------------------------------------------------------------------------
    // Render
    // ---------------------------------------------------------------------------

    <>
      <BannerSection
        title={TITLES.Transactions.title}
        description={TITLES.Transactions.description}
      >
        <MiddleLayerWrapper>
          <LinkButtonGroup items={transactionsNavItems}>
            {nav}
            <OverviewInvokeButton address={params.address as Address} />
          </LinkButtonGroup>
        </MiddleLayerWrapper>
      </BannerSection>
      <BaseLayerWrapper>
        <BasicPageWrapper>{children}</BasicPageWrapper>
      </BaseLayerWrapper>
    </>
  );
}
