import React from "react";
import RecommendationBox from "./RecsBox";
import Image from "next/image";
import padoru from "../../../utils/padoru.gif";
import Loading from "./loading";
import { RecommendationType } from "@/app/interfaces";

async function getRecommendations(username: string) {
  const res = await fetch(
    `http://localhost:8000/recs/?username=${encodeURIComponent(username)}`,
    { next: { revalidate: 30 } }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const rawData = await res.text();
  console.log("Raw Data:", rawData);
  const data = JSON.parse(rawData);
  console.log("Parsed Data:", data);
  return data["Recommendations"];
}

export default async function page({
  params,
}: {
  params: { username: string };
}) {
  let recs: RecommendationType[] = await getRecommendations(params.username);
  recs = recs.map((dict) => ({
    ...dict,
    PredictedScore: parseFloat(dict.PredictedScore.toFixed(2)),
  }));

  console.log(recs);

  return <RecommendationBox recs={recs.slice(0, 20)}></RecommendationBox>;
}
