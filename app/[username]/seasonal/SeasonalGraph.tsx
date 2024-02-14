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
        <div className="fixed mx-auto my-auto z-50 w-1/2 h-3/4 top-0 left-0 flex flex-col items-center justify-center inset-0 bg-zinc-800 text-white">
          <SeasonalBarChart
            data={displayedChartData}
            displayedMean={displayedGraphMean}
          />
          <div className="flex mx-10 mb-10 justify-center flex-wrap gap-10">
            <SortingDropdown
              type="Graph"
              graphDispatch={graphDispatch}
              graphSortedBy={sortedBy}
              graphSortedReverse={sortedReverse}
            />
            <FilterDropdown type="Graph" graphDispatch={graphDispatch} />
            <SettingsButton onClick={() => setGraphOpen(false)}>
              Close
            </SettingsButton>
          </div>
        </div>
      )}
    </div>
  );
}
