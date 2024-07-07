import React from "react";
import { assertUsernameInCache, startTask } from "@/app/home/api";
import { retrieveTaskData } from "@/app/actions/retrieveTaskData";
import { RecommendationType } from "@/app/interfaces";
import RecsBox from "./RecsBox";
import GenericError from "@/components/general/GenericError";
import { getSiteCookie } from "@/utils/CookieUtils";
import { cookies } from "next/headers";

export async function generateMetadata({
  params,
}: {
  params: { username: string };
}) {
  return {
    title: `${params.username} / Recs`,
    description: `${params.username}'s anime recommendations`,
  };
}

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

  const siteCookie = getSiteCookie();

  const usernameCookie = cookies().get("username")?.["value"] as string;
  if (usernameCookie && usernameCookie != params.username) {
    return (
      <GenericError
        errorMessage={
          "Unauthorized user - please submit your username through the home page."
        }
      />
    );
  }

  try {
    const taskId = await startTask(params.username, "recs", siteCookie);
    console.log("Task response in page : ", taskId);
    if (taskId === undefined) {
      throw new Error("Task ID is undefined");
    }
    data = await retrieveTaskData(taskId, params.username);
  } catch (err) {
    // Delete this later since Server Components can't throw errors
    error = (err as Error).message;
  }
  let recs: RecommendationType[] = data["Recommendations"],
    recs_sorted_by_diff: RecommendationType[] =
      data["RecommendationsSortedByDiff"];

  let favTags = data["FavTags"],
    leastFavTags = data["LeastFavTags"];

  recs = roundPredictedScores(recs);
  recs_sorted_by_diff = roundPredictedScores(recs_sorted_by_diff);
  return (
    <>
      {error ? (
        <GenericError errorMessage={error} />
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
