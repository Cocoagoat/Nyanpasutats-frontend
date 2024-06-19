import { assertUsernameInCache, startTask } from "@/app/home/api";
import { retrieveTaskData } from "@/app/actions/retrieveTaskData";
import React from "react";
import { SeasonsData } from "@/app/interfaces";
import SeasonalStatsBox from "./SeasonalStatsBox";
import { Nav } from "@/components/general/Nav";
import GenericError from "@/components/general/GenericError";
import { cookies } from "next/headers";
import { getSiteCookie } from "@/utils/CookieUtils";
import { Suspense } from "react";

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

  const siteCookie = getSiteCookie();
  console.log(siteCookie);

  let userFound = false;
  try {
    console.log(params.username);
    userFound = await assertUsernameInCache(params.username);
    console.log(userFound);
  } catch (err) {
    console.log("Error is now : ", err);
  }

  if (!userFound) {
    console.log("Returning fetch error");
    return (
      <Suspense fallback={<p className="text-5xl text-lime-550">Testing</p>}>
        <GenericError
          errorMessage={
            "Unauthorized user - please submit your username through the home page."
          }
        />
      </Suspense>
    );
  }

  try {
    console.log("Got into the try block");
    const taskId = await startTask(params.username, "seasonal", siteCookie);

    console.log("Task response in page : ", taskId);
    if (taskId === undefined) {
      throw new Error("Task ID is undefined");
    }

    data = await retrieveTaskData(taskId, params.username, "seasonal");
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
        <GenericError errorMessage={error} />
      ) : (
        <Suspense fallback={<p className="text-5xl text-lime-550">Testing</p>}>
          <SeasonalStatsBox
            seasonStats={seasonalStats}
            noSequelsSeasonStats={noSequelsSeasonStats}
          ></SeasonalStatsBox>
        </Suspense>
      )}
    </>
  );
}
