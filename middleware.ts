import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Redirects users who change the URL to the username in the cookie

  const { pathname } = request.nextUrl;
  console.log("pathname", pathname);
  const origin = request.nextUrl.origin;

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

  if (usernameCookie != username && !pathname.includes("/home")) {
    if (usernameCookie) {
      split_req[split_req.length - 2] = usernameCookie;
      let new_url = split_req.join("/");
      return NextResponse.redirect(new URL(new_url, request.url));
    } else {
      return NextResponse.redirect(new URL(`${origin}/home`, request.url));
    }
  }

  // Old redirection filtering, template might be useful in the future

  // const matchPath = match("/:username", { decode: decodeURIComponent });
  // console.log("matchPath", matchPath);
  // const matchResult = matchPath(pathname);
  // console.log("matchResult", matchResult);

  // if (matchResult) {
  //   const { username } = matchResult.params;

  //   // If there's no additional segment (e.g. /username without /affinity, /recs, etc.), redirect to /home
  //   if (
  //     !pathname.includes("/home") &&
  //     !pathname.includes("/affinity") &&
  //     !pathname.includes("/recs") &&
  //     !pathname.includes("/seasonal")
  //   ) {
  //     return NextResponse.redirect(new URL("/home", request.url));
  //   }
  // }
}

export const config = {
  matcher: [
    "/:username/affinity",
    "/:username/recs",
    "/:username/seasonal",
    // "/:username/",
  ],
};
