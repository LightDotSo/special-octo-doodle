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

import { inngest } from "@/inngest/client";
import { NonRetriableError } from "inngest";
import { ChainIdMapping } from "@/const/covalent";

export const walletTransactionInvoke = inngest.createFunction(
  {
    id: "wallet-transaction-invoke",
    rateLimit: {
      key: "event.data.address",
      limit: 1,
      period: "3h",
    },
  },
  { event: "wallet/transaction.invoke" },
  async ({ event, step, prisma }) => {
    const wallet = await step.run("Find wallet in db", async () => {
      const data = prisma.wallet.findUnique({
        where: {
          address: event.data.address,
        },
      });

      if (!data) {
        throw new NonRetriableError("Wallet not found", {
          cause: new Error("no wallet exists"),
        });
      }

      return data;
    });

    // For each chainId in the `ChainIdMapping`, send an `wallet/transaction.covalent.set` event.
    // with the array of chainIds.
    const chainIds = Object.keys(ChainIdMapping).map(chainId => {
      return parseInt(chainId);
    });
    await step.sendEvent("Set the portfolio", {
      name: "wallet/transaction.covalent.set",
      data: {
        address: wallet!.address,
        chainIds,
      },
    });
  },
);
