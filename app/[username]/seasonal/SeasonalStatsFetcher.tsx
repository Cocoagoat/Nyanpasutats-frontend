import GenericError from "@/components/general/GenericError";
import React from "react";
import SeasonalStatsBox from "./SeasonalStatsBox";
import { SeasonsData } from "@/app/interfaces";
import { retrieveTaskData } from "@/app/actions/retrieveTaskData";
import { getSiteCookie } from "@/utils/CookieUtils";
import { startTask } from "@/app/actions/startTask";
import { cookies } from "next/headers";
import { roundToTwo } from "@/utils/general";

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

export default async function SeasonalStatsFetcher({
  username,
}: {
  username: string;
}) {
  let error = null;
  let data = [];

  const siteCookie = getSiteCookie();

  // In case someone got past the middleware that redirects people who change the URL
  const usernameCookie = cookies().get("username")?.["value"] as string;
  if (usernameCookie && usernameCookie != username) {
    return (
      <GenericError
        errorMessage={
          "Unauthorized user - please submit your username through the home page."
        }
      />
    );
  }

  try {
    const taskId = await startTask(username, "seasonal", siteCookie);
    if (taskId === undefined) {
      throw new Error("Task ID is undefined");
    }

    data = await retrieveTaskData(taskId, username, "seasonal");
  } catch (err) {
    error = (err as Error).message;
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
