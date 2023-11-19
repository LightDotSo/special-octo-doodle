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

// -----------------------------------------------------------------------------
// Main
// -----------------------------------------------------------------------------

enum Category {
  Transactions = "Transactions",
  Profile = "Profile",
  Settings = "Settings",
  Activity = "Activity",
  Owners = "Owners",
  Support = "Support",
}

// -----------------------------------------------------------------------------
// Sub
// -----------------------------------------------------------------------------

enum SettingsSubCategory {
  Account = "Account",
  Billing = "Billing",
  WalletSettings = "Wallet Settings",
}

type SubCategory = string;

type CategoryObject = {
  title: string;
  description: string;
  note?: string;
  subcategories: Record<SubCategory, CategoryObject>;
};

// -----------------------------------------------------------------------------
// All
// -----------------------------------------------------------------------------

export const TITLES: Record<Category, CategoryObject> = {
  [Category.Transactions]: {
    title: "Transactions",
    description: "View your transactions history.",
    subcategories: {},
  },
  [Category.Profile]: {
    title: "Profile",
    description: "View and edit your profile information.",
    subcategories: {},
  },
  [Category.Settings]: {
    title: "Settings",
    description: "Manage your account settings.",
    subcategories: {
      [SettingsSubCategory.WalletSettings]: {
        title: "Wallet Settings",
        description: "Manage your wallet settings",
        subcategories: {
          ["Name"]: {
            title: "Name",
            description: "Manage your wallet name",
            note: "This is the name that will be displayed to others.",
            subcategories: {},
          },
        },
      },
      [SettingsSubCategory.Account]: {
        title: "Account",
        description: "Manage your wallet account",
        subcategories: {},
      },
      [SettingsSubCategory.Billing]: {
        title: "Billing",
        description: "Manage your billing information",
        subcategories: {},
      },
    },
  },
  [Category.Activity]: {
    title: "Activity",
    description: "View your wallet activity.",
    subcategories: {},
  },
  [Category.Owners]: {
    title: "Owners",
    description: "Manage and view your wallet owners.",
    subcategories: {},
  },
  [Category.Support]: {
    title: "Support",
    description: "Get help from our support team.",
    subcategories: {},
  },
};
