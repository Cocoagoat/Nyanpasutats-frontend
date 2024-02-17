import React from "react";
import { getUserData } from "@/app/home/api";
import { RecommendationType } from "@/app/interfaces";
import RecsBox from "./RecsBox";
import ListNotFound from "./ListNotFound";
import { Nav } from "@/components/general/Nav";
import FetchError from "@/components/general/FetchError";

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
  let recs: RecommendationType[] = [],
    recs_sorted_by_diff: RecommendationType[] = [];
  try {
    [recs, recs_sorted_by_diff] = await getUserData(params.username, "recs");
    recs = roundPredictedScores(recs);
    recs_sorted_by_diff = roundPredictedScores(recs_sorted_by_diff);
  } catch (err) {
    error = (err as Error).message;
  }

  // console.log(recs[0]["ShowName"]);
  // console.log(recs_no_watched[0]["ShowName"]);
  console.log(recs.slice(0, 10));
  // console.log(recs_no_watched_sorted_by_diff.slice(0, 10));
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
          ></RecsBox>
        </>
      )}
    </>
  );
}
