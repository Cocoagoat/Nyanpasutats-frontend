import { RecommendationType } from "@/app/interfaces";

export const FILTER_BY_YEAR_RANGE = "FILTER_BY_YEAR_RANGE";
export const FILTER_BY_TAG = "FILTER_BY_TAG";
export const FILTER_BY_MAL_SCORE = "FILTER_BY_MAL_SCORE";
export const SORT_BY_PREDICTION_SCORE = "SORT_BY_PREDICTION_SCORE";
export const SORT_BY_SCORE_DIFFERENCE = "SORT_BY_SCORE_DIFFERENCE";
export const TOGGLE_SORT = "TOGGLE_SORT";

export interface FilterByYearRangeAction {
  type: typeof FILTER_BY_YEAR_RANGE;
  payload: { min: number; max: number };
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
  payload: "PredictedScore" | "ScoreDiff";
}

export type RecommendationAction =
  | FilterByYearRangeAction
  | FilterByTagAction
  | FilterByMALScoreAction
  | SortByPredictionScoreAction
  | SortByScoreDifferenceAction
  | ToggleSortAction;

export type initialStateType = {
  recs: RecommendationType[];
  recsSortedByDiff: RecommendationType[];
  displayedRecs: RecommendationType[];
  startYear: number;
  endYear: number;
  tag: string;
  minMALScore: number;
  maxMALScore: number;
  sortByPredictionScore: boolean;
  sortByScoreDifference: boolean;
  sortedBy: string;
};

export const recReducer = (
  state: initialStateType,
  action: RecommendationAction
) => {
  switch (action.type) {
    case SORT_BY_PREDICTION_SCORE:
      if (state.sortedBy == SORT_BY_PREDICTION_SCORE)
        return {
          ...state,
          recs: [...state.recs].reverse(),
        };
      return {
        ...state,
        recs: [...state.recs].sort(
          (a, b) => b.PredictedScore - a.PredictedScore
        ),
        sortedBy: SORT_BY_PREDICTION_SCORE,
      };
    case SORT_BY_SCORE_DIFFERENCE:
      if (state.sortedBy == SORT_BY_SCORE_DIFFERENCE)
        return {
          ...state,
          recs: [...state.recs].reverse(),
        };
      return {
        ...state,
        recs: [...state.recs].sort(
          (a, b) =>
            b.PredictedScore - b.MALScore - (a.PredictedScore - a.MALScore)
        ),
        sortedBy: SORT_BY_SCORE_DIFFERENCE,
      };
    case TOGGLE_SORT:
      return {
        ...state,
        displayedRecs:
          action.payload == "PredictedScore"
            ? state.recs
            : state.recsSortedByDiff,
      };

    default:
      throw new Error();
  }
};