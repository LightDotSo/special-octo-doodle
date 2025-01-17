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

import { DEMO_WALLET_ADDRESS } from "@/const";
import { getAppGroup } from "@/utils";
import { COOKIES } from "@lightdotso/const";
import type { AppGroup } from "@lightdotso/types";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isAddress } from "viem";

// -----------------------------------------------------------------------------
// Middleware
// -----------------------------------------------------------------------------

export async function middleware(req: NextRequest) {
  // -----------------------------------------------------------------------------
  // Cookies
  // -----------------------------------------------------------------------------

  // Get the session cookie
  const sessionCookie = req.cookies.get(COOKIES.SESSION_COOKIE_ID);
  // Get the wallet cookie
  const walletCookie = req.cookies.get(COOKIES.WALLETS_COOKIE_ID);
  // Get the app group cookie
  const appGroupCookie = req.cookies.get(COOKIES.APP_GROUP_COOKIE_ID);

  // -----------------------------------------------------------------------------
  // Middleware Redirects
  // -----------------------------------------------------------------------------

  // Paths to redirect to if the user is logged in
  const middlewareRedirectPaths = ["/"];
  if (
    process.env.NODE_ENV === "production" &&
    middlewareRedirectPaths.some((path) => req.nextUrl.pathname === path) &&
    walletCookie &&
    req.nextUrl.searchParams.size === 0
  ) {
    const wallet = walletCookie.value;

    const appGroup = appGroupCookie?.value;
    // If the user has a path group cookie, redirect to the appropriate path
    switch (appGroup) {
      case "action":
        return NextResponse.redirect(new URL("/swap", req.url));
      case "home":
        return NextResponse.redirect(new URL("/home", req.url));
      default:
        break;
    }

    if (isAddress(wallet)) {
      // If the address is `DEMO_WALLET_ADDRESS`, redirect to the demo page
      if (wallet === DEMO_WALLET_ADDRESS || appGroup === "demo") {
        return NextResponse.redirect(new URL("/demo", req.url));
      }

      return NextResponse.redirect(new URL(`/${wallet}/overview`, req.url));
    }
  }

  // -----------------------------------------------------------------------------
  // Root Redirect
  // -----------------------------------------------------------------------------

  // If the root route and doesn't have a search query, redirect to the home page
  // if the user doesn't have a session cookie
  if (
    process.env.NODE_ENV === "production" &&
    req.nextUrl.pathname === "/" &&
    !req.nextUrl.search &&
    !sessionCookie
  ) {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  // -----------------------------------------------------------------------------
  // Next Response
  // -----------------------------------------------------------------------------

  const response = NextResponse.next();

  // Get the app group of the path, and set the app group cookie accordingly
  const appGroup = getAppGroup(req.nextUrl.pathname);
  switch (appGroup) {
    case "action":
      response.cookies.set(COOKIES.APP_GROUP_COOKIE_ID, "action" as AppGroup);
      break;
    case "demo":
      response.cookies.set(COOKIES.APP_GROUP_COOKIE_ID, "demo" as AppGroup);
      break;
    case "home":
      response.cookies.set(COOKIES.APP_GROUP_COOKIE_ID, "home" as AppGroup);
      break;
    default:
      response.cookies.delete(COOKIES.APP_GROUP_COOKIE_ID);
  }

  return response;
}

// -----------------------------------------------------------------------------
// Config
// -----------------------------------------------------------------------------

export const config = {
  // From: https://nextjs.org/docs/app/building-your-application/routing/middleware
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
