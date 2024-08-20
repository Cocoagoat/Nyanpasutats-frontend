import { SiteType } from "@/app/interfaces";
import { cookies } from "next/headers";

function confirmCookie(siteCookie: SiteType | string) {
  if (!siteCookie) {
    throw new Error(
      "Cookie error - please make sure you have cookies enabled.",
    );
  }
}

export function getSiteCookie() {
  let siteCookie = "MAL" as SiteType;
  try {
    siteCookie = cookies().get("currentSite")?.["value"] as SiteType;
  } catch (err) {
    throw new Error(
      "Cookie error - please make sure you have cookies enabled.",
    );
  }
  confirmCookie(siteCookie);
  return siteCookie;
}

export function getPathCookie(path: string) {
  let pathCookie = cookies().get(path)?.["value"] as string;
  return pathCookie;
}
