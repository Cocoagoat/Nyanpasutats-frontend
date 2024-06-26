import GenericError from "@/components/general/GenericError";
import React from "react";
import SeasonalStatsBox from "./SeasonalStatsBox";
import { SeasonsData } from "@/app/interfaces";
import { retrieveTaskData } from "@/app/actions/retrieveTaskData";
import { getSiteCookie } from "@/utils/CookieUtils";
import { assertUsernameInCache } from "@/app/home/api";
import { startTask } from "@/app/actions/startTask";

export default async function SeasonalStatsFetcher({
  username,
}: {
  username: string;
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

  const siteCookie = getSiteCookie();
  console.log(siteCookie);

  let userFound = false;
  try {
    console.log(username);
    userFound = await assertUsernameInCache(username);
    console.log(userFound);
  } catch (err) {
    console.log("Error is now : ", err);
  }

  if (!userFound) {
    console.log("Returning fetch error");
    return (
      <GenericError
        errorMessage={
          "Unauthorized user - please submit your username through the home page."
        }
      />
    );
  }

  try {
    console.log("Got into the try block");
    const taskId = await startTask(username, "seasonal", siteCookie);

    console.log("Task response in page : ", taskId);
    if (taskId === undefined) {
      throw new Error("Task ID is undefined");
    }

    data = await retrieveTaskData(taskId, username, "seasonal");
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
      {error ? (
        <GenericError errorMessage={error} />
      ) : (
        <SeasonalStatsBox
          seasonStats={seasonalStats}
          noSequelsSeasonStats={noSequelsSeasonStats}
        ></SeasonalStatsBox>
      )}
    </>
  );
}
