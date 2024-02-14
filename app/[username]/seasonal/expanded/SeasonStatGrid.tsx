import { tooltipsContent } from "@/utils/TooltipsContent";
import React, { useContext } from "react";
import {
  SeasonalContext,
  useSingleSeasonContext,
} from "../reducer/SeasonalContext";
import SeasonStatGridCell from "./SeasonStatGridCell";
import { SeasonDataKeys, TooltipKeys, statKeysToNames } from "@/app/interfaces";

export default function SeasonStatGrid() {
  const { seasonStats, seasonCount } = useSingleSeasonContext();
  const { displayedMean } = useContext(SeasonalContext)!;
  const otherMean =
    displayedMean === "AvgScore" ? "FavoritesAvgScore" : "AvgScore";

  const [rankToDisplay, yearlyRankToDisplay] =
    displayedMean === "AvgScore"
      ? (["OverallRank", "YearlyRank"] as [SeasonDataKeys, SeasonDataKeys])
      : (["FavoritesRank", "FavYearlyRank"] as [
          SeasonDataKeys,
          SeasonDataKeys,
        ]);
  const [otherRank, yearlyOtherRank] =
    rankToDisplay === "OverallRank"
      ? (["FavoritesRank", "FavYearlyRank"] as [SeasonDataKeys, SeasonDataKeys])
      : (["OverallRank", "YearlyRank"] as [SeasonDataKeys, SeasonDataKeys]);

  return (
    <>
      <SeasonStatGridCell
        frontStat={{
          name: "Affinity",
          value: `${(seasonStats["Affinity"] * 100).toFixed(1)}%`,
          tooltipText: tooltipsContent["Affinity"],
        }}
        backStat={{
          name: "Most Watched Genre",
          value: seasonStats["MostWatchedGenre"],
        }}
        toggle={true}
      />

      <SeasonStatGridCell
        frontStat={{
          // name: `Mean Score${
          //   displayedMean === "FavoritesAvgScore" ? " (Top 10)" : ""
          // }`,
          name: statKeysToNames[displayedMean] as TooltipKeys,
          value: seasonStats[displayedMean].toString(),
        }}
        backStat={{
          name: statKeysToNames[otherMean] as TooltipKeys,
          value: seasonStats[otherMean].toString(),
        }}
        toggle={true}
      />

      <SeasonStatGridCell
        frontStat={{
          name: `Overall Rank${
            rankToDisplay === "FavoritesRank" ? " (Top 10)" : ""
          }`,
          value: `${seasonStats[rankToDisplay].toString()}/${seasonCount}`,
        }}
        backStat={{
          name: `Overall Rank${
            rankToDisplay !== "FavoritesRank" ? " (Top 10)" : ""
          }`,
          value: `${seasonStats[otherRank].toString()}/${seasonCount}`,
        }}
        toggle={true}
      />

      <SeasonStatGridCell
        //Change to SeasonStatGridCell frontStat={"Dropped Shows"} and use statNames?
        frontStat={{
          name: "Shows Dropped",
          value: seasonStats["DroppedShows"].toString(),
        }}
        backStat={{
          name: "Percentage Dropped",
          value: `${((seasonStats["DroppedShows"] / seasonStats["Shows"]) * 100)
            .toFixed(1)
            .toString()}%`,
        }}
        toggle={true}
      />

      <SeasonStatGridCell
        frontStat={{
          name: "Shows Watched",
          value: seasonStats["Shows"].toString(),
        }}
        backStat={{
          name: "Time Wasted",
          value: `${(Number(seasonStats["TotalShowsDuration"]) / 60).toFixed(
            2,
          )} hours`,
        }}
        toggle={true}
      />

      <SeasonStatGridCell
        frontStat={{
          name: `Yearly Rank${
            yearlyRankToDisplay === "FavYearlyRank" ? " (Top 10)" : ""
          }`,
          value: `${seasonStats[yearlyRankToDisplay].toString()}/4`,
        }}
        backStat={{
          name: `Yearly Rank${
            yearlyRankToDisplay !== "FavYearlyRank" ? " (Top 10)" : ""
          }`,
          value: `${seasonStats[yearlyOtherRank].toString()}/4`,
        }}
        toggle={true}
      />
    </>
  );
}
