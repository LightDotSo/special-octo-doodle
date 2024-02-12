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

import { Button, ButtonIcon } from "@lightdotso/ui";
import { cn } from "@lightdotso/utils";
import { XIcon } from "lucide-react";
import Link from "next/link";
import type { FC, MouseEvent } from "react";

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

export interface FooterButtonProps {
  className?: string;
  disabled?: boolean;
  form?: string;
  cancelDisabled?: boolean;
  isLoading?: boolean;
  href?: string;
  isModal?: boolean;
  customSuccessText?: string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  cancelClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export const FooterButton: FC<FooterButtonProps> = ({
  className,
  disabled,
  cancelDisabled,
  form,
  isLoading,
  href,
  isModal,
  customSuccessText,
  onClick,
  cancelClick,
}) => {
  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <div
      className={cn(
        "flex flex-col space-y-4 pt-4 md:flex-row md:items-center md:justify-between md:space-y-0",
        className,
      )}
    >
      <span className="hidden md:block">
        <Button
          disabled={cancelDisabled}
          className="w-auto"
          variant="outline"
          onClick={cancelClick}
        >
          Cancel
        </Button>
      </span>
      {href && <Link href="/notifications">Notifications</Link>}
      <button onClick={() => window.alert("here")}>Here</button>
      {href ? (
        <Link href={href}>Continue</Link>
      ) : // <Button
      //   asChild
      //   className="w-full md:w-auto"
      //   isLoading={false}
      //   disabled={true}
      // >
      // <Link href={href}>Continue</Link>
      // </Button>
      form ? (
        <Button
          form={form}
          className="w-full md:w-auto"
          isLoading={isLoading}
          disabled={disabled}
          type="submit"
        >
          {customSuccessText ?? "Continue"}
        </Button>
      ) : (
        <Button
          className="w-full md:w-auto"
          isLoading={isLoading}
          disabled={disabled}
          onClick={onClick}
        >
          {customSuccessText ?? "Continue"}
        </Button>
      )}
      {isModal ? (
        <span className="inline-flex justify-center md:hidden">
          <ButtonIcon
            size="sm"
            className="rounded-full"
            variant="outline"
            onClick={cancelClick}
          >
            <XIcon />
          </ButtonIcon>
        </span>
      ) : (
        <Button
          className="block w-auto md:hidden"
          variant="outline"
          onClick={cancelClick}
        >
          Cancel
        </Button>
      )}
    </div>
  );
};
