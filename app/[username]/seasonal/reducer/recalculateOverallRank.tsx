import { SeasonDataKeys, SeasonsData } from "@/app/interfaces";
import React from "react";

export default function recalculateOverallRank(
  seasonalStats: SeasonsData,
  favorites?: boolean,
) {
  let avgStat = "AvgScore" as SeasonDataKeys;
  let rankType = "OverallRank" as SeasonDataKeys;

  if (favorites) {
    avgStat = "FavoritesAvgScore";
    rankType = "FavoritesRank";
  } else {
    avgStat = "AvgScore";
    rankType = "OverallRank";
  }
  const sortedSeasons = Object.entries(seasonalStats).sort(
    (a, b) => b[1][avgStat] - a[1][avgStat],
  );

  let rank = 1;
  let prevScore = sortedSeasons[0][1][avgStat];
  let prevRank = 1;
  let acc = 1;
  seasonalStats[sortedSeasons[0][0]][rankType] = rank;
  for (let i = 1; i < sortedSeasons.length; i++) {
    if (sortedSeasons[i][1][avgStat] !== prevScore) {
      rank = prevRank + acc;
      acc = 1;
    } else {
      acc++;
    }
    prevScore = sortedSeasons[i][1][avgStat];
    prevRank = rank;
    seasonalStats[sortedSeasons[i][0]][rankType] = rank;
  }
  if (!favorites) {
    seasonalStats = recalculateOverallRank(seasonalStats, true);
  }
  return seasonalStats;
}
