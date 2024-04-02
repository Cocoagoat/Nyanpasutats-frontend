import React, { useEffect, useState } from "react";
import { assertUsernameInCache, getUserData, startTask } from "@/app/home/api";

import { retrieveTaskData } from "@/app/actions/retrieveTaskData";
import { RecommendationType, SiteType } from "@/app/interfaces";
import RecsBox from "./RecsBox";
import ListNotFound from "./ListNotFound";
import { Nav } from "@/components/general/Nav";
import FetchError from "@/components/general/FetchError";
import UserQueueDisplay from "@/components/general/UserQueueDisplay";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { getSiteCookie } from "@/utils/general";

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

  // const usernameCookie = cookies().get("username");
  const siteCookie = getSiteCookie();
  const testCookie = cookies().get("recs");
  console.log(testCookie);

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
    const taskId = await startTask(params.username, "recs", siteCookie);
    console.log("Task response in page : ", taskId);
    if (taskId === undefined) {
      throw new Error("Task ID is undefined");
    }
    data = await retrieveTaskData(taskId);
  } catch (err) {
    // Delete this later since Server Components can't throw errors
    error = (err as Error).message;
  }
  let recs: RecommendationType[] = data["Recommendations"],
    recs_sorted_by_diff: RecommendationType[] =
      data["RecommendationsSortedByDiff"];

  let favTags = data["FavTags"],
    leastFavTags = data["LeastFavTags"];

  // console.log(favTags, leastFavTags);

  recs = roundPredictedScores(recs);
  recs_sorted_by_diff = roundPredictedScores(recs_sorted_by_diff);
  return (
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
            favTags={favTags}
            leastFavTags={leastFavTags}
          ></RecsBox>
        </>
      )}
    </>
  );
}
