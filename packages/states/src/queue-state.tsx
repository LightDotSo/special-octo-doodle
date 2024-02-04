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

import {
  useMutationQueuePortfolio,
  useMutationQueueToken,
} from "@lightdotso/query";
import { useAuth, useQueues } from "@lightdotso/stores";
import type { FC } from "react";
import { useEffect } from "react";
import type { Address } from "viem";

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export const QueueState: FC = () => {
  // ---------------------------------------------------------------------------
  // Stores
  // ---------------------------------------------------------------------------

  const { address } = useAuth();
  const {
    tokenQueueTimestamp,
    portfolioQueueTimestamp,
    setTokenQueueTimestamp,
    setPortfolioQueueTimestamp,
  } = useQueues();

  // ---------------------------------------------------------------------------
  // Query
  // ---------------------------------------------------------------------------

  const { queueToken } = useMutationQueueToken({
    address: address as Address,
  });

  const { queuePortfolio } = useMutationQueuePortfolio({
    address: address as Address,
  });

  // ---------------------------------------------------------------------------
  // Effect Hooks
  // ---------------------------------------------------------------------------

  useEffect(() => {
    if (!useQueues.persist.hasHydrated()) {
      useQueues.persist.rehydrate();
    }
  }, []);

  useEffect(() => {
    // Wait for persisted state to load
    if (!address || !useQueues.persist.hasHydrated()) {
      return;
    }

    const now = Date.now();
    const THREE_MINUTES_IN_MILLISECONDS = 3 * 60 * 1000;

    if (now - (tokenQueueTimestamp || 0) > THREE_MINUTES_IN_MILLISECONDS) {
      queueToken();
      setTokenQueueTimestamp(now);
    } else if (
      now - (portfolioQueueTimestamp || 0) >
      THREE_MINUTES_IN_MILLISECONDS
    ) {
      queuePortfolio();
      setPortfolioQueueTimestamp(now);
    }
  }, [
    tokenQueueTimestamp,
    portfolioQueueTimestamp,
    queueToken,
    queuePortfolio,
    setPortfolioQueueTimestamp,
    setTokenQueueTimestamp,
    address,
  ]);

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return null;
};
