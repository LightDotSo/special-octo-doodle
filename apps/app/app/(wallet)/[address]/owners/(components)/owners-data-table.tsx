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

import { getConfiguration } from "@lightdotso/client";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { type FC } from "react";
import type { Address } from "viem";
import { columns } from "@/app/(wallet)/[address]/owners/(components)/data-table/columns";
import { DataTable } from "@/app/(wallet)/[address]/owners/(components)/data-table/data-table";
import type { ConfigurationData } from "@/data";
import { queryKeys } from "@/queryKeys";
import { useAuth } from "@/stores";

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

interface OwnersDataTableProps {
  address: Address;
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export const OwnersDataTable: FC<OwnersDataTableProps> = ({ address }) => {
  // ---------------------------------------------------------------------------
  // Stores
  // ---------------------------------------------------------------------------

  const { clientType } = useAuth();

  // ---------------------------------------------------------------------------
  // Query
  // ---------------------------------------------------------------------------

  const queryClient = useQueryClient();

  const currentData: ConfigurationData | undefined = queryClient.getQueryData(
    queryKeys.configuration.get({ address }).queryKey,
  );

  const { data: configuration } = useQuery<ConfigurationData | null>({
    queryKey: queryKeys.configuration.get({ address }).queryKey,
    queryFn: async () => {
      if (!address) {
        return null;
      }

      const res = await getConfiguration(
        {
          params: {
            query: {
              address: address,
            },
          },
        },
        clientType,
      );

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

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <div className="space-y-4">
      <div className="rounded-md border border-border bg-background">
        <DataTable data={configuration?.owners ?? []} columns={columns} />
      </div>
    </div>
  );
};
