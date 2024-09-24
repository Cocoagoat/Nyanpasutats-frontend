"use server";
import { cookies } from "next/headers";

export default async function updateCookie(
  cookieName: string,
  cookieValue: string,
  cacheDependent?: boolean,
  customTTL?: number,
) {
  // Any cookies that depend on the Django cache (currently
  // only affinity, recs and seasonal cookies that determine
  // whether we display the queue loading page or a regular spinner)
  // will have a TTL of 3 hours. Otherwise, it'll be a regular session cookie
  // unless a custom TTL was sent.
  "use server";
  let TTL: number | undefined;
  cacheDependent ? (TTL = 3600 * 3) : (TTL = customTTL);
  cookies().set(cookieName, cookieValue, { maxAge: TTL });
}
