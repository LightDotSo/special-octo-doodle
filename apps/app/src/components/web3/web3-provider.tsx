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

import { createConfig, http } from "@wagmi/core";
import type { ReactNode } from "react";
import type { Address } from "viem";
import { createClient } from "viem";
import { WagmiProvider } from "wagmi";
import { injected, walletConnect } from "wagmi/connectors";
import { CHAINS, MAINNET_CHAINS } from "@/const/chains";
import { useSuspenseQueryWalletSettings } from "@/query";
import { useAuth } from "@/stores";

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

function Web3Provider({ children }: { children: ReactNode }) {
  // ---------------------------------------------------------------------------
  // Stores
  // ---------------------------------------------------------------------------

  const { address } = useAuth();

  // ---------------------------------------------------------------------------
  // Query
  // ---------------------------------------------------------------------------

  const { walletSettings } = useSuspenseQueryWalletSettings({
    address: address as Address,
  });

  // -----------------------------------------------------------------------------
  // Wagmi
  // -----------------------------------------------------------------------------

  // Set up wagmi config
  const config = createConfig({
    chains: walletSettings?.is_enabled_testnet ? CHAINS : MAINNET_CHAINS,
    client({ chain }) {
      return createClient({ chain, transport: http() });
    },
    connectors: [
      injected(),
      walletConnect({
        projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID!,
      }),
    ],
  });

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return <WagmiProvider config={config}>{children}</WagmiProvider>;
}

export { Web3Provider };
