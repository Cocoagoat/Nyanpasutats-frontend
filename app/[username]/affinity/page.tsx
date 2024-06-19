import { assertUsernameInCache, startTask } from "@/app/home/api";
import { AffinitiesData } from "@/app/interfaces";
import { retrieveTaskData } from "@/app/actions/retrieveTaskData";
import React from "react";
import { Nav } from "@/components/general/Nav";
import AffTable from "./AffTable";
import GenericError from "@/components/general/GenericError";
import styles from "./Affinity.module.css";
import { getSiteCookie, getPathCookie } from "@/utils/CookieUtils";
import { revalidatePath } from "next/cache";

export default async function page({
  params,
}: {
  params: { username: string };
}) {
  let error = null;
  let data = [];
  const siteCookie = getSiteCookie();
  const affinityCookie = getPathCookie("affinity");
  console.log("affinityCookie is", affinityCookie);
  if (!affinityCookie) {
    console.log("revalidating...");
    revalidatePath(`${params.username}/affinity`);
  }

  let userFound = false;
  try {
    userFound = await assertUsernameInCache(params.username);
  } catch (err) {
    console.log("Error is now : ", err);
  }

  if (!userFound) {
    return (
      <GenericError
        errorMessage={
          "Unauthorized user - please submit your username through the home page."
        }
      />
    );
  }

  try {
    const taskId = await startTask(params.username, "affinity", siteCookie);
    console.log("Task response in page : ", taskId);
    if (taskId === undefined) {
      throw new Error("Task ID is undefined");
    }
    data = await retrieveTaskData(taskId);
  } catch (err) {
    error = (err as Error).message;
  }
  let posAffs: AffinitiesData = data["PosAffs"],
    negAffs: AffinitiesData = data["NegAffs"];
  return (
    <>
      <Nav />
      {error ? (
        <GenericError errorMessage={error} />
      ) : (
        <div
          className={`absolute inset-0 mx-auto my-auto flex flex-col items-center justify-center
         gap-48 border-sky-550 text-center text-lg text-white lg:flex-row ${styles.hiddenscrollbar}`}
        >
          <AffTable aff_data={posAffs} type="Positive" />
          <AffTable aff_data={negAffs} type="Negative" />
        </div>
      )}
    </>
  );
}
