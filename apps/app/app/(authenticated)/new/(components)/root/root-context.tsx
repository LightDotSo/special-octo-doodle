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

import { useNewForm } from "@lightdotso/stores";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Badge,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@lightdotso/ui";
import { shortenAddress } from "@lightdotso/utils";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useMemo, type FC } from "react";

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export const RootContext: FC = () => {
  // ---------------------------------------------------------------------------
  // Next Hooks
  // ---------------------------------------------------------------------------

  const pathname = usePathname();

  // ---------------------------------------------------------------------------
  // Stores
  // ---------------------------------------------------------------------------

  const { address, errors, formValues, isValid } = useNewForm();

  // ---------------------------------------------------------------------------
  // Memoized Hooks
  // ---------------------------------------------------------------------------

  const formInfos = useMemo(() => {
    if (pathname === "/new") {
      return [
        {
          title: "Welcome to Light!",
          message:
            "You're about to create a new smart wallet that will work on the same address across all compatible EVM networks! This means you can use the same wallet on Ethereum, Optimism, and more!",
        },
        {
          title: "Do I need to pay?",
          message:
            "No. The process is done off-chain and does not require any gas. Your wallet will be created and synced across all networks in your first transaction - you will not need to do anything!",
        },
      ];
    }

    if (pathname === "/new/configuration") {
      return [
        {
          title: "What's happening?",
          message:
            "You're creating your own smart wallet! This is a process to create a new smart wallet that will work on the same address across all compatible EVM networks!",
        },
        {
          title: "What's the threshold?",
          message:
            "The threshold is the number of owners that need to sign a transaction for it to be valid. The threshold is used to increase the security of your wallet.",
        },
        {
          title: "What address should I use?",
          message:
            "You can use any address you want. If you're not sure, you can use the address you're currently using.",
        },
        {
          title: "Will I be able to upgrade later?",
          message:
            "Yes. You can upgrade your wallet at any time. Also, any updates will automatically be synced across all networks, so you don't have to worry about managing wallets on different networks.",
        },
      ];
    }

    return [
      {
        title: "Final step",
        message: "You're about to create a new smart wallet!",
      },
      {
        title: "Do I need to pay gas?",
        message:
          "No. The process is done off-chain and does not require any gas. Your wallet will be created and synced across all networks in your first transaction - you will not need to do anything!",
      },
    ];

    return [];
  }, [pathname]);

  const formWarnings = useMemo(() => {
    let warnings = [];

    if (pathname === "/new/configuration") {
      if (formValues && formValues?.owners && formValues.owners.length < 2) {
        warnings.push({
          title: "Only one owner",
          message:
            "If you're the only owner, you won't be able to recover your wallet if you lose access to it. We recommend adding at least one more owner.",
        });
      }
    }

    return warnings;
  }, [pathname]);

  const formIssues = useMemo(() => {
    if (!errors) {
      return null;
    }

    if (pathname === "/new") {
      // Filter out issues that are not related to the form with `issue.path` that is either `threshold` or `salt`
      const filtereIssues = errors.issues.filter(
        issue =>
          !issue.path.includes("threshold") &&
          !issue.path.includes("salt") &&
          !issue.path.includes("owners") &&
          !issue.path.includes("check"),
      );

      return filtereIssues;
    }

    if (pathname === "/new/configuration") {
      // Filter out issues that are not related to the form with `issue.path` that is a `check`
      const filteredIssues = errors.issues.filter(
        issue => !issue.path.includes("check"),
      );

      return filteredIssues;
    }

    return errors.issues;
  }, [errors]);

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <div className="space-y-6">
      <AnimatePresence>
        <motion.div className="rounded-md border border-border bg-background-weak">
          <TooltipProvider>
            <div className="p-4 flex-col space-y-3">
              <div className="flex justify-between">
                {address && (
                  <>
                    Your New Address:{" "}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span>{shortenAddress(address)}</span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{address}</p>
                      </TooltipContent>
                    </Tooltip>
                  </>
                )}
              </div>
              <div className="flex justify-between">
                {formValues && formValues?.name && (
                  <>
                    Name:{" "}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span>{formValues.name}</span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>This can be edited later!</p>
                      </TooltipContent>
                    </Tooltip>
                  </>
                )}
              </div>
              <div className="flex justify-between">
                {formValues && formValues?.threshold && (
                  <>
                    Threshold:{" "}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span>{formValues.threshold}</span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          The number of threshold that need to sign a
                          transaction for it to be valid.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </>
                )}
              </div>
            </div>
          </TooltipProvider>
        </motion.div>
        {formInfos && formInfos && formInfos.length > 0 && (
          <motion.div
            key="info"
            className="rounded-md border border-border-info-weaker bg-background-info-weakest p-4"
            initial={{ opacity: 0, y: 300 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 300 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <Badge className="mb-1" intent="info">
              Information
            </Badge>
            <Accordion className="text-text-info-strong" type="multiple">
              {formInfos.map((info, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border-border-info-weaker"
                >
                  <AccordionTrigger>{info.title}</AccordionTrigger>
                  <AccordionContent className="text-text-info">
                    {info.message}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        )}
        {!isValid && formWarnings && formWarnings.length > 0 && (
          <motion.div
            key="warning"
            className="rounded-md border border-border-warning-weaker bg-background-warning-weakest p-4"
            initial={{ opacity: 0, y: 300 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 300 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <Badge className="mb-1" intent="warning">
              Warning
            </Badge>
            <Accordion className="text-text-warning-strong" type="multiple">
              {formWarnings.map((warning, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border-border-warning-weaker"
                >
                  <AccordionTrigger>{warning.title}</AccordionTrigger>
                  <AccordionContent className="text-text-warning">
                    {warning.message}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        )}
        {!isValid && formIssues && formIssues.length > 0 && (
          <motion.div
            key="error"
            className="rounded-md border border-border-error-weaker bg-background-error/15 p-4"
            initial={{ opacity: 0, y: 300 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 300 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <Badge className="mb-1" intent="error">
              Error
            </Badge>
            <Accordion className="text-text-error-strong" type="multiple">
              {formIssues.map((error, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border-border-error-weaker"
                >
                  <AccordionTrigger>Error at {error.path}</AccordionTrigger>
                  <AccordionContent className="text-text-error">
                    {error.message}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
