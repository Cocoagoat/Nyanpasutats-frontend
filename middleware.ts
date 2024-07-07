import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Log the current request pathname
  const usernameCookie = cookies().get("username")?.["value"] as string;
  console.log("Username cookie is : ", usernameCookie);
  let split_req = request.nextUrl.href.split("/");
  const username = split_req[split_req.length - 2];

  if (usernameCookie && usernameCookie != username) {
    split_req[split_req.length - 2] = usernameCookie;
    let new_url = split_req.join("/");
    return NextResponse.redirect(new URL(new_url, request.url));
  }
  //   if (usernameCookie && usernameCookie != username) {
  //     console.log("Username cookie is not the same as the username");
  //     return (
  //       <GenericError
  //         errorMessage={
  //           "Unauthorized user - please submit your username through the home page."
  //         }
  //       />
  //     );
  //   }
}

export const config = {
  matcher: [
    // match all routes except static files and APIs
    "/:username/affinity",
    "/:username/recs",
    "/:username/seasonal",
  ],
};
