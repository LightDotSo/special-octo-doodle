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

import { getActivities } from "@lightdotso/client";
import type { ActivityData } from "@lightdotso/data";
import type { ActivityListParams } from "@lightdotso/params";
import { queryKeys } from "@lightdotso/query-keys";
import { useAuth } from "@lightdotso/stores";
import { useQuery, useQueryClient } from "@tanstack/react-query";

// -----------------------------------------------------------------------------
// Query
// -----------------------------------------------------------------------------

export const useQueryActivities = (params: ActivityListParams) => {
  // ---------------------------------------------------------------------------
  // Stores
  // ---------------------------------------------------------------------------

  const { clientType } = useAuth();

  // ---------------------------------------------------------------------------
  // Query
  // ---------------------------------------------------------------------------

  const queryClient = useQueryClient();

  const currentData: ActivityData[] | undefined = queryClient.getQueryData(
    queryKeys.activity.list({
      address: params.address,
      limit: params.limit,
      offset: params.offset,
    }).queryKey,
  );

  const {
    data: activities,
    isLoading: isActivitiesLoading,
    failureCount,
  } = useQuery<ActivityData[] | null>({
    queryKey: queryKeys.activity.list({
      address: params.address,
      limit: params.limit,
      offset: params.offset,
    }).queryKey,
    queryFn: async () => {
      if (!params.address) {
        return null;
      }

      const res = await getActivities(
        {
          params: {
            query: {
              address: params.address,
              limit: params.limit,
              offset: params.offset,
            },
          },
        },
        clientType,
      );

      return res.match(
        (data) => {
          return data;
        },
        (err) => {
          if (failureCount % 3 !== 2) {
            throw err;
          }
          return currentData ?? null;
        },
      );
    },
  });

  return {
    activities: activities,
    isActivitiesLoading: isActivitiesLoading,
  };
};
