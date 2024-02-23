import { RecommendationType } from "@/app/interfaces";
import { checkValidYear } from "@/utils/checkValidValues";

export const FILTER_BY_YEAR = "FILTER_BY_YEAR";
export const FILTER_BY_TAG = "FILTER_BY_TAG";
export const FILTER_BY_MAL_SCORE = "FILTER_BY_MAL_SCORE";
export const SORT_BY_PREDICTION_SCORE = "SORT_BY_PREDICTION_SCORE";
export const SORT_BY_SCORE_DIFFERENCE = "SORT_BY_SCORE_DIFFERENCE";
export const TOGGLE_SORT = "TOGGLE_SORT";
export const TOGGLE_WATCHED = "TOGGLE_WATCHED";
export const GENERATE_DISPLAYED_RECS = "GENERATE_DISPLAYED_RECS";
export const RESET_FILTER = "RESET_FILTER";

function FilterOutWatchedRecs(recs: RecommendationType[]) {
  return [...recs].filter((rec) => !rec.UserScore);
}

export interface FilterByYearRangeAction {
  type: typeof FILTER_BY_YEAR;
  payload: { startYear: number; endYear: number };
}

export interface FilterByTagAction {
  type: typeof FILTER_BY_TAG;
  payload: string;
}

export interface FilterByMALScoreAction {
  type: typeof FILTER_BY_MAL_SCORE;
  payload: { min: number; max: number };
}

export interface SortByPredictionScoreAction {
  type: typeof SORT_BY_PREDICTION_SCORE;
}

export interface SortByScoreDifferenceAction {
  type: typeof SORT_BY_SCORE_DIFFERENCE;
}

export interface ToggleSortAction {
  type: typeof TOGGLE_SORT;
  payload: "SORT_BY_SCORE_DIFFERENCE" | "SORT_BY_PREDICTION_SCORE";
}

export interface ToggleWatchedAction {
  type: typeof TOGGLE_WATCHED;
}

export interface GenerateDisplayedRecsAction {
  type: typeof GENERATE_DISPLAYED_RECS;
}

export interface ResetFilterAction {
  type: typeof RESET_FILTER;
}

export type RecommendationAction =
  | FilterByYearRangeAction
  | FilterByTagAction
  | FilterByMALScoreAction
  | SortByPredictionScoreAction
  | SortByScoreDifferenceAction
  | ToggleSortAction
  | ToggleWatchedAction
  | GenerateDisplayedRecsAction
  | ResetFilterAction;

export type initialStateType = {
  recs: RecommendationType[];
  // recsNoWatched: RecommendationType[];
  recsSortedByDiff: RecommendationType[];
  // recsNoWatchedSortedByDiff: RecommendationType[];
  displayedRecs: RecommendationType[];
  startYear: number;
  endYear: number;
  tag: string;
  minMALScore: number;
  maxMALScore: number;
  noWatchedOnly: boolean;
  // sortByPredictionScore: boolean;
  // sortByScoreDifference: boolean;
  sortedBy: string;
};

export const recReducer = (
  state: initialStateType,
  action: RecommendationAction,
) => {
  switch (action.type) {
    case TOGGLE_SORT:
      return {
        ...state,
        sortedBy: action.payload,
      };
    case TOGGLE_WATCHED:
      return {
        ...state,
        noWatchedOnly: !state.noWatchedOnly,
      };

    case FILTER_BY_YEAR:
      if (!checkValidYear(action.payload.startYear))
        action.payload.startYear = 1960;
      if (!checkValidYear(action.payload.endYear))
        action.payload.endYear = new Date().getFullYear();
      return {
        ...state,
        startYear: action.payload.startYear,
        endYear: action.payload.endYear,
      };

    case FILTER_BY_MAL_SCORE:
      return {
        ...state,
        minMALScore: action.payload.min,
        maxMALScore: action.payload.max,
      };

    case RESET_FILTER:
      return {
        ...state,
        startYear: 1960,
        endYear: new Date().getFullYear(),
        minMALScore: 6.5,
        maxMALScore: 10,
      };

    case GENERATE_DISPLAYED_RECS:
      let displayRecs =
        state.sortedBy === SORT_BY_PREDICTION_SCORE
          ? state.recs
          : state.recsSortedByDiff;
      displayRecs = displayRecs.filter(
        (rec) => rec.Year >= state.startYear && rec.Year <= state.endYear,
      );
      displayRecs = displayRecs.filter(
        (rec) =>
          rec.MALScore >= state.minMALScore &&
          rec.MALScore <= state.maxMALScore,
      );
      displayRecs = state.noWatchedOnly
        ? FilterOutWatchedRecs(displayRecs)
        : displayRecs;
      return {
        ...state,
        displayedRecs: displayRecs,
      };

    default:
      throw new Error();
  }
};
