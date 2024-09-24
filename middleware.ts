import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Redirects users who change the URL to the username in the cookie

  const { pathname } = request.nextUrl;

  if (pathname.includes("/affinity")) {
    const searchParams = new URL(request.url).searchParams;
    if (!searchParams.has("minShared")) {
      return NextResponse.redirect(
        new URL(`${pathname}?minShared=20`, request.url),
      );
    }
  }

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
  matcher: ["/:username/affinity", "/:username/recs", "/:username/seasonal"],
};
