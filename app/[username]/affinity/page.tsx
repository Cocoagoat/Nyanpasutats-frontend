import {
  assertUsernameInCache,
  retrieveTaskData,
  startTask,
} from "@/app/home/api";
import { AffTableType, AffinitiesData } from "@/app/interfaces";
import React from "react";
import { Nav } from "@/components/general/Nav";
import AffTable from "./AffTable";
import FetchError from "@/components/general/FetchError";
import styles from "./Affinity.module.css";

export default async function page({
  params,
}: {
  params: { username: string };
}) {
  let error = null;
  let data = [];

  let userFound = await assertUsernameInCache(params.username);
  if (!userFound) {
    return (
      <FetchError
        errorMessage={
          "Unauthorized user - please submit your username through the home page."
        }
        username={params.username}
        pathToRetry="seasonal"
      />
    );
  }

  try {
    const taskId = await startTask(params.username, "affinity");
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
        <FetchError
          errorMessage={error}
          username={params.username}
          pathToRetry="affinity"
        />
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
