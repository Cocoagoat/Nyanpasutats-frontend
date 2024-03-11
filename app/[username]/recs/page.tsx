import React, { useEffect, useState } from "react";
import { getUserData, retrieveTaskData, startTask } from "@/app/home/api";
import { RecommendationType } from "@/app/interfaces";
import RecsBox from "./RecsBox";
import ListNotFound from "./ListNotFound";
import { Nav } from "@/components/general/Nav";
import FetchError from "@/components/general/FetchError";
import UserQueueDisplay from "@/components/general/UserQueueDisplay";
import { revalidatePath } from "next/cache";
import QueueDisplayTest from "./QueueDisplayTest";

function roundPredictedScores(recs: RecommendationType[]) {
  return recs.map((dict) => ({
    ...dict,
    PredictedScore: parseFloat(dict.PredictedScore.toFixed(2)),
  }));
}

export default async function page({
  params,
}: {
  params: { username: string };
}) {
  let error = null;
  let data = [];
  try {
    let { taskId, queuePosition } = await startTask(params.username, "recs");
    console.log("Task response in page : ", taskId, queuePosition);
    data = await retrieveTaskData(taskId);
  } catch (err) {
    error = (err as Error).message;
  }
  let recs: RecommendationType[] = data["Recommendations"],
    recs_sorted_by_diff: RecommendationType[] =
      data["RecommendationsSortedByDiff"];

  return (
    // <>
    //   {/* <div className="bg-blue-900 text-5xl text-lime-600">
    //     TESTING COMPONENTS SOMETHING ASHDFSDKF
    //   </div> */}
    //   <QueueDisplayTest
    //     taskId={taskId}
    //     queuePosition={queuePosition}
    //     username={params.username}
    //   />
    // </>
    <>
      {error ? (
        <FetchError
          errorMessage={error}
          username={params.username}
          pathToRetry="recs"
        />
      ) : (
        <>
          {/* <Test /> */}
          <RecsBox
            recs={recs}
            recs_sorted_by_diff={recs_sorted_by_diff}
          ></RecsBox>
        </>
      )}
    </>
  );
}
