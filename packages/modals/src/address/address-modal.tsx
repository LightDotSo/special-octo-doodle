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

import { AddressForm } from "@lightdotso/forms";
import { useDebouncedValue, useRefinement } from "@lightdotso/hooks";
import { addressOrEns } from "@lightdotso/schemas";
import { useAuth, useModals } from "@lightdotso/stores";
import { Modal } from "@lightdotso/templates";
import { publicClient } from "@lightdotso/wagmi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Address, isAddress } from "viem";
import { normalize } from "viem/ens";
import { z } from "zod";
import { Form } from "@lightdotso/ui";
import { useQueryEnsDomains, useQueryWallets } from "@lightdotso/query";

// -----------------------------------------------------------------------------
// Schema
// -----------------------------------------------------------------------------

const addressModalFormSchema = z.object({
  addressOrEns: addressOrEns,
});

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export function AddressModal() {
  // ---------------------------------------------------------------------------
  // Stores
  // ---------------------------------------------------------------------------

  const { address } = useAuth();
  const { isAddressModalVisible, hideAddressModal } = useModals();

  const getEns = async ({ name }: { name: string }) =>
    publicClient.getEnsAddress({ name: normalize(name) }).then(addr => {
      // console.log(addr);
      return !!addr;
    });

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const validEns = useRefinement(getEns, {
    debounce: 300,
  });

  // ---------------------------------------------------------------------------
  // Form
  // ---------------------------------------------------------------------------

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const methods = useForm({
    mode: "all",
    reValidateMode: "onBlur",
    resolver: zodResolver(
      addressModalFormSchema.refine(
        ({ addressOrEns }) => {
          if (
            (addressOrEns && addressOrEns.length > 0) ||
            isAddress(addressOrEns)
          ) {
            return true;
          }
          return validEns({ name: addressOrEns });
        },
        {
          path: ["addressOrEns"],
          message: "Ens name is not valid",
        },
      ),
    ),
  });

  const watchName = methods.watch("addressOrEns");

  // ---------------------------------------------------------------------------
  // Debounced Hooks
  // ---------------------------------------------------------------------------

  const delayedName = useDebouncedValue(watchName, 1000);

  // ---------------------------------------------------------------------------
  // Query
  // ---------------------------------------------------------------------------

  const { ensDomains } = useQueryEnsDomains({
    name: delayedName,
    limit: 6,
  });

  const { wallets } = useQueryWallets({
    address: address as Address,
    offset: 0,
    limit: 6,
  });

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  if (isAddressModalVisible) {
    return (
      <>
        <Form {...methods}>
          <Modal
            headerContent={
              <AddressForm
                onKeyDown={validEns.invalidate}
                name="addressOrEns"
              />
            }
            open
            onClose={hideAddressModal}
          >
            {ensDomains && ensDomains.length > 0 && (
              <div className="">
                {ensDomains.map(ensDomain => (
                  // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
                  <div
                    key={ensDomain.id}
                    className="flex flex-row items-center space-x-2 pointer-cursor hover:bg-background-stronger rounded-md p-2"
                    onClick={() => {
                      methods.setValue("addressOrEns", ensDomain.name);
                      validEns.invalidate();
                    }}
                  >
                    <div>{ensDomain.name}</div>
                  </div>
                ))}
              </div>
            )}
            {wallets && wallets.length > 0 && (
              <div className="">
                {wallets.map(wallet => (
                  // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
                  <div
                    key={wallet.address}
                    className="flex flex-row items-center space-x-2 pointer-cursor hover:bg-background-stronger rounded-md p-2"
                    onClick={() => {
                      methods.setValue("addressOrEns", wallet.address);
                      validEns.invalidate();
                    }}
                  >
                    <div>{wallet.address}</div>
                  </div>
                ))}
              </div>
            )}
          </Modal>
        </Form>
      </>
    );
  }

  return null;
}

// -----------------------------------------------------------------------------
// Export
// -----------------------------------------------------------------------------

export default AddressModal;
