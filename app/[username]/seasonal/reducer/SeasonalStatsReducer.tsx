import { Action } from "./actions";
import { SeasonsData } from "@/app/interfaces";
import { sortSeasonalStats } from "./sortSeasonalStats";
import { checkValidShowCount, checkValidYear } from "@/utils/checkValidValues";
import { displayedMeanOptions } from "@/app/interfaces";

export type State = {
  seasonalStats: SeasonsData;
  noSequelsSeasonalStats: SeasonsData;
  displayedStats: SeasonsData;
  sortedBy: string;
  sortedReverse: boolean;
  displayedMean: displayedMeanOptions;
  noSequels: boolean;
};

export function seasonalStatsReducer(state: State, action: Action): State {
  switch (action.type) {
    case "SORT":
      const sortedSeasonalStats = sortSeasonalStats(
        state.displayedStats,
        action.payload.by,
        state.sortedReverse,
      );
      return {
        ...state,
        sortedBy: action.payload.by,
        sortedReverse: !state.sortedReverse,
        displayedStats: sortedSeasonalStats,
      };
    case "FILTER_BY_YEAR":
      if (!checkValidYear(action.payload.startYear))
        action.payload.startYear = 1960;
      if (!checkValidYear(action.payload.endYear))
        action.payload.endYear = new Date().getFullYear();
      return {
        ...state,
        displayedStats: Object.entries(state.displayedStats)
          .filter(
            ([season, _]) =>
              parseInt(season.split(" ")[1]) >= action.payload.startYear &&
              parseInt(season.split(" ")[1]) <= action.payload.endYear,
          )
          .reduce((acc: SeasonsData, [season, seasonStats]) => {
            acc[season] = seasonStats;
            return acc;
          }, {}),
      };
    case "FILTER_BY_SEASON_NAME":
      return {
        ...state,
        displayedStats: Object.entries(state.displayedStats)
          .filter(([season, _]) => season.includes(action.payload.text))
          .reduce((acc: SeasonsData, [season, seasonStats]) => {
            acc[season] = seasonStats;
            return acc;
          }, {}),
      };

    case "FILTER_BY_SHOW_COUNT":
      if (!checkValidShowCount(action.payload.minShows))
        action.payload.minShows = 0;
      if (!checkValidShowCount(action.payload.maxShows))
        action.payload.maxShows = 100;
      return {
        ...state,
        displayedStats: Object.entries(state.displayedStats)
          .filter(
            ([_, seasonStats]) =>
              seasonStats["Shows"] >= action.payload.minShows &&
              seasonStats["Shows"] <= action.payload.maxShows,
          )
          .reduce((acc: SeasonsData, [season, seasonStats]) => {
            acc[season] = seasonStats;
            return acc;
          }, {}),
      };

    case "RESET_FILTER":
      return {
        ...state,
        displayedStats: state.seasonalStats,
      };
    case "CHANGE_DISPLAYED_MEAN":
      return {
        ...state,
        displayedMean: action.payload,
      };
    case "TOGGLE_SEQUELS":
      return {
        ...state,
        displayedStats:
          action.payload == "Include"
            ? state.seasonalStats
            : state.noSequelsSeasonalStats,
        noSequels: action.payload == "Include" ? false : true,
      };

    default:
      return state;
  }
}
