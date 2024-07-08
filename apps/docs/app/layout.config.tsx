import { type BaseLayoutProps, type DocsLayoutProps } from "fumadocs-ui/layout";
import { pageTree } from "@/source";

export const baseOptions: BaseLayoutProps = {
  nav: {
    title: "My App",
  },
  links: [
    {
      text: "Documentation",
      url: "/docs",
      active: "nested-url",
    },
  ],
};

export const docsOptions: DocsLayoutProps = {
  ...baseOptions,
  tree: pageTree,
};
