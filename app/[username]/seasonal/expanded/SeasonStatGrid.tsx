import { TooltipKeys } from "@/app/interfaces";
import useToast from "@/hooks/useToast";
import { tooltipsContent } from "@/utils/TooltipsContent";
import { mod } from "@/utils/general";
import { useContext, useState } from "react";
import { RiArrowDownDoubleFill, RiArrowUpDoubleFill } from "react-icons/ri";
import {
  SeasonalContext,
  useSingleSeasonContext,
} from "../reducer/SeasonalContext";
import CollapseToggle from "./CollapseToggle";
import SeasonStatGridCell from "./SeasonStatGridCell";

export default function SeasonStatGrid() {
  const { seasonStats, editModeOpen } = useSingleSeasonContext();
  const { displayedStats } = useContext(SeasonalContext)!;

  const [rows, setRows] = useState(2);
  const [displayedStatIndexes, setDisplayedStatIndexes] = useState<number[]>(
    Array.from({ length: rows }, (_, i) => [
      3 * i,
      3 * i + 1,
      3 * i + 2,
    ]).flat(),
  );

  const { notifyError } = useToast();

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
      value: `${seasonStats["OverallRank"].toString()}/${Object.keys(displayedStats).length}`,
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

  function handleAddRow() {
    if (rows < 4) {
      setDisplayedStatIndexes((prev) => {
        return [...prev, 3 * rows, 3 * rows + 1, 3 * rows + 2].flat();
      });
      setRows((prev) => prev + 1);
    } else {
      notifyError("A maximum of four rows are allowed.");
    }
  }

  function handleRemoveRow() {
    if (rows > 0) {
      setRows((prev) => prev - 1);
      setDisplayedStatIndexes((prev) => {
        const newStats = [...prev];
        newStats.splice(-3, 3);
        return newStats;
      });
    } else {
      notifyError("A minimum of one row is required.");
    }
  }

  function handleChangeStat(direction: "left" | "right", cellIndex: number) {
    const currentStat = displayedStatIndexes[cellIndex];
    let newStat = currentStat;
    if (direction === "left") {
      newStat = mod(newStat - 1, Object.keys(allGridStats).length);
    } else {
      newStat = mod(newStat + 1, Object.keys(allGridStats).length);
    }
    setDisplayedStatIndexes((prev) => {
      const newStats = [...prev];
      newStats[cellIndex] = newStat;
      return newStats;
    });
  }

  const displayedGridStats: [number, GridStats][] = displayedStatIndexes.map(
    (key) => [key, allGridStats[key]],
  );

  return (
    <>
      {displayedGridStats.map(([index, stat], cellIndex) => (
        <SeasonStatGridCell
          key={cellIndex}
          name={!editModeOpen ? stat["name"] : `${stat["name"]} (${index + 1})`}
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
