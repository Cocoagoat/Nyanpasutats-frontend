"use server";
import { SiteType, UserPathType } from "../interfaces";

import { handleError } from "@/app/home/api";
import updateCookie from "./updateCookie";
import { retrieveTaskData } from "./retrieveTaskData";

// Starts the Celery task to get the user's data.
// Data is then retrieved in a separate action (retrieveTaskData).
export async function sendRequestToView(
  username: string,
  path: UserPathType,
  site: SiteType,
) {
  "use server";

  const url = `http://localhost:80/${path}/?username=${encodeURIComponent(username)}&site=${encodeURIComponent(site)}`;
  try {
    // console.log("Sending request to view", url);
    const res = await fetch(url, {
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
    });
    const rawData = await res.text();
    let data = JSON.parse(rawData);

    updateCookie("currentSite", site);

    if (path) {
      updateCookie("username", username);
    }

    if ("taskId" in data) {
      let taskData = await retrieveTaskData(data.taskId, username, path);

      return taskData["data"];
    } else if ("data" in data) {
      return data["data"];
    } else if ("error" in data) {
      throw new Error(data["error"]);
    } else {
      throw new Error("Unknown data format returned from view");
    }
  } catch (error: any) {
    handleError(error);
  }
  return ""; // This line is unreachable but TypeScript gonna TypeScript
}
