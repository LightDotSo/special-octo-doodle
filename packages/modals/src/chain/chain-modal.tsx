// Copyright 2023-2024 Light, Inc.
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

import { useDebouncedValue } from "@lightdotso/hooks";
import { addressOrEns } from "@lightdotso/schemas";
import { useAuth, useModals } from "@lightdotso/stores";
import { Modal } from "@lightdotso/templates";
import {
  Command,
  CommandList,
  CommandItem,
  CommandInput,
  TabsList,
  TabsTrigger,
  Tabs,
  TabsContent,
} from "@lightdotso/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { MAINNET_CHAINS, TESTNET_CHAINS } from "@lightdotso/const";
import { ChainLogo } from "@lightdotso/svg";

// -----------------------------------------------------------------------------
// Schema
// -----------------------------------------------------------------------------

const chainModalFormSchema = z.object({
  addressOrEns: addressOrEns,
});

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export function ChainModal() {
  // ---------------------------------------------------------------------------
  // Stores
  // ---------------------------------------------------------------------------

  const { address } = useAuth();
  const {
    isChainModalVisible,
    hideChainModal,
    chainModalProps: { onChainSelect },
  } = useModals();

  // ---------------------------------------------------------------------------
  // Form
  // ---------------------------------------------------------------------------

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const methods = useForm({
    mode: "all",
    reValidateMode: "onBlur",
    resolver: zodResolver(chainModalFormSchema),
  });

  const watchName = methods.watch("addressOrEns");

  // ---------------------------------------------------------------------------
  // Debounced Hooks
  // ---------------------------------------------------------------------------

  const delayedName = useDebouncedValue(watchName, 1000);

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  if (isChainModalVisible) {
    return (
      // eslint-disable-next-line react/jsx-no-useless-fragment
      <Command className="bg-transparent">
        <CommandList className="max-h-full">
          <Tabs className="w-full" defaultValue="mainnet">
            <Modal
              isHeightFixed
              open
              className="p-2"
              headerContent={
                <CommandInput
                  wrapperClassName="flex grow border-b-0"
                  placeholder="Type a chain or search..."
                />
              }
              bannerContent={
                <TabsList className="w-full">
                  <TabsTrigger className="w-full" value="mainnet">
                    Mainnet
                  </TabsTrigger>
                  <TabsTrigger className="w-full" value="testnet">
                    Testnet
                  </TabsTrigger>
                </TabsList>
              }
              onClose={hideChainModal}
            >
              <TabsContent value="mainnet">
                {MAINNET_CHAINS.map(chain => (
                  <CommandItem
                    key={chain.id}
                    onSelect={() => {
                      methods.setValue("chainId", chain.id);
                      hideChainModal();
                    }}
                    value={chain.name}
                  >
                    <>
                      <ChainLogo className="mr-2" chainId={chain.id} />
                      {chain.name}
                    </>
                  </CommandItem>
                ))}
              </TabsContent>
              <TabsContent value="testnet">
                {TESTNET_CHAINS.map(chain => (
                  <CommandItem
                    key={chain.id}
                    onSelect={() => {
                      methods.setValue("chainId", chain.id);
                      hideChainModal();
                    }}
                    value={chain.name}
                  >
                    <div className="flex items-center space-x-2">
                      <ChainLogo chainId={chain.id} />
                      {chain.name}
                    </div>
                  </CommandItem>
                ))}
              </TabsContent>
            </Modal>
          </Tabs>
        </CommandList>
      </Command>
    );
  }

  return null;
}

// -----------------------------------------------------------------------------
// Export
// -----------------------------------------------------------------------------

export default ChainModal;
