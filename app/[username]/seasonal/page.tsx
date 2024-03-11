import {
  assertUsernameInCache,
  retrieveTaskData,
  startTask,
} from "@/app/home/api";
import React from "react";
import ListNotFound from "../recs/ListNotFound";
import { SeasonsData } from "@/app/interfaces";
import SeasonalStatsBox from "./SeasonalStatsBox";
import { Nav } from "@/components/general/Nav";
import ToasterWithX from "@/components/general/ToasterWithX";
import FetchError from "@/components/general/FetchError";

export default async function page({
  params,
}: {
  params: { username: string };
}) {
  function roundToTwo(num: number, round_to: number): number {
    return Math.round(num * 10 ** round_to) / 10 ** round_to;
  }

  function roundStatsMeanScores(seasonalStats: SeasonsData): SeasonsData {
    for (const season in seasonalStats) {
      if (seasonalStats.hasOwnProperty(season)) {
        seasonalStats[season].AvgScore = roundToTwo(
          seasonalStats[season].AvgScore,
          2,
        );
        seasonalStats[season].FavoritesAvgScore = roundToTwo(
          seasonalStats[season].FavoritesAvgScore,
          2,
        );
        seasonalStats[season].Affinity = roundToTwo(
          seasonalStats[season].Affinity,
          3,
        );
      }
    }
    return seasonalStats;
  }

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
    const taskId = await startTask(params.username, "seasonal");

    console.log("Task response in page : ", taskId);
    if (taskId === undefined) {
      throw new Error("Task ID is undefined");
    }

    data = await retrieveTaskData(taskId);
  } catch (err) {
    error = (err as Error).message;
    console.log("Error is now : ", error);
  }
  let seasonalStats: SeasonsData = data["Stats"],
    noSequelsSeasonStats: SeasonsData = data["StatsNoSequels"];

  seasonalStats = roundStatsMeanScores(seasonalStats);
  noSequelsSeasonStats = roundStatsMeanScores(noSequelsSeasonStats);

  return (
    <>
      <Nav />
      {error ? (
        <FetchError
          errorMessage={error}
          username={params.username}
          pathToRetry="seasonal"
        />
      ) : (
        <SeasonalStatsBox
          seasonStats={seasonalStats}
          noSequelsSeasonStats={noSequelsSeasonStats}
        ></SeasonalStatsBox>
      )}
    </>
  );
}
