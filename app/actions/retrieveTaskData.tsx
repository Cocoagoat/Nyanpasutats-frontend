"use server";
import { getUserData } from "../home/api";
import { UserPathType } from "../interfaces";
import { cookies } from "next/headers";
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
      console.log(`Setting cookie ${path} to ${userName}`);
      updateCookie(path, userName);
      console.log("After setting cookie");
    }
    const taskData = await getUserData(taskId);
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
