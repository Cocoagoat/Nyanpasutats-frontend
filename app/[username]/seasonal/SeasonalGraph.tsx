import { SeasonsData } from "@/app/interfaces";
import React, { useReducer } from "react";
import SeasonalBarChart from "./SeasonalBarChart";
import { chartReducer } from "./reducer/ChartReducer";
import { displayedMeanOptions } from "@/app/interfaces";
import SettingsButton from "@/components/general/SettingsButton";
import SortingDropdown from "./dropdowns/SortingDropdown";
import FilterDropdown from "./dropdowns/FilterDropdown";

export default function SeasonalGraph({
  stats,
  graphOpen,
  setGraphOpen,
}: {
  stats: SeasonsData;
  graphOpen: boolean;
  setGraphOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  let graphStats = Object.entries(stats).map(([season, seasonData]) => ({
    Season: season,
    AvgScore: seasonData["AvgScore"],
    FavoritesAvgScore: seasonData["FavoritesAvgScore"],
    Shows: seasonData["Shows"],
  }));

  const initialChartState = {
    chartData: graphStats,
    displayedChartData: graphStats,
    sortedBy: "Season",
    sortedReverse: false,
    displayedMean: "AvgScore" as displayedMeanOptions,
  };

  const [
    {
      displayedChartData,
      sortedBy,
      sortedReverse,
      displayedMean: displayedGraphMean,
    },
    graphDispatch,
  ] = useReducer(chartReducer, initialChartState);

  return (
    <div className="relative">
      {graphOpen && (
        <div className="fixed inset-0 left-0 top-0 z-50 mx-auto my-auto flex h-3/4 w-1/2 flex-col items-center justify-center bg-zinc-800 text-white">
          <SeasonalBarChart
            data={displayedChartData}
            displayedMean={displayedGraphMean}
          />
          <div className="mx-10 mb-10 flex flex-wrap justify-center gap-10">
            <SortingDropdown
              type="Graph"
              customDispatch={graphDispatch}
              customSortedBy={sortedBy}
              customSortedReverse={sortedReverse}
            />
            <FilterDropdown type="Graph" customDispatch={graphDispatch} />
            <SettingsButton onClick={() => setGraphOpen(false)}>
              Close
            </SettingsButton>
          </div>
        </div>
      )}
    </div>
  );
}
