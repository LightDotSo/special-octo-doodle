// Copyright 2023-2024 Light, Inc.
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

import type { TokenData } from "@lightdotso/data";
import type { FC } from "react";
import { ChainCard } from "../../(components)/card";
import { ChainStack } from "@lightdotso/elements";
import { getChainById } from "@lightdotso/utils";

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type TokenCardChainProps = {
  token: TokenData;
  isGrouped?: boolean;
  tokens?: TokenData[];
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export const TokenCardChain: FC<TokenCardChainProps> = ({
  token: { chain_id, group },
  isGrouped,
  tokens,
}) => {
  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  if (isGrouped) {
    // Get the grouped tokens w/ the same group
    const chains = tokens
      ?.filter(t => t.group?.id === group?.id)
      .map(t => getChainById(t.chain_id));

    if (!chains) {
      return null;
    }

    return <ChainStack chains={chains} />;
  }

  return <ChainCard chain_id={chain_id} />;
};
