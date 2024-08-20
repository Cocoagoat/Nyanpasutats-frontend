"use server";
import { cookies } from "next/headers";
import { getUserData } from "../home/api";
import { UserPathType } from "../interfaces";
import updateCookie from "./updateCookie";

export async function retrieveTaskData(
  taskId: string,
  userName: string,
  path?: UserPathType,
) {
  "use server";
  let data = [];
  let error = "";
  try {
    if (path) {
      updateCookie("username", userName);
    }

    // if (path === "seasonal") {
    //   let currentResetCount = cookies().get("resetCount")?.["value"];
    //   console.log("currentResetCount", currentResetCount);
    //   let resetCount = currentResetCount ? parseInt(currentResetCount) + 1 : 1;
    //   updateCookie("resetCount", resetCount.toString());
    // }
    const taskData = await getUserData(taskId);
    // getUserData will do backend polling until the task is
    // successful or fails (in which case it will throw an error).
    if (taskData.status === "error") {
      throw new Error(taskData.data);
    }
    data = taskData["data"];

    return data;
  } catch (err) {
    error = (err as Error).message;
    throw new Error(error);
  }
}
