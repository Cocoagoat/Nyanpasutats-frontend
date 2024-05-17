import { ChartData, ChartDataKeys } from "@/app/interfaces";
import { displayedMeanOptions } from "@/app/interfaces";
import { Action } from "./actions";
import { checkValidShowCount, checkValidYear } from "@/utils/checkValidValues";
import { compareSeasons } from "./sortSeasonalStats";

export type ChartState = {
  chartData: ChartData[];
  displayedChartData: ChartData[];
  sortedBy: string;
  sortedReverse: boolean;
  displayedMean: displayedMeanOptions;
};

export function sortChartData(
  chartData: ChartData[],
  by: ChartDataKeys,
  reverse: boolean,
) {
  if (by === "Season") {
    return chartData.sort((a, b) => {
      const coeff = reverse ? -1 : 1;
      return coeff * compareSeasons(a.Season, b.Season);
    });
  }

  return chartData.sort((a, b) => {
    if ((a[by] ?? 0) < (b[by] ?? 0)) {
      return reverse ? 1 : -1;
    }

    if ((a[by] ?? 0) > (b[by] ?? 0)) {
      return reverse ? -1 : 1;
    }
    return 0;
  });
}

export function chartReducer(state: ChartState, action: Action): ChartState {
  switch (action.type) {
    case "SORT":
      if (
        action.payload.by != "Season" &&
        action.payload.by != "AvgScore" &&
        action.payload.by != "FavoritesAvgScore" &&
        action.payload.by != "Shows"
      )
        return state; //error
      const sortedChartData = sortChartData(
        state.displayedChartData,
        action.payload.by,
        state.sortedReverse, // toggle the sort direction before sorting
      );
      return {
        ...state,
        sortedBy: action.payload.by,
        sortedReverse: !state.sortedReverse,
        displayedChartData: sortedChartData,
        // seasonalStats: sortSeasonalStats(action.payload, state.reverse),
      };
    case "FILTER_BY_YEAR":
      if (!checkValidYear(action.payload.startYear))
        action.payload.startYear = 1960;
      if (!checkValidYear(action.payload.endYear))
        action.payload.endYear = new Date().getFullYear();
      return {
        ...state,
        displayedChartData: state.chartData.filter(
          (season) =>
            parseInt(season.Season.split(" ")[1]) >= action.payload.startYear &&
            parseInt(season.Season.split(" ")[1]) <= action.payload.endYear,
        ),
      };
    case "FILTER_BY_SEASON_NAME":
      return {
        ...state,
        displayedChartData: state.chartData.filter((season) =>
          season.Season.includes(action.payload.text),
        ),
      };
    case "CHANGE_DISPLAYED_MEAN":
      return {
        ...state,
        displayedMean: action.payload,
      };
    case "FILTER_BY_SHOW_COUNT":
      console.log(
        "minShows: ",
        action.payload.minShows,
        "maxShows: ",
        action.payload.maxShows,
      );
      if (!checkValidShowCount(action.payload.minShows))
        action.payload.minShows = 0;
      if (!checkValidShowCount(action.payload.maxShows))
        action.payload.maxShows = 100;
      return {
        ...state,
        displayedChartData: state.chartData.filter(
          (season) =>
            season.Shows >= action.payload.minShows &&
            season.Shows <= action.payload.maxShows,
        ),
      };
    case "RESET_FILTER":
      return {
        ...state,
        displayedChartData: state.chartData,
      };
    default:
      throw new Error("Invalid action type in ChartReducer");
  }
}
