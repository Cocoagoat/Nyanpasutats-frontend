import { tooltipsContent } from "@/utils/TooltipsContent";
import React, { useContext, useState } from "react";
import {
  SeasonalContext,
  SingleSeasonContext,
  useSingleSeasonContext,
} from "../reducer/SeasonalContext";
import SeasonStatGridCell from "./SeasonStatGridCell";
import { SeasonDataKeys, TooltipKeys, statKeysToNames } from "@/app/interfaces";
import { mod } from "@/utils/general";
import CollapseToggle from "./CollapseToggle";
import { RiArrowDownDoubleFill, RiArrowUpDoubleFill } from "react-icons/ri";
import useToast from "@/hooks/useToast";
import {
  PiMinusCircleFill,
  PiPlusBold,
  PiPlusCircle,
  PiPlusCircleBold,
  PiPlusCircleDuotone,
  PiPlusCircleFill,
} from "react-icons/pi";

export default function SeasonStatGrid() {
  const { seasonStats, seasonCount } = useSingleSeasonContext();
  const { displayedMean, displayedStats } = useContext(SeasonalContext)!;
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

  type GridStats = {
    name: string;
    value: string;
    tooltipText?: string;
  };

  const allGridStats: { [key: number]: GridStats } = {
    0: {
      name: "Affinity",
      value: `${(seasonStats["Affinity"] * 100).toFixed(1)}%`,
      tooltipText: tooltipsContent["Affinity"],
    },
    1: {
      name: "Mean Score",
      value: seasonStats["AvgScore"].toString(),
    },
    2: {
      name: `Overall Rank`,
      value: `${seasonStats[rankToDisplay].toString()}/${Object.keys(displayedStats).length}`,
    },
    3: {
      name: "Shows Dropped",
      value: seasonStats["DroppedShows"].toString(),
    },
    4: {
      name: "Shows Watched",
      value: seasonStats["Shows"].toString(),
    },
    5: {
      name: `Yearly Rank`,
      value: `${seasonStats["YearlyRank"].toString()}/4`,
    },
    6: {
      name: "Most Watched Genre",
      value: seasonStats["MostWatchedGenre"],
    },
    7: {
      name: "Mean Score (Top 10)",
      value: seasonStats["FavoritesAvgScore"].toString(),
    },
    8: {
      name: "Overall Rank (Top 10)",
      value: `${seasonStats["FavoritesRank"].toString()}/${Object.keys(displayedStats).length}`,
    },
    9: {
      name: "Percentage Dropped",
      value: `${((seasonStats["DroppedShows"] / seasonStats["Shows"]) * 100)
        .toFixed(1)
        .toString()}%`,
    },
    10: {
      name: "Time Wasted",
      value: `${(Number(seasonStats["TotalShowsDuration"]) / 60).toFixed(
        1,
      )} hrs`,
    },
    11: {
      name: "Yearly Rank (Top 10)",
      value: `${seasonStats["FavYearlyRank"].toString()}/4`,
    },
  };

  const [rows, setRows] = useState(2);

  const [displayedStatIndexes, setDisplayedStatIndexes] = useState<number[]>(
    Array.from({ length: rows }, (_, i) => [
      3 * i,
      3 * i + 1,
      3 * i + 2,
    ]).flat(),
  );

  const { editModeOpen } = useContext(SingleSeasonContext)!;
  const { notifyError } = useToast();

  function handleAddRow() {
    if (rows < 4) {
      setRows((prev) => prev + 1);
      setDisplayedStatIndexes(
        Array.from({ length: rows + 1 }, (_, i) => [
          3 * i,
          3 * i + 1,
          3 * i + 2,
        ]).flat(),
      );
    } else {
      notifyError("A maximum of four rows are allowed.");
    }
  }

  function handleRemoveRow() {
    if (rows > 0) {
      setRows((prev) => prev - 1);
      setDisplayedStatIndexes(
        Array.from({ length: rows - 1 }, (_, i) => [
          3 * i,
          3 * i + 1,
          3 * i + 2,
        ]).flat(),
      );
    } else {
      notifyError("A minimum of one row is required.");
    }
  }

  function handleChangeStat(direction: "left" | "right", cellIndex: number) {
    const currentStat = displayedStatIndexes[cellIndex];
    let newStat = currentStat;
    if (direction === "left") {
      // while (displayedStatIndexes.includes(newStat) || newStat === null) {
      // newStat = (newStat - 1) % Object.keys(allGridStats).length;
      newStat = mod(newStat - 1, Object.keys(allGridStats).length);
      // }
    } else {
      // while (displayedStatIndexes.includes(newStat) || newStat === null) {
      // newStat = (newStat + 1) % Object.keys(allGridStats).length;
      newStat = mod(newStat + 1, Object.keys(allGridStats).length);
      // }
    }
    setDisplayedStatIndexes((prev) => {
      const newStats = [...prev];
      newStats[cellIndex] = newStat;
      return newStats;
    });
  }

  // console.log(displayedStatIndexes);

  const displayedGridStats: [number, GridStats][] = displayedStatIndexes.map(
    (key) => [key, allGridStats[key]],
  );

  // const displayedStats = displayedStatIndexes.reduce((acc, key) => {
  //   console.log(key);
  //   if (key in allGridStats) {
  //     acc.set(key, allGridStats[key]);
  //   }
  //   return acc;
  // }, new Map<number, GridStats>());

  // console.log(displayedStats);

  return (
    <>
      {displayedGridStats.map(([index, stat], cellIndex) => (
        <SeasonStatGridCell
          key={cellIndex}
          name={stat["name"]}
          value={stat["value"]}
          cellIndex={cellIndex}
          handleChangeStat={handleChangeStat}
          tooltipText={tooltipsContent[stat["name"] as TooltipKeys]}
        />
      ))}

      {editModeOpen && (
        <div className="col-span-full">
          {rows > 0 && (
            <CollapseToggle
              onClick={handleRemoveRow}
              IconComponent={RiArrowUpDoubleFill}
              text="Delete Row "
              alwaysVisible={true}
            />
          )}
          {rows < 4 && (
            <CollapseToggle
              onClick={handleAddRow}
              IconComponent={RiArrowDownDoubleFill}
              text="Add Row "
              alwaysVisible={true}
            />
          )}
        </div>
      )}
    </>
  );
}
