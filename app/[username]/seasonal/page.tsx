import { assertUsernameInCache, startTask } from "@/app/home/api";
import { retrieveTaskData } from "@/app/actions/retrieveTaskData";
import React from "react";
import ListNotFound from "../recs/ListNotFound";
import { SeasonsData, SiteType } from "@/app/interfaces";
import SeasonalStatsBox from "./SeasonalStatsBox";
import { Nav } from "@/components/general/Nav";
import ToasterWithX from "@/components/general/ToasterWithX";
import FetchError from "@/components/general/FetchError";
import { cookies } from "next/headers";
import { getSiteCookie } from "@/utils/general";
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
  console.log("Before cookie");
  // const usernameCookie = cookies().get("username");
  const siteCookie = getSiteCookie();
  const testCookie = cookies().get("seasonal");
  console.log(testCookie);

  console.log("After cookie");
  // const siteCookie = "MAL";
  // try {
  //   const siteCookie = cookies().get("currentSite")?.["value"] as SiteType;
  // } catch (err) {
  //   throw new Error(
  //     "Cookie error - please make sure you have cookies enabled.",
  //   );
  // }

  // console.log("5555", usernameCookie);
  // console.log("7777", siteCookie);
  let userFound = false;
  try {
    userFound = await assertUsernameInCache(params.username);
  } catch (err) {
    console.log("Error is now : ", err);
  }

  if (!userFound) {
    console.log("Returning fetch error");
    return (
      <Suspense fallback={<p className="text-lime-550 text-5xl">Testing</p>}>
        <FetchError
          errorMessage={
            "Unauthorized user - please submit your username through the home page."
          }
          username={params.username}
          pathToRetry="seasonal"
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
        <Suspense fallback={<p className="text-lime-550 text-5xl">Testing</p>}>
          <SeasonalStatsBox
            seasonStats={seasonalStats}
            noSequelsSeasonStats={noSequelsSeasonStats}
          ></SeasonalStatsBox>
        </Suspense>
      )}
    </>
  );
}
