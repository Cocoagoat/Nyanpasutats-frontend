"use client";
import { RecommendationType } from "@/app/interfaces";
import Recommendation from "./Rec";
import { useReducer, useState } from "react";
import RecsColumn from "./RecsColumnHeader";
import {
  recReducer,
  SORT_BY_PREDICTION_SCORE,
  SORT_BY_SCORE_DIFFERENCE,
} from "./RecReducer";

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
    sortedBy: "",
  };
  const [state, dispatch] = useReducer(recReducer, initialState);

  const handleSortByPredictionScore = () => {
    dispatch({ type: SORT_BY_PREDICTION_SCORE });
  };

  const handleSortByScoreDiff = () => {
    dispatch({ type: SORT_BY_SCORE_DIFFERENCE });
  };

  const showColumns = [
    "Image",
    "Show Name",
    "Predicted Score",
    "User Score",
    "MAL Score",
    "Score Difference",
  ];

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
            {showColumns.map((col) => (
              <RecsColumn columnName={col} key={col} />
            ))}
            {/* <th>Show Name</th>
            <th>MAL Score</th>
            <th>Predicted Score</th>
            <th>User Score</th>
            <th>Score Difference</th> */}
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
