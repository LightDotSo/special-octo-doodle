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

import { ChainLogo } from "@lightdotso/svg";
import type { FC } from "react";
import { Chain } from "viem";

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

interface ChainStackProps {
  chains: Chain[];
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export const ChainStack: FC<ChainStackProps> = ({ chains }) => {
  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <div className="flex -space-x-1.5 overflow-hidden">
      {chains.slice(0, 5).map(chain => (
        <ChainLogo
          key={chain.id}
          chainId={chain.id}
          className="size-6 rounded-lg bg-border"
        />
      ))}
    </div>
  );
};
