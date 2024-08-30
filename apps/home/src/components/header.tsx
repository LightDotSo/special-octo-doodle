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

import { LightHorizontalLogo } from "@lightdotso/svg";
import { Button } from "@lightdotso/ui/components/button";
import type { FC } from "react";
import { Menu } from "./menu";

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export const Header: FC = () => {
  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <div className="mx-auto flex max-w-3xl items-center justify-between px-2">
      <LightHorizontalLogo className="size-20 shrink-0" />
      <div className="relative z-10 hidden sm:block">
        <Menu />
      </div>
      <Button className="shrink-0" asChild>
        <a href="/">Launch App</a>
      </Button>
    </div>
  );
};
