"use server";
import { sanitizeError } from "@/utils/sanitizeError";
import { handleError } from "../home/api";
import { UserPathType } from "../interfaces";

export async function retrieveTaskData(
  taskId: string,
  userName: string,
  path?: UserPathType,
) {
  "use server";

  const url = `https://nps.moe/api/tasks/?task_id=${taskId}`;
  try {

    const res = await fetch(url, { cache: "force-cache" });
    // The view connected to this endpoint will poll the Celery task
    // until it's done, then return the data/error message.
    const rawData = await res.text();
    const data = JSON.parse(rawData);

    if (res.status != 200) {
      throw new Error(data["error"]);
    }

    return data;
  } catch (error: any) {
    return {
      error : sanitizeError(error.message)
    }
  }
}
