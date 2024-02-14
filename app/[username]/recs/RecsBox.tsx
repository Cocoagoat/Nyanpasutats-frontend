"use client";
import { RecommendationType } from "@/app/interfaces";
import Rec from "./Rec";
import { useReducer, useState } from "react";

import {
  recReducer,
  SORT_BY_PREDICTION_SCORE,
  SORT_BY_SCORE_DIFFERENCE,
  TOGGLE_SORT,
} from "./RecReducer";
import LargeButton from "@/components/general/LargeButton";
import TooltipQuestionMark from "@/components/general/TooltipQuestionMark";
import { tooltipsContent } from "@/utils/TooltipsContent";
import { Nav } from "@/components/general/Nav";

export default function RecsBox({
  recs_sorted_by_score,
}: {
  recs_sorted_by_score: RecommendationType[];
}) {
  // Remove this later when fixed in back-end
  const RECS_TO_SHOW = 50;
  const recs = recs_sorted_by_score.slice(0, RECS_TO_SHOW);
  const recs_sorted_by_diff = recs_sorted_by_score
    .slice(0, RECS_TO_SHOW)
    .sort(
      (a, b) => b.PredictedScore - b.MALScore - (a.PredictedScore - a.MALScore)
    );
  console.log("-------------------------------------------------");
  console.log(recs_sorted_by_diff.slice(0, 4));
  const initialState = {
    recs: recs,
    recsSortedByDiff: recs_sorted_by_diff,
    displayedRecs: recs,
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

  function handleToggleSort(sortBy: "PredictedScore" | "ScoreDiff") {
    dispatch({ type: TOGGLE_SORT, payload: sortBy });
  }

  const showColumns = [
    "Image",
    "Show Name",
    "Predicted Score",
    "User Score",
    "MAL Score",
    "Score Difference",
  ];

  const [buttonHovered, setButtonHovered] = useState(false);

  return (
    <>
      <Nav />
      <div className="max-w-front-n-center-600 flex flex-col text-center text-white inset-0 absolute mx-auto max-h-front-n-center">
        <div className="flex w-full mt-32 relative justify-between">
          <LargeButton
            extraStyles="py-4 relative bg-zinc-600"
            onClick={() => handleToggleSort("ScoreDiff")}
          >
            Sort by Score Difference
          </LargeButton>
          <div className="absolute top-0 right-0 z-50">
            <TooltipQuestionMark
              text={tooltipsContent["Recommendation Sort"]}
            />
          </div>

          <br />
          <LargeButton
            extraStyles="py-4 bg-zinc-600"
            onClick={() => handleToggleSort("PredictedScore")}
          >
            Sort by Predicted Score
          </LargeButton>
        </div>
        <table>
          <thead>
            <tr>
              {showColumns.map((col) => (
                <th key={col} className="py-2  bg-zinc-800 px-4 ">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {state.displayedRecs.map((rec) => (
              <Rec rec={rec} key={rec["ShowName"]} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
