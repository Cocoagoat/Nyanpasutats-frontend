"use server";
import { SiteType, UserPathType } from "../interfaces";

import { handleError } from "@/app/home/api";
import updateCookie from "./updateCookie";

// Starts the Celery task to get the user's data.
// Data is then retrieved in a separate action (retrieveTaskData).
export async function startTask(
  username: string,
  path: UserPathType,
  site: SiteType,
): Promise<string> {
  "use server";

  const url = `http://localhost:8000/${path}/?username=${encodeURIComponent(username)}&site=${encodeURIComponent(site)}`;
  try {
    const res = await fetch(url, { cache: "no-store" });
    const rawData = await res.text();
    const data = JSON.parse(rawData);
    updateCookie("currentSite", site);
    return data["taskId"];
  } catch (error: any) {
    handleError(error);
  }
  return ""; // This line is unreachable but TypeScript requires it
}
