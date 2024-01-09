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

import { createEdgeHandler } from "@upstash/edge-flags";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// -----------------------------------------------------------------------------
// Client
// -----------------------------------------------------------------------------

export const redis = new Redis({
  url: `https://${process.env.UPSTASH_REST_API_DOMAIN!}`,
  token: process.env.UPSTASH_REST_API_TOKEN!,
});

// -----------------------------------------------------------------------------
// Ratelimit
// -----------------------------------------------------------------------------

export const ratelimit = new Ratelimit({
  redis: redis,
  analytics: true,
  limiter: Ratelimit.slidingWindow(2, "30s"),
});

// -----------------------------------------------------------------------------
// Edge
// -----------------------------------------------------------------------------

export const edgeHandler = createEdgeHandler({
  // 3 days
  maxAge: 60 * 60 * 24 * 3,
  redisUrl: `https://${process.env.UPSTASH_REST_API_DOMAIN!}`,
  redisToken: process.env.UPSTASH_REST_API_TOKEN!,
});
