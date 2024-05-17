"use server";
import { getUserData } from "../home/api";
import { UserPathType } from "../interfaces";
import { cookies } from "next/headers";

export async function retrieveTaskData(taskId: string, path?: UserPathType) {
  "use server";
  let data = [];
  let error = "";
  try {
    const taskData = await getUserData(taskId);
    if (taskData.status === "error") {
      throw new Error(taskData.data);
    }
    data = taskData["data"];
    if (path) {
      cookies().set(path, "true");
    }
    return data;
  } catch (err) {
    error = (err as Error).message;
    throw new Error(error);
  }
}
