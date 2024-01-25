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

import { useIsMounted } from "@lightdotso/hooks";
import { useAuth } from "@lightdotso/stores";
import {
  Popover,
  PopoverTrigger,
  Button,
  PopoverContent,
} from "@lightdotso/ui";
import { Megaphone } from "lucide-react";
import { useState } from "react";
import type { FC } from "react";
import { FeedbackForm } from "@/components/feedback/feedback-form";

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export const FeedbackPopover: FC = () => {
  // ---------------------------------------------------------------------------
  // Hooks
  // ---------------------------------------------------------------------------

  const isMounted = useIsMounted();

  // ---------------------------------------------------------------------------
  // State Hooks
  // ---------------------------------------------------------------------------

  const [open, setOpen] = useState(false);

  // ---------------------------------------------------------------------------
  // Stores
  // ---------------------------------------------------------------------------

  const { address } = useAuth();

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  // If the address is empty, return null
  if (!isMounted || !address) {
    return null;
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="px-2">
          <Megaphone className="mr-2 size-4 shrink-0" />
          Feedback
          <span className="sr-only">Open popover</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <FeedbackForm onClose={() => setOpen(false)} />
      </PopoverContent>
    </Popover>
  );
};
