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

import type { TokenData } from "@lightdotso/data";
import { TokenImage } from "@lightdotso/elements";
import { useQueryToken, useQueryWalletSettings } from "@lightdotso/query";
import { swapFormSchema } from "@lightdotso/schemas";
import { useAuth, useModals } from "@lightdotso/stores";
import { useBalance, useReadContract } from "@lightdotso/wagmi";
import { Button, ButtonIcon, FormField, Input } from "@lightdotso/ui";
import { ArrowDown, ChevronDown, WalletIcon } from "lucide-react";
import { useMemo, type FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { erc20Abi, type Address } from "viem";
import { refineNumberFormat } from "@lightdotso/utils";

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

type SwapFormValues = z.infer<typeof swapFormSchema>;

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

export type SwapDialogProps = {
  className?: string;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export const SwapDialog: FC<SwapDialogProps> = ({ className }) => {
  // ---------------------------------------------------------------------------
  // Stores
  // ---------------------------------------------------------------------------

  const { wallet } = useAuth();
  const { showTokenModal, setTokenModalProps, hideTokenModal } = useModals();

  // ---------------------------------------------------------------------------
  // Form
  // ---------------------------------------------------------------------------

  const form = useForm<SwapFormValues>({
    mode: "all",
    reValidateMode: "onBlur",
  });

  const buySwap = form.watch("buy");
  const sellSwap = form.watch("sell");

  // ---------------------------------------------------------------------------
  // Query
  // ---------------------------------------------------------------------------

  const { token: buyQueryToken, isTokenLoading: isBuyQueryTokenLoading } =
    useQueryToken({
      address: (buySwap?.token?.address as Address) ?? undefined,
      chain_id: buySwap?.chainId,
      wallet: wallet as Address,
    });

  const { token: sellQueryToken, isTokenLoading: isSellQueryTokenLoading } =
    useQueryToken({
      address: (sellSwap?.token?.address as Address) ?? undefined,
      chain_id: sellSwap?.chainId,
      wallet: wallet as Address,
    });

  const { walletSettings } = useQueryWalletSettings({
    address: wallet as Address,
  });

  // ---------------------------------------------------------------------------
  // Wagmi
  // ---------------------------------------------------------------------------

  const {
    data: buySwapNativeBalance,
    isLoading: isBuySwapNativeBalanceLoading,
    queryKey: buySwapNativeBalanceQueryKey,
  } = useBalance({
    address: wallet as Address,
    chainId: buySwap?.chainId,
    query: {
      enabled: Boolean(
        buySwap?.token &&
          buySwap?.token?.address ===
            "0x0000000000000000000000000000000000000000",
      ),
    },
  });

  const {
    data: sellSwapNativeBalance,
    isLoading: isSellSwapNativeBalanceLoading,
    queryKey: sellSwapNativeBalanceQueryKey,
  } = useBalance({
    address: wallet as Address,
    chainId: sellSwap?.chainId,
    query: {
      enabled: Boolean(
        sellSwap?.token &&
          sellSwap?.token?.address ===
            "0x0000000000000000000000000000000000000000",
      ),
    },
  });

  const {
    data: buySwapBalance,
    isLoading: isBuySwapBalanceLoading,
    queryKey: buySwapBalanceQueryKey,
  } = useReadContract({
    address: buySwap?.token?.address as Address,
    chainId: buySwap?.chainId,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: [wallet as Address],
    query: {
      enabled: Boolean(
        buySwap?.token?.address &&
          buySwap?.token?.address !==
            "0x0000000000000000000000000000000000000000" &&
          buySwap?.chainId,
      ),
    },
  });

  const {
    data: sellSwapBalance,
    isLoading: isSellSwapBalanceLoading,
    queryKey: sellSwapBalanceQueryKey,
  } = useReadContract({
    address: sellSwap?.token?.address as Address,
    chainId: sellSwap?.chainId,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: [wallet as Address],
    query: {
      enabled: Boolean(
        sellSwap?.token?.address &&
          sellSwap?.token?.address !==
            "0x0000000000000000000000000000000000000000" &&
          sellSwap?.chainId,
      ),
    },
  });

  // ---------------------------------------------------------------------------
  // Memoized Hooks
  // ---------------------------------------------------------------------------

  const buyToken: TokenData | null = useMemo(() => {
    if (buyQueryToken) {
      if (buySwapNativeBalance) {
        if (
          buySwapNativeBalanceQueryKey &&
          buySwapNativeBalanceQueryKey.length > 2 &&
          (buySwapNativeBalanceQueryKey[1] as any).chainId ===
            buyQueryToken.chain_id
        ) {
          buyQueryToken.amount = Number(buySwapNativeBalance.value);
          buyQueryToken.symbol = buySwapNativeBalance.symbol;
        }
      }
      if (buySwapBalance) {
        if (
          buySwapBalanceQueryKey &&
          buySwapBalanceQueryKey.length > 2 &&
          (buySwapBalanceQueryKey[1] as any).chainId === buyQueryToken.chain_id
        ) {
          buyQueryToken.amount = Number(buySwapBalance);
        }
      }
      return buyQueryToken;
    }

    if (
      buySwap?.token?.address &&
      buySwap?.chainId &&
      buySwap?.token?.symbol &&
      buySwap?.token?.decimals
    ) {
      const buySwapToken: TokenData = {
        amount: 0,
        balance_usd: 0,
        id: `${buySwap?.token?.address}-${buySwap?.chainId}`,
        address: buySwap?.token?.address as Address,
        chain_id: buySwap?.chainId,
        decimals: buySwap?.token?.decimals,
        symbol: buySwap?.token?.symbol,
      };
      return buySwapToken;
    }

    return null;
  }, [
    buyQueryToken,
    buySwap,
    buySwapNativeBalance,
    buySwapBalanceQueryKey,
    buySwapBalance,
  ]);

  const sellToken: TokenData | null = useMemo(() => {
    if (sellQueryToken) {
      if (sellSwapNativeBalance) {
        if (
          sellSwapNativeBalanceQueryKey &&
          sellSwapNativeBalanceQueryKey.length > 2 &&
          (sellSwapNativeBalanceQueryKey[1] as any).chainId ===
            sellQueryToken.chain_id
        ) {
          sellQueryToken.amount = Number(sellSwapNativeBalance.value);
          sellQueryToken.symbol = sellSwapNativeBalance.symbol;
        }
      }
      if (sellSwapBalance) {
        if (
          sellSwapBalanceQueryKey &&
          sellSwapBalanceQueryKey.length > 2 &&
          (sellSwapBalanceQueryKey[1] as any).chainId ===
            sellQueryToken.chain_id
        ) {
          sellQueryToken.amount = Number(sellSwapBalance);
        }
      }
      return sellQueryToken;
    }

    if (
      sellSwap?.token?.address &&
      sellSwap?.chainId &&
      sellSwap?.token?.symbol &&
      sellSwap?.token?.decimals
    ) {
      const sellSwapToken: TokenData = {
        amount: 0,
        balance_usd: 0,
        id: `${sellSwap?.token?.address}-${sellSwap?.chainId}`,
        address: sellSwap?.token?.address as Address,
        chain_id: sellSwap?.chainId,
        decimals: sellSwap?.token?.decimals,
        symbol: sellSwap?.token?.symbol,
      };
      return sellSwapToken;
    }

    return null;
  }, [
    sellQueryToken,
    sellSwap,
    sellSwapNativeBalance,
    sellSwapNativeBalanceQueryKey,
    sellSwapBalance,
    sellSwapBalanceQueryKey,
  ]);

  const isBuySwapValueValid = useMemo(() => {
    if (buyToken && buySwap?.token?.value && buySwap?.token?.decimals) {
      return (
        buySwap.token.value * Math.pow(10, buySwap.token.decimals) <=
        buyToken.amount
      );
    }
  }, [buyToken, buySwap]);

  const isSwapLoading = useMemo(() => {
    return (
      isBuyQueryTokenLoading ||
      isSellQueryTokenLoading ||
      isBuySwapNativeBalanceLoading ||
      isBuySwapBalanceLoading ||
      isSellSwapNativeBalanceLoading ||
      isSellSwapBalanceLoading
    );
  }, [
    isBuyQueryTokenLoading,
    isSellQueryTokenLoading,
    isBuySwapNativeBalanceLoading,
    isSellSwapNativeBalanceLoading,
    isBuySwapBalanceLoading,
    isSellSwapBalanceLoading,
  ]);

  const isSwapValid = useMemo(() => {
    return isBuySwapValueValid;
  }, [isBuySwapValueValid]);

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <div className={className}>
      <div className="rounded-md border border-border-weaker bg-background-strong p-4 focus-within:ring-1 focus-within:ring-border-strong hover:border-border-weak">
        <span>Buy</span>
        <div className="flex items-center justify-between">
          <FormField
            control={form.control}
            name="buy.token.value"
            render={({ field }) => (
              <Input
                placeholder="0"
                className="h-16 truncate border-0 bg-background-strong p-0 text-4xl [appearance:textfield] focus-visible:ring-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                type="number"
                {...field}
              />
            )}
          />
          <Button
            onClick={() => {
              setTokenModalProps({
                address: wallet as Address,
                type: "native",
                isTestnet: walletSettings?.is_enabled_testnet ?? false,
                onClose: () => {
                  hideTokenModal();
                },
                onTokenSelect: token => {
                  form.setValue("buy.token.address", token.address);
                  form.setValue("buy.token.decimals", token.decimals);
                  form.setValue("buy.token.symbol", token.symbol);
                  form.setValue("buy.chainId", token.chain_id);

                  form.trigger();

                  hideTokenModal();
                },
              });
              showTokenModal();
            }}
            variant="shadow"
            className="gap-2 rounded-full p-1"
            size="unsized"
          >
            {buyToken && buyToken.address ? (
              <>
                <TokenImage withChainLogo token={buyToken} />
                <span className="max-w-24 truncate whitespace-nowrap break-all text-2xl tracking-wide text-text">
                  {buyToken.symbol}
                </span>
              </>
            ) : (
              <span className="whitespace-nowrap text-lg text-text">
                Select Token
              </span>
            )}
            <ChevronDown className="mr-1 size-4 shrink-0" />
          </Button>
        </div>
        <div className="flex w-full items-center justify-between">
          <span className="truncate text-sm text-text-weak">
            $
            {buySwap && buySwap?.token?.value && buyToken
              ? refineNumberFormat(
                  (buyToken.balance_usd *
                    (buySwap.token.value * Math.pow(10, buyToken.decimals))) /
                    buyToken.amount,
                )
              : 0}{" "}
            USD
          </span>
          <Button
            onClick={() => {
              if (buyToken) {
                form.setValue(
                  "buy.token.value",
                  buyToken?.amount / Math.pow(10, buyToken.decimals),
                );
              }
            }}
            variant="shadow"
            size="xs"
            className="gap-1 px-1 py-0"
          >
            <WalletIcon className="size-4 text-text-weak" />
            <span className="text-sm text-text-weak">Balance</span>
            <span className="text-sm text-text">
              {buyToken
                ? refineNumberFormat(
                    buyToken.amount / Math.pow(10, buyToken.decimals),
                  )
                : 0}
            </span>
          </Button>
        </div>
      </div>
      <div className="z-10 -my-4 flex items-center justify-center">
        <ButtonIcon
          onClick={() => {
            // Swap buy and sell values
            if (buySwap.token?.value && sellSwap.token?.value) {
              // Make a copy of the values
              const buySwapTokenValue = buySwap.token.value;
              const sellSwapTokenValue = sellSwap.token.value;

              form.setValue("buy.token.value", sellSwapTokenValue);
              form.setValue("sell.token.value", buySwapTokenValue);
            }

            // Set buy values to sell
            if (buyToken) {
              form.setValue("sell.token.address", buyToken.address);
              form.setValue("sell.token.decimals", buyToken.decimals);
              form.setValue("sell.token.symbol", buyToken.symbol);
              form.setValue("sell.chainId", buyToken.chain_id);
            }

            // Set sell values to buy
            if (sellToken) {
              form.setValue("buy.token.address", sellToken.address);
              form.setValue("buy.token.decimals", sellToken.decimals);
              form.setValue("buy.token.symbol", sellToken.symbol);
              form.setValue("buy.chainId", sellToken.chain_id);
            }
          }}
          variant="shadow"
          size="sm"
        >
          <ArrowDown />
        </ButtonIcon>
      </div>
      <div className="mt-1 rounded-md border border-border-weaker bg-background-strong p-4 focus-within:ring-1 focus-within:ring-border-strong hover:border-border-weak">
        <span>Sell</span>
        <div className="flex items-center justify-between">
          <FormField
            control={form.control}
            name="sell.token.value"
            render={({ field }) => (
              <Input
                placeholder="0"
                className="h-16 truncate border-0 bg-background-strong p-0 text-4xl [appearance:textfield] focus-visible:ring-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                type="number"
                {...field}
              />
            )}
          />
          <Button
            onClick={() => {
              setTokenModalProps({
                address: wallet as Address,
                type: "native",
                isTestnet: walletSettings?.is_enabled_testnet ?? false,
                onClose: () => {
                  hideTokenModal();
                },
                onTokenSelect: token => {
                  form.setValue("sell.token.address", token.address);
                  form.setValue("sell.token.decimals", token.decimals);
                  form.setValue("sell.token.symbol", token.symbol);
                  form.setValue("sell.chainId", token.chain_id);

                  form.trigger();

                  hideTokenModal();
                  sellToken;
                },
              });
              showTokenModal();
            }}
            variant="shadow"
            className="gap-2 rounded-full p-1"
          >
            {sellToken ? (
              <>
                <TokenImage withChainLogo token={sellToken} />
                <span className="max-w-24 truncate text-2xl tracking-wide text-text">
                  {sellToken.symbol}
                </span>
              </>
            ) : (
              <span className="w-full whitespace-nowrap text-lg text-text">
                Select Token
              </span>
            )}
            <ChevronDown className="mr-1 size-4 shrink-0" />
          </Button>
        </div>
        <div className="flex w-full items-center justify-between">
          <span className="truncate text-sm text-text-weak">
            $
            {sellSwap && sellSwap?.token?.value && sellToken
              ? refineNumberFormat(
                  (sellToken.balance_usd *
                    (sellSwap.token.value * Math.pow(10, sellToken.decimals))) /
                    sellToken.amount,
                )
              : 0}{" "}
            USD
          </span>
          <Button
            onClick={() => {
              if (sellToken) {
                form.setValue(
                  "sell.token.value",
                  sellToken?.amount / Math.pow(10, sellToken.decimals),
                );
              }
            }}
            variant="shadow"
            size="xs"
            className="gap-1 px-1 py-0"
          >
            <WalletIcon className="size-4 text-text-weak" />
            <span className="text-sm text-text-weak">Balance</span>
            <span className="text-sm text-text">
              {sellToken
                ? refineNumberFormat(
                    sellToken.amount / Math.pow(10, sellToken.decimals),
                  )
                : 0}
            </span>
          </Button>
        </div>
      </div>
      <Button
        isLoading={isSwapLoading}
        disabled={isSwapLoading || !isSwapValid}
        size="xl"
        className="mt-1 w-full"
      >
        {isSwapLoading
          ? "Loading..."
          : isSwapValid
            ? "Swap"
            : !isBuySwapValueValid
              ? `Insufficient ${buyToken?.symbol}`
              : "Invalid Swap"}
      </Button>
    </div>
  );
};
