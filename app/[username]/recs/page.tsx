import React from "react";
import { getUserData } from "@/app/home/api";
import { RecommendationType } from "@/app/interfaces";
import RecsBox from "./RecsBox";
import ListNotFound from "./ListNotFound";

export default async function page({
  params,
}: {
  params: { username: string };
}) {
  try {
    let recs: RecommendationType[] = await getUserData(params.username, "recs");
    recs = recs.map((dict) => ({
      ...dict,
      PredictedScore: parseFloat(dict.PredictedScore.toFixed(2)),
    }));

    // console.log(recs);

    return <RecsBox recs_sorted_by_score={recs}></RecsBox>;
  } catch (error) {
    const err = error as Error;
    const errorMessage = err.message;
    // console.log(errorMessage, 5, 6);
    return <ListNotFound errorMessage={errorMessage} />;
  }
}
