import { getUserData } from "@/app/home/api";
import React from "react";
import ListNotFound from "../recs/ListNotFound";
import { SeasonsData } from "@/app/interfaces";
import SeasonalStatsBox from "./SeasonalStatsBox";
import { Nav } from "@/components/general/Nav";
import ToasterWithX from "@/components/general/ToasterWithX";

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
          2
        );
        seasonalStats[season].FavoritesAvgScore = roundToTwo(
          seasonalStats[season].FavoritesAvgScore,
          2
        );
        seasonalStats[season].Affinity = roundToTwo(
          seasonalStats[season].Affinity,
          3
        );
      }
    }
    return seasonalStats;
  }

  try {
    let [seasonalStats, noSequelsSeasonStats]: [SeasonsData, SeasonsData] =
      await getUserData(params.username, "seasonal");

    seasonalStats = roundStatsMeanScores(seasonalStats);
    noSequelsSeasonStats = roundStatsMeanScores(noSequelsSeasonStats);

    return (
      <>
        <Nav />
        <SeasonalStatsBox
          seasonStats={seasonalStats}
          noSequelsSeasonStats={noSequelsSeasonStats}
        ></SeasonalStatsBox>
      </>
    );
  } catch (error) {
    const err = error as Error;
    const errorMessage = err.message;
    console.log(errorMessage, 5, 6);
    return <ListNotFound errorMessage={errorMessage} />;
  }
}