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

// Full complete example from: https://github.com/hqasmei/youtube-tutorials/blob/ee44df8fbf6ab4f4c2f7675f17d67813947a7f61/vercel-animated-tabs/src/components/tabs.tsx
// License: MIT

import { useBaseSlug } from "@lightdotso/hooks";
import type { Tab } from "@lightdotso/types";
import { Badge } from "@lightdotso/ui";
import { cn } from "@lightdotso/utils";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import type { FC } from "react";
import { usePathType } from "@/hooks";

// -----------------------------------------------------------------------------
// Const
// -----------------------------------------------------------------------------

const transition = {
  type: "tween",
  ease: "easeOut",
  duration: 0.15,
};

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type TabNavProps = {
  setSelectedTabIndex: (_index: number) => void;
  selectedTabIndex: number | undefined;
  tabs: Tab[];
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export const TabsNav: FC<TabNavProps> = ({
  tabs,
  selectedTabIndex,
  setSelectedTabIndex,
}) => {
  // ---------------------------------------------------------------------------
  // State Hooks
  // ---------------------------------------------------------------------------

  const [anchorRefs, setAnchorRefs] = useState<Array<HTMLAnchorElement | null>>(
    [],
  );
  const [isAnimated, setIsAnimated] = useState(false);

  // ---------------------------------------------------------------------------
  // Ref Hooks
  // ---------------------------------------------------------------------------

  const navRef = useRef<HTMLDivElement>(null);

  // ---------------------------------------------------------------------------
  // Hooks
  // ---------------------------------------------------------------------------

  const baseSlug = useBaseSlug();

  // ---------------------------------------------------------------------------
  // Operation Hooks
  // ---------------------------------------------------------------------------

  const pathType = usePathType();

  // ---------------------------------------------------------------------------
  // State Hooks
  // ---------------------------------------------------------------------------

  const [hoveredTabIndex, setHoveredTabIndex] = useState<number | null>(null);

  // ---------------------------------------------------------------------------
  // Local Variables
  // ---------------------------------------------------------------------------

  const navRect = navRef.current?.getBoundingClientRect();

  const selectedRect =
    selectedTabIndex !== undefined
      ? anchorRefs[selectedTabIndex]?.getBoundingClientRect()
      : undefined;

  const hoveredRect =
    anchorRefs[hoveredTabIndex ?? -1]?.getBoundingClientRect();

  // ---------------------------------------------------------------------------
  // Effect Hooks
  // ---------------------------------------------------------------------------

  // Set the anchor refs array length to the tabs length
  useEffect(() => {
    setAnchorRefs(prev => prev.slice(0, tabs.length));
  }, [tabs.length]);

  // Animate the indicator on first render
  useEffect(() => {
    if (
      selectedTabIndex !== undefined &&
      !isAnimated &&
      selectedRect &&
      navRect
    ) {
      setIsAnimated(true);
    }
  }, [selectedRect, navRect, selectedTabIndex, isAnimated]);

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  if (pathType === "unauthenticated" || pathType === "authenticated") {
    return null;
  }

  return (
    <nav
      ref={navRef}
      className="relative z-0 mb-1.5 mt-2 flex max-w-full shrink-0 items-center overflow-x-auto overflow-y-visible py-2"
      // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
      onPointerLeave={e => setHoveredTabIndex(null)}
    >
      {tabs.map((item, i) => {
        const isActive =
          hoveredTabIndex === i || selectedTabIndex === i || false;

        return (
          <Link
            key={i}
            passHref
            legacyBehavior
            href={`${baseSlug}${item.href}`}
          >
            <motion.a
              ref={el => (anchorRefs[i] = el)}
              className={cn(
                "relative z-20 mb-0.5 flex h-10 cursor-pointer select-none items-center rounded-md bg-transparent px-2.5 text-sm font-medium transition-colors hover:text-text-weak",
                !isActive ? "text-text-weak" : "text-text hover:text-text",
              )}
              onPointerEnter={() => {
                setHoveredTabIndex(i);
              }}
              onFocus={() => {
                setHoveredTabIndex(i);
              }}
              onClick={() => {
                setSelectedTabIndex(i);
              }}
            >
              {<item.icon className="mr-2 size-4" />}
              {item.label}
              {item?.number && item?.number !== 0 && (
                <Badge
                  type="number"
                  variant="outline"
                  className="font-sm ml-2 rounded-full border-0 bg-background-strong text-text-weak"
                >
                  {item?.number}
                </Badge>
              )}
            </motion.a>
          </Link>
        );
      })}
      <AnimatePresence>
        {hoveredRect && navRect && (
          <motion.div
            key={"hover"}
            className="absolute left-0 top-0 z-10 mb-1 rounded-md bg-background-stronger"
            initial={{
              x: hoveredRect.left - navRect.left,
              y: hoveredRect.top - navRect.top,
              width: hoveredRect.width,
              height: hoveredRect.height,
              opacity: 0,
            }}
            animate={{
              x: hoveredRect.left - navRect.left,
              y: hoveredRect.top - navRect.top,
              width: hoveredRect.width,
              height: hoveredRect.height,
              opacity: 1,
            }}
            exit={{
              x: hoveredRect.left - navRect.left,
              y: hoveredRect.top - navRect.top,
              width: hoveredRect.width,
              height: hoveredRect.height,
              opacity: 0,
            }}
            transition={transition}
          />
        )}
      </AnimatePresence>
      {selectedRect && navRect && isAnimated && (
        <motion.div
          className={
            "absolute bottom-0 left-0.5 z-10 h-[3px] rounded-lg bg-background-primary"
          }
          initial={false}
          animate={{
            width: selectedRect.width * 0.8,
            x: `calc(${selectedRect.left - navRect.left}px + 10%)`,
            opacity: 1,
          }}
          transition={transition}
        />
      )}
    </nav>
  );
};
