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

import { getWallet } from "@lightdotso/client";
import { Avatar, Button, TooltipProvider } from "@lightdotso/ui";
import { splitAddress } from "@lightdotso/utils";
import { useSuspenseQuery, useQueryClient } from "@tanstack/react-query";
import { Send } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import type { FC } from "react";
import type { Address } from "viem";
import { useEnsName } from "wagmi";
import { WalletOverviewBannerSparkline } from "@/app/(wallet)/[address]/overview/(components)/wallet-overview-banner-sparkline";
import { PlaceholderOrb } from "@/components/lightdotso/placeholder-orb";
import type { WalletData } from "@/data";
import { queries } from "@/queries";

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

interface WalletOverviewBannerProps {
  address: Address;
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export const WalletOverviewBanner: FC<WalletOverviewBannerProps> = ({
  address,
}) => {
  const { data: ens } = useEnsName({
    address: address,
  });

  // ---------------------------------------------------------------------------
  // Query
  // ---------------------------------------------------------------------------

  const queryClient = useQueryClient();

  const currentData: WalletData | undefined = queryClient.getQueryData(
    queries.wallet.get(address).queryKey,
  );

  const { data: wallet } = useSuspenseQuery<WalletData | null>({
    queryKey: queries.wallet.get(address).queryKey,
    queryFn: async () => {
      if (!address) {
        return null;
      }

      const res = await getWallet({
        params: {
          query: {
            address: address,
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

  return (
    <TooltipProvider>
      <div className="grid grid-cols-1 gap-x-4 lg:grid-cols-4">
        <div className="col-span-2 flex w-full flex-row items-center space-x-5 border-r border-border">
          <Avatar className="h-16 w-16">
            <PlaceholderOrb address={address ?? "0x"} />
          </Avatar>
          <div className="flex justify-start overflow-hidden text-ellipsis text-left text-2xl font-extrabold tracking-tight text-text">
            {wallet
              ? wallet.name
              : ens ?? (typeof address === "string" && splitAddress(address))}
          </div>
        </div>
        <div className="col-span-1 flex w-full">
          <Suspense fallback={null}>
            <WalletOverviewBannerSparkline address={address} />
          </Suspense>
        </div>
        <div className="col-span-1 flex w-full items-center justify-end space-x-4">
          <Button asChild size="sm" className="rounded-full p-3">
            <Link href={`/${address}/send`}>
              <Send className="h-3 w-3" />
              <span className="sr-only">Open send</span>
            </Link>
          </Button>
          <Button
            size="sm"
            type="button"
            className="w-full md:w-24"
            onClick={() => {}}
          >
            Deposit
          </Button>
        </div>
      </div>
    </TooltipProvider>
  );
};
