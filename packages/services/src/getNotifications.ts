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

import { getNotifications as getClientNotifications } from "@lightdotso/client";
import type { WalletListParams } from "@lightdotso/params";
import "server-only";

// -----------------------------------------------------------------------------
// Pre
// -----------------------------------------------------------------------------

export const preloadGetNotifications = (params: WalletListParams) => {
  void getNotifications(params);
};

// -----------------------------------------------------------------------------
// Service
// -----------------------------------------------------------------------------

export const getNotifications = async (params: WalletListParams) => {
  return getClientNotifications(
    {
      params: {
        query: {
          address: params.address,
          limit: params.limit,
          offset: params.offset,
          user_id: params.user_id,
        },
      },
    },
    "admin",
  );
};
