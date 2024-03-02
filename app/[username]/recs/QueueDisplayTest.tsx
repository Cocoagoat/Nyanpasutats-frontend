import { retrieveTaskData } from "@/app/home/api";
import { RecommendationType } from "@/app/interfaces";
import FetchError from "@/components/general/FetchError";
import React from "react";
import RecsBox from "./RecsBox";

export default async function QueueDisplayTest({
  taskId,
  queuePosition,
  username,
}: {
  taskId: string;
  queuePosition: number;
  username: string;
}) {
  let data = [];
  let error = "";
  try {
    data = await retrieveTaskData(taskId);
  } catch (err) {
    error = (err as Error).message;
  }
  let recs: RecommendationType[] = data["Recommendations"],
    recs_sorted_by_diff: RecommendationType[] =
      data["RecommendationsSortedByDiff"];
  return (
    <>
      {error ? (
        <FetchError
          errorMessage={error}
          username={username}
          pathToRetry="recs"
        />
      ) : (
        <>
          <RecsBox
            recs={recs}
            recs_sorted_by_diff={recs_sorted_by_diff}
          ></RecsBox>
        </>
      )}
    </>
  );
}
