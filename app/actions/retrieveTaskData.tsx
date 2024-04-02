"use server";
import { getUserData } from "../home/api";
import { UserPathType } from "../interfaces";
import { cookies } from "next/headers";

export async function retrieveTaskData(taskId: string, path?: UserPathType) {
  "use server";
  let taskStatus = "pending";
  let data = [];
  let error = "";
  // let count = 0;
  try {
    const taskData = await getUserData(taskId);
    if (taskData.status === "error") {
      console.log("Supposed to throw error here");
      throw new Error(taskData.data);
    }
    data = taskData["data"];
    // console.log("Test", taskData);
    if (path) {
      cookies().set(path, "true");
    }
    return data;
  } catch (err) {
    console.log("Caught error in retrieveTaskData", err);
    error = (err as Error).message;
    throw new Error(error);
  }
}
