"use client";
import { RecommendationType } from "@/app/interfaces";
import Recommendation from "./Recommendation";
import { useReducer, useState } from "react";
export const FILTER_BY_YEAR_RANGE = "FILTER_BY_YEAR_RANGE";
export const FILTER_BY_TAG = "FILTER_BY_TAG";
export const FILTER_BY_MAL_SCORE = "FILTER_BY_MAL_SCORE";
export const SORT_BY_PREDICTION_SCORE = "SORT_BY_PREDICTION_SCORE";
export const SORT_BY_SCORE_DIFFERENCE = "SORT_BY_SCORE_DIFFERENCE";

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

export type RecommendationAction =
  | FilterByYearRangeAction
  | FilterByTagAction
  | FilterByMALScoreAction
  | SortByPredictionScoreAction
  | SortByScoreDifferenceAction;

export type initialStateType = {
  data: RecommendationType[];
  startYear: number;
  endYear: number;
  tag: string;
  minMALScore: number;
  maxMALScore: number;
  sortByPredictionScore: boolean;
  sortByScoreDifference: boolean;
};

const recReducer = (state: initialStateType, action: RecommendationAction) => {
  switch (action.type) {
    case SORT_BY_PREDICTION_SCORE:
      return {
        ...state,
        data: [...state.data].sort(
          (a, b) => b.PredictedScore - a.PredictedScore
        ),
      };
    case SORT_BY_SCORE_DIFFERENCE:
      return {
        ...state,
        data: [...state.data].sort(
          (a, b) =>
            b.PredictedScore - b.MALScore - (a.PredictedScore - a.MALScore)
        ),
      };
    default:
      throw new Error();
  }
};

export default function RecommendationBox({
  recs,
}: {
  recs: RecommendationType[];
}) {
  const initialState = {
    data: recs,
    startYear: 1960,
    endYear: new Date().getFullYear(),
    tag: "",
    minMALScore: 6.5,
    maxMALScore: 10,
    sortByPredictionScore: true,
    sortByScoreDifference: false,
  };
  const [state, dispatch] = useReducer(recReducer, initialState);

  const handleSortByPredictionScore = () => {
    dispatch({ type: SORT_BY_PREDICTION_SCORE });
  };

  const handleSortByScoreDiff = () => {
    dispatch({ type: SORT_BY_SCORE_DIFFERENCE });
    console.log("Dispatched");
  };

  return (
    <>
      <button onClick={() => handleSortByScoreDiff()}>
        Sort by Score Difference
      </button>
      <br />
      <button onClick={() => handleSortByPredictionScore()}>
        Sort by Prediction Score
      </button>
      <table>
        <thead>
          <tr>
            <th>Show Name</th>
            <th>MAL Score</th>
            <th>Predicted Score</th>
            <th>User Score</th>
          </tr>
        </thead>
        <tbody>
          {state.data.map((rec) => (
            <Recommendation rec={rec} key={rec["ShowName"]} />
          ))}
        </tbody>
      </table>
    </>
  );
}
