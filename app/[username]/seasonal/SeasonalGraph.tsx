import { SeasonsData } from "@/app/interfaces";
import React, { useReducer } from "react";
import SeasonalBarChart from "./SeasonalBarChart";
import { chartReducer } from "./reducer/ChartReducer";
import { displayedMeanOptions } from "@/app/interfaces";
import SortingDropdown from "./dropdowns/SortingDropdown";
import FilterDropdown from "./dropdowns/FilterDropdown";
import { MdClose } from "react-icons/md";

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
        <div
          className="fixed inset-0 left-0 top-0 z-[500] mx-auto my-auto flex h-full w-full flex-col
         items-center justify-center bg-zinc-800 text-white"
        >
          <div className="grid w-full grid-cols-6">
            <button
              className="col col-start-5 mr-20 w-fit p-1 text-3xl text-lime-600 hover:bg-zinc-700"
              onClick={() => setGraphOpen(false)}
            >
              <MdClose />
            </button>
          </div>
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
          </div>
        </div>
      )}
    </div>
  );
}
