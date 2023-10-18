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

import { Button } from "@lightdotso/ui";
import { useCallback } from "react";
import type { Address, Hex } from "viem";
import { useAuth } from "@/stores/useAuth";
import { ContractLinks } from "@lightdotso/const";
import { calculateInitCode } from "@lightdotso/solutions";
import { useRouter } from "next/navigation";

type DeployButtonProps = {
  chainId?: number;
  image_hash: Hex;
  salt: Hex;
  children: React.ReactNode;
};

export function DeployButton({
  chainId = 11155111,
  image_hash,
  salt,
  children,
}: DeployButtonProps) {
  const { wallet } = useAuth();
  const router = useRouter();

  const deploy = useCallback(() => {
    if (!wallet) return;

    let initCode = calculateInitCode(
      ContractLinks["Factory"] as Address,
      image_hash,
      salt,
    );

    router.push(`/${wallet}/transaction/${chainId}?initCode=${initCode}`);
  }, [chainId, image_hash, router, salt, wallet]);

  return (
    <Button
      onClick={() => {
        deploy();
      }}
    >
      {children}
    </Button>
  );
}
