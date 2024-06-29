// Copyright 2023-2024 Light
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

import type { FC, SVGProps } from "react";

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type LightogoProps = SVGProps<SVGSVGElement>;

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export const Lightogo: FC<LightogoProps> = ({ className, ...props }) => {
  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <svg
      width="171"
      height="171"
      viewBox="0 0 171 171"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M85.3339 6.1218e-05C70.2013 -0.0181096 55.3391 4.00917 42.2863 11.6648H128.376C115.325 4.01021 100.464 -0.0170325 85.3339 6.1218e-05ZM147.111 26.5013C150.555 30.1093 153.677 34.0114 156.442 38.163H14.2189C16.2609 35.1417 18.4958 32.2552 20.9096 29.5217H20.8069C21.0161 29.2832 21.2385 29.0605 21.4603 28.8385L21.4604 28.8385C21.6486 28.65 21.8364 28.4621 22.0153 28.2652C22.2359 28.0204 22.4489 27.7686 22.6619 27.5168L22.6619 27.5168L22.6619 27.5168L22.6619 27.5168L22.662 27.5168C22.9535 27.1722 23.245 26.8277 23.5557 26.5013H23.7008C26.6233 23.3899 29.7735 20.5005 33.1253 17.857H80.3083C76.9552 20.4989 73.8049 23.3885 70.8838 26.5013H147.111ZM168.134 64.6555C167.145 60.6805 165.867 56.7829 164.31 52.9938H53.587C54.7808 50.0391 56.1382 47.1532 57.6529 44.3494H10.4698C8.95492 47.1526 7.5986 50.0386 6.4071 52.9938H6.35566C6.27298 53.1973 6.19952 53.4067 6.12601 53.6162C6.05987 53.8046 5.9937 53.9932 5.92074 54.1778C5.82779 54.4101 5.72859 54.6424 5.62879 54.8762C5.46911 55.2501 5.30793 55.6276 5.16851 56.0142H5.24411C4.18204 58.8433 3.27442 61.7279 2.52542 64.6555H168.134ZM170.448 79.4963H47.455C47.6324 76.6012 47.957 73.717 48.4275 70.8549H1.24762C0.774551 73.7168 0.448901 76.601 0.271943 79.4963H0.220504C0.196255 79.8426 0.186893 80.189 0.177624 80.532C0.170728 80.7871 0.163883 81.0404 0.150997 81.2904C0.14239 81.4854 0.126986 81.6785 0.111563 81.8717C0.0945112 82.0854 0.0774374 82.2994 0.0695067 82.5166H0.105827C0.0941012 82.8195 0.0788872 83.1215 0.0636691 83.4235L0.0636631 83.4236C0.0318398 84.0552 0 84.6871 0 85.3286C0 87.2889 0.0906146 89.2309 0.220504 91.158H170.448C170.578 89.2309 170.669 87.2889 170.669 85.3286C170.669 83.3684 170.578 81.4263 170.448 79.4963ZM30.1045 150.349H77.2875C81.0978 153.586 85.1844 156.482 89.5002 159.006H128.382C115.329 166.661 100.467 170.689 85.3346 170.67C72.3833 170.676 59.6026 167.717 47.9718 162.02H47.8932C47.8096 161.976 47.7284 161.931 47.6477 161.886L47.6476 161.885L47.6474 161.885L47.6473 161.885C47.5444 161.828 47.4424 161.77 47.3375 161.718C47.0836 161.592 46.8342 161.457 46.5845 161.322L46.5842 161.322L46.5838 161.322C46.4208 161.234 46.2576 161.145 46.0931 161.06C44.9029 160.443 43.7217 159.815 42.5648 159.145C42.5164 159.116 42.4662 159.089 42.4156 159.062C42.3716 159.039 42.3274 159.016 42.2838 158.991H42.3172C38.0019 156.472 33.9154 153.581 30.1045 150.349ZM56.3811 123.854H9.19802C10.7338 126.832 12.4425 129.717 14.3151 132.496H14.2244C14.4105 132.774 14.6115 133.039 14.8124 133.304C14.9735 133.517 15.1345 133.729 15.2877 133.948C15.4406 134.167 15.5918 134.401 15.7449 134.637L15.7454 134.638C15.9369 134.934 16.1313 135.234 16.336 135.516H16.4326C18.6175 138.548 20.9967 141.436 23.5553 144.16H147.101C150.545 140.551 153.667 136.648 156.432 132.496H61.4892C59.6174 129.718 57.9116 126.833 56.3811 123.854ZM0.858082 97.3539H48.0411C48.4682 100.263 49.049 103.148 49.781 105.995H168.134C167.145 109.97 165.867 113.868 164.31 117.657H6.35575C5.21845 114.831 4.23334 111.947 3.40457 109.016H3.35627C3.28912 108.785 3.23349 108.549 3.17785 108.312C3.13087 108.113 3.08387 107.913 3.02994 107.717C2.96283 107.47 2.88911 107.227 2.81537 106.983C2.7165 106.656 2.61759 106.329 2.53454 105.995H2.59796C1.86736 103.147 1.28663 100.263 0.858082 97.3539Z"
        fill="currentColor"
      />
    </svg>
  );
};
