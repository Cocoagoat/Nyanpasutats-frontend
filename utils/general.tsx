import { SiteType } from "@/app/interfaces";
import { cookies } from "next/headers";

function confirmCookie(siteCookie: SiteType) {
  if (!siteCookie) {
    throw new Error(
      "Cookie error - please make sure you have cookies enabled.",
    );
  }
}

export function getSiteCookie() {
  console.log("Entered getSiteCookie");
  let siteCookie = "MAL" as SiteType;
  try {
    siteCookie = cookies().get("currentSite")?.["value"] as SiteType;
  } catch (err) {
    throw new Error(
      "Cookie error - please make sure you have cookies enabled.",
    );
  }
  console.log("Before confirmCookie");
  confirmCookie(siteCookie);
  return siteCookie;
}
