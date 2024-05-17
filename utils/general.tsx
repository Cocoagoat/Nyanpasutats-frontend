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

export function getPathCookie(path: string) {
  console.log("Entered getPathCookie");
  let pathCookie = cookies().get(path)?.["value"] as string;
  // let pathCookie = "";
  // try {
  //   pathCookie = cookies().get(path)?.["value"] as string;
  // } catch (err) {
  //   throw new Error(
  //     "Cookie error - please make sure you have cookies enabled.",
  //   );
  // }
  // console.log("pathCookie is", pathCookie);
  // console.log("all cookies : ", cookies().getAll());
  // confirmCookie(pathCookie);
  return pathCookie;
}
