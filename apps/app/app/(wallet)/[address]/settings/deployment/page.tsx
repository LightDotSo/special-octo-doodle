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

import { Loader } from "@/app/(wallet)/[address]/settings/deployment/loader";
import { handler } from "@/handlers/[address]/settings/deployment/handler";
import { preloader } from "@/preloaders/[address]/preloader";
import { queryKeys } from "@lightdotso/query-keys";
import { getQueryClient } from "@lightdotso/services";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import type { Address, Hex } from "viem";

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type PageProps = {
  params: Promise<{ address: string }>;
};

// -----------------------------------------------------------------------------
// Page
// -----------------------------------------------------------------------------

export default async function Page({ params }: PageProps) {
  // ---------------------------------------------------------------------------
  // Preloaders
  // ---------------------------------------------------------------------------

  preloader(await params);

  // ---------------------------------------------------------------------------
  // Handlers
  // ---------------------------------------------------------------------------

  const { wallet, configuration, walletSettings, userOperations } =
    await handler(await params);

  // ---------------------------------------------------------------------------
  // Query
  // ---------------------------------------------------------------------------

  const queryClient = getQueryClient();

  queryClient.setQueryData(
    queryKeys.user_operation.list({
      address: (await params).address as Address,
      status: "history",
      order: "asc",
      limit: Number.MAX_SAFE_INTEGER,
      offset: 0,
      is_testnet: walletSettings?.is_enabled_testnet ?? false,
    }).queryKey,
    userOperations,
  );

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Loader
        params={await params}
        image_hash={configuration.image_hash as Hex}
        salt={wallet.salt as Hex}
        is_enabled_testnet={walletSettings?.is_enabled_testnet ?? false}
      />
    </HydrationBoundary>
  );
}
