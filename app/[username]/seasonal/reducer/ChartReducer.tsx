// The reducer for the seasonal graph (Graph button in the DisplayOptions component)
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
        action.payload.by !== "Season" &&
        action.payload.by !== "AvgScore" &&
        action.payload.by !== "FavoritesAvgScore" &&
        action.payload.by !== "Shows"
      )
        return state; // Invalid sort key
      const sortedChartData = sortChartData(
        state.displayedChartData,
        action.payload.by,
        state.sortedReverse,
      );
      return {
        ...state,
        sortedBy: action.payload.by,
        sortedReverse: !state.sortedReverse,
        displayedChartData: sortedChartData,
      };
    case "FILTER_BY_YEAR":
      const startYear = checkValidYear(action.payload.startYear)
        ? action.payload.startYear
        : 1960;
      const endYear = checkValidYear(action.payload.endYear)
        ? action.payload.endYear
        : new Date().getFullYear();
      return {
        ...state,
        displayedChartData: state.chartData.filter(
          (season) =>
            parseInt(season.Season.split(" ")[1]) >= startYear &&
            parseInt(season.Season.split(" ")[1]) <= endYear,
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
      const minShows = checkValidShowCount(action.payload.minShows)
        ? action.payload.minShows
        : 0;
      const maxShows = checkValidShowCount(action.payload.maxShows)
        ? action.payload.maxShows
        : 100;
      return {
        ...state,
        displayedChartData: state.chartData.filter(
          (season) => season.Shows >= minShows && season.Shows <= maxShows,
        ),
      };
    case "RESET_FILTER":
      return {
        ...state,
        displayedChartData: state.chartData,
      };

    case "RECALCULATE_OVERALL_RANK":
      return state;
    default:
      throw new Error("Invalid action type in ChartReducer");
  }
}
