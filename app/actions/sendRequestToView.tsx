"use server";
import { handleError } from "@/app/home/api";
import fetch from "node-fetch";
import { SiteType, UserPathType } from "../interfaces";
import { retrieveTaskData } from "./retrieveTaskData";
import updateCookie from "./updateCookie";
import { sanitizeError } from "@/utils/sanitizeError";

// Starts the Celery task to get the user's data.
// Data is then retrieved in a separate action (retrieveTaskData).
export async function sendRequestToView(
  username: string,
  path: UserPathType,
  site: SiteType,
  errorHandle?: "return" | "raise"
) {
  "use server";

  const url = `https://nps.moe/api/${path}/?username=${encodeURIComponent(username)}&site=${encodeURIComponent(site)}`;
  try {
    const res = await fetch(url);
    const rawData = await res.text();
    let data = JSON.parse(rawData);

    updateCookie("currentSite", site);

    if (path) {
      updateCookie("username", username);
    }

    if ("taskId" in data) {
      let taskData = await retrieveTaskData(data.taskId, username, path);
      if ("error" in taskData){
        throw Error(taskData["error"])
      }
      return taskData["data"];
    } else if ("data" in data) {
      return data["data"];
    } else if ("error" in data) {
      
      throw new Error(data["error"]);
    } else {
      throw new Error("Unknown data format returned from view");
    }
  } catch (error: any) {
    if (errorHandle === "return"){
      return {
        error : sanitizeError(error.message)
      }
    }
    handleError(error);
  }
  return ""; // This line is unreachable but TypeScript gonna TypeScript
}
