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

import type {
  ForwardRefExoticComponent,
  PropsWithoutRef,
  RefAttributes,
  SVGProps,
} from "react";
import { forwardRef } from "react";

export const ScrollLogo: ForwardRefExoticComponent<
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
    <title>Scroll</title>
    <g clipPath="url(#clip0_10113_10148)">
      <path d="M24 0H0V24H24V0Z" fill="#FFEEDA" />
      <path
        d="M18.0216 14.1622V5.97838C18.0108 5.29189 17.4649 4.74054 16.7784 4.74054H8.23784C6.39459 4.76757 4.91351 6.27567 4.91351 8.12432C4.91351 8.74594 5.08108 9.28108 5.33513 9.75135C5.55135 10.1405 5.89189 10.5081 6.22703 10.7838C6.32432 10.8595 6.27568 10.827 6.56757 11.0054C6.96757 11.2486 7.42703 11.373 7.42703 11.373L7.42162 16.2703C7.43243 16.5027 7.45405 16.7243 7.51892 16.9351C7.70811 17.627 8.18919 18.1568 8.83784 18.4108C9.10811 18.5189 9.41622 18.5892 9.74595 18.5946L16.5676 18.6162C17.9243 18.6162 19.027 17.5135 19.027 16.1513C19.0324 15.3405 18.627 14.6162 18.0216 14.1622Z"
        fill="#FFEEDA"
      />
      <path
        d="M18.1892 16.2108C18.1622 17.0811 17.4433 17.7838 16.5622 17.7838L11.8703 17.7676C12.2433 17.3351 12.4703 16.773 12.4703 16.1568C12.4703 15.1946 11.8973 14.5297 11.8973 14.5297H16.5676C17.4649 14.5297 18.1946 15.2595 18.1946 16.1568L18.1892 16.2108Z"
        fill="#EBC28E"
      />
      <path
        d="M6.67568 10.0919C6.13513 9.5784 5.75676 8.91894 5.75676 8.12976V8.04867C5.8 6.70813 6.9027 5.62705 8.24324 5.58921H16.7838C17.0054 5.60003 17.1838 5.75678 17.1838 5.98381V13.2108C17.3784 13.2433 17.4757 13.2703 17.6649 13.3406C17.8162 13.3946 18.0216 13.5135 18.0216 13.5135V5.98381C18.0108 5.29732 17.4649 4.74597 16.7784 4.74597H8.23784C6.39459 4.773 4.91351 6.28111 4.91351 8.12976C4.91351 9.20543 5.40541 10.1244 6.20541 10.7676C6.25946 10.8108 6.31351 10.8703 6.45405 10.8703C6.7027 10.8703 6.88108 10.6703 6.87027 10.4541C6.87027 10.2703 6.78919 10.2054 6.67568 10.0919Z"
        fill="#101010"
      />
      <path
        d="M16.5622 13.6865H9.86486C9.41621 13.6919 9.05405 14.054 9.05405 14.5027V15.4649C9.06486 15.9081 9.44324 16.2865 9.89729 16.2865H10.3946V15.4649H9.89188V14.5243C9.89188 14.5243 10.0162 14.5243 10.1622 14.5243C11.0108 14.5243 11.6324 15.3081 11.6324 16.1513C11.6324 16.8973 10.9513 17.8486 9.81621 17.773C8.8108 17.7081 8.26486 16.8108 8.26486 16.1513V7.98918C8.26486 7.62161 7.96215 7.31891 7.59459 7.31891H6.92432V8.15675H7.42161V16.1567C7.39459 17.7838 8.57837 18.6 9.81621 18.6L16.5676 18.6216C17.9243 18.6216 19.027 17.5189 19.027 16.1567C19.0324 14.7946 17.9243 13.6865 16.5622 13.6865ZM18.1892 16.2108C18.1622 17.0811 17.4432 17.7838 16.5622 17.7838L11.8703 17.7676C12.2432 17.3351 12.4703 16.773 12.4703 16.1567C12.4703 15.1946 11.8973 14.5297 11.8973 14.5297H16.5676C17.4649 14.5297 18.1946 15.2594 18.1946 16.1567L18.1892 16.2108Z"
        fill="#101010"
      />
      <path
        d="M14.7568 8.30811H9.70813V7.47028H14.7568C14.9838 7.47028 15.173 7.65406 15.173 7.88649C15.1784 8.11892 14.9946 8.30811 14.7568 8.30811Z"
        fill="#101010"
      />
      <path
        d="M14.7568 12.2378H9.70813V11.4054H14.7568C14.9838 11.4054 15.173 11.5892 15.173 11.8216C15.1784 12.0486 14.9946 12.2378 14.7568 12.2378Z"
        fill="#101010"
      />
      <path
        d="M15.6487 10.2703H9.70813V9.43243H15.6433C15.8703 9.43243 16.0595 9.61622 16.0595 9.84865C16.0703 10.0811 15.8811 10.2703 15.6487 10.2703Z"
        fill="#101010"
      />
    </g>
    <defs>
      <clipPath id="clip0_10113_10148">
        <rect width="24" height="24" rx="6" fill="white" />
      </clipPath>
    </defs>
  </svg>
));

ScrollLogo.displayName = "ScrollLogo";
