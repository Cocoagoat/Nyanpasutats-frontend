import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Redirects users who change the URL to the username in the cookie
  const usernameCookie = cookies().get("username")?.["value"] as string;
  let split_req = request.nextUrl.href.split("/");
  const username = split_req[split_req.length - 2];

  if (usernameCookie && usernameCookie != username) {
    split_req[split_req.length - 2] = usernameCookie;
    let new_url = split_req.join("/");
    return NextResponse.redirect(new URL(new_url, request.url));
  }
}

export const config = {
  matcher: [
    // match all routes except static files and APIs
    "/:username/affinity",
    "/:username/recs",
    "/:username/seasonal",
  ],
};
