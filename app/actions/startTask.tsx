"use server";
import {
  ShowPathType,
  SiteType,
  TaskReturnType,
  UserPathType,
} from "../interfaces";

import { handleError } from "@/app/home/api";
import { cookies } from "next/headers";

export async function startTask(
  username: string,
  path: UserPathType,
  site: SiteType,
): Promise<string> {
  "use server";
  cookies().set("currentSite", site);
  //   const testCookie = cookies().get("username");
  //   console.log(testCookie);
  const url = `http://localhost:8000/${path}/?username=${encodeURIComponent(username)}&site=${encodeURIComponent(site)}`;
  try {
    console.log("Before fetch");
    // revalidatePath(url);
    const res = await fetch(url, { cache: "no-store" });
    // console.log("Task_id response is: ", res);

    const rawData = await res.text();
    const data = JSON.parse(rawData);

    console.log("data is : ", data);
    console.log("Task ID is : ", data["taskId"]);
    return data["taskId"];

    // switch (path) {
    //   case "recs":
    //     return [data["Recommendations"], data["RecommendationsNoWatched"]];
    //   case "affinity":
    //     return [data["PositiveAffs"], data["NegativeAffs"]];
    //   case "seasonal":
    //     return [data["Stats"], data["StatsNoSequels"]];
    // }
  } catch (error: any) {
    console.log("Caught error in startTask", error);
    handleError(error);
  }
  return ""; // This line is unreachable, but TypeScript requires it
}
