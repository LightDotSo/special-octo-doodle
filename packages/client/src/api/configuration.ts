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

import type { ConfigurationData } from "@lightdotso/data";
import { ResultAsync, err, ok } from "neverthrow";
import type { ClientType } from "../client";
import { getClient } from "../client";
import type { paths } from "../types/api/v1";
import { convertNeverThrowToPromise } from "../utils";

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

export type GetConfigurationParams =
  paths["/configuration/get"]["get"]["parameters"];

export type GetConfigurationResponse = Promise<
  ResultAsync<
    ConfigurationData,
    Error | { BadRequest: string } | { NotFound: string } | undefined
  >
>;

// -----------------------------------------------------------------------------
// GET
// -----------------------------------------------------------------------------

export const getConfiguration = async (
  {
    params,
  }: {
    params: GetConfigurationParams;
  },
  clientType?: ClientType,
): GetConfigurationResponse => {
  const client = getClient(clientType);

  return ResultAsync.fromPromise(
    client.GET("/configuration/get", {
      params: params,
    }),
    () => new Error("Database error"),
  ).andThen(({ data, response, error }) => {
    return response.status === 200 && data ? ok(data) : err(error);
  });
};

export const getConfigurationWithPromise = (params: GetConfigurationParams) =>
  convertNeverThrowToPromise(getConfiguration({ params }));
