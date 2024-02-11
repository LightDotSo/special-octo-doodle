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

import type {
  ForwardRefExoticComponent,
  PropsWithoutRef,
  RefAttributes,
  SVGProps,
} from "react";
import { forwardRef } from "react";

export const CeloLogo: ForwardRefExoticComponent<
  PropsWithoutRef<SVGProps<SVGSVGElement>> & RefAttributes<SVGSVGElement>
> = forwardRef((props, ref) => (
  <svg
    {...props}
    ref={ref}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_7984_9126)">
      <rect width="24" height="24" rx="6" fill="#FCFF52" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.3019 7H7V17.37H17.3027V13.75H15.5931C15.0038 15.0709 13.6772 15.9902 12.1591 15.9902C10.0664 15.9902 8.37153 14.2694 8.37153 12.178C8.37153 10.0859 10.0664 8.37977 12.1591 8.37977C13.7066 8.37977 15.0332 9.32933 15.6225 10.6789H17.3027L17.3019 7Z"
        fill="#09090B"
      />
    </g>
    <defs>
      <clipPath id="clip0_7984_9126">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
));

CeloLogo.displayName = "CeloLogo";
