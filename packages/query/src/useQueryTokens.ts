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

import { getTokens } from "@lightdotso/client";
import type { TokenData } from "@lightdotso/data";
import type { TokenListParams } from "@lightdotso/params";
import { queryKeys } from "@lightdotso/query-keys";
import { useAuth } from "@lightdotso/stores";
import { useQuery, useQueryClient } from "@tanstack/react-query";

// -----------------------------------------------------------------------------
// Query
// -----------------------------------------------------------------------------

export const useQueryTokens = (params: TokenListParams) => {
  // ---------------------------------------------------------------------------
  // Stores
  // ---------------------------------------------------------------------------

  const { clientType } = useAuth();

  // ---------------------------------------------------------------------------
  // Query
  // ---------------------------------------------------------------------------

  const queryClient = useQueryClient();

  const currentData: TokenData[] | undefined = queryClient.getQueryData(
    queryKeys.token.list({
      address: params.address,
      is_testnet: params.is_testnet,
      limit: params.limit,
      offset: params.offset,
      group: params.group,
      chain_ids: params.chain_ids,
    }).queryKey,
  );

  const {
    data: tokens,
    isLoading: isTokensLoading,
    failureCount,
  } = useQuery<TokenData[] | null>({
    queryKey: queryKeys.token.list({
      address: params.address,
      is_testnet: params.is_testnet,
      limit: params.limit,
      offset: params.offset,
      group: params.group,
      chain_ids: params.chain_ids,
    }).queryKey,
    queryFn: async () => {
      if (!params.address) {
        return null;
      }

      const res = await getTokens(
        {
          params: {
            query: {
              address: params.address,
              is_testnet: params.is_testnet,
              limit: params.limit,
              offset: params.offset,
              group: params.group,
              chain_ids: params.chain_ids,
            },
          },
        },
        clientType,
      );

      return res.match(
        data => {
          return data as TokenData[];
        },
        err => {
          if (failureCount % 3 !== 2) {
            throw err;
          }
          return currentData ?? null;
        },
      );
    },
  });

  return {
    tokens: tokens,
    isTokensLoading: isTokensLoading,
  };
};
