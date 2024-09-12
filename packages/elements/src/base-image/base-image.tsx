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

"use client";

import { cn } from "@lightdotso/utils";
import type { ImageProps } from "next/image";
import { type FC, type ReactNode, useState } from "react";
import { NextImage } from "../next-image/next-image";

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type BaseImageProps = ImageProps & {
  containerClassName?: string;
  blurhash?: ReactNode;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export const BaseImage: FC<BaseImageProps> = ({
  className,
  containerClassName,
  src,
  alt,
  blurhash,
}) => {
  // ---------------------------------------------------------------------------
  // State Hooks
  // ---------------------------------------------------------------------------

  const [isImageLoaded, setIsImageLoaded] = useState(false);

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <div
      className={cn(
        "relative aspect-h-1 aspect-w-1 w-full overflow-hidden bg-background",
        containerClassName,
      )}
    >
      {!isImageLoaded && blurhash}
      <NextImage
        className={cn(
          "absolute inset-0 w-full duration-500 ease-in-out",
          !isImageLoaded && "animate-pulse bg-emphasis-medium",
          isImageLoaded
            ? "scale-100 blur-0 grayscale-0 group-hover:scale-125 group-hover:blur-2 group-hover:grayscale-0"
            : "scale-90 blur-xl",
          className,
        )}
        src={src}
        alt={alt}
        onLoad={() => setIsImageLoaded(true)}
      />
    </div>
  );
};
