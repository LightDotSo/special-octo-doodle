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

import { MAINNET_CHAINS } from "@lightdotso/const";
import { useModals } from "@lightdotso/stores";
import { ChainLogo } from "@lightdotso/svg";
import { Modal } from "@lightdotso/templates";
import { Button, ButtonIcon } from "@lightdotso/ui";

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export function TokenModal() {
  // ---------------------------------------------------------------------------
  // Stores
  // ---------------------------------------------------------------------------

  const { isTokenModalVisible, hideTokenModal } = useModals();

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  if (isTokenModalVisible) {
    return (
      <Modal open onClose={hideTokenModal}>
        <div className="flex flex-row space-x-2">
          <Button variant="shadow">All Chains</Button>
          {MAINNET_CHAINS.map(chain => (
            <ButtonIcon variant="shadow">
              <ChainLogo chainId={chain.id} />
            </ButtonIcon>
          ))}
        </div>
      </Modal>
    );
  }

  return null;
}

// -----------------------------------------------------------------------------
// Export
// -----------------------------------------------------------------------------

export default TokenModal;
