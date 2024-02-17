"use client";
import { RecommendationType } from "@/app/interfaces";
import Rec from "./Rec";
import { useMemo, useReducer, useState } from "react";

import {
  recReducer,
  SORT_BY_PREDICTION_SCORE,
  TOGGLE_SORT,
  TOGGLE_WATCHED,
} from "./RecReducer";
import LargeButton from "@/components/general/LargeButton";
import TooltipQuestionMark from "@/components/general/TooltipQuestionMark";
import { tooltipsContent } from "@/utils/TooltipsContent";
import { Nav } from "@/components/general/Nav";
import { useHandlers } from "../seasonal/reducer/useHandlers";
import FilterDropdown from "../seasonal/dropdowns/FilterDropdown";

// function sortRecsByDiff(recs: RecommendationType[]) {
//   return [...recs].sort(
//     (a, b) => b.PredictedScore - b.MALScore - (a.PredictedScore - a.MALScore),
//   );
// }

export default function RecsBox({
  recs,
  recs_sorted_by_diff,
}: {
  recs: RecommendationType[];
  recs_sorted_by_diff: RecommendationType[];
}) {
  // Remove this later when fixed in back-end
  // console.log(recs_sorted_by_score.slice(0, 4));
  // console.log(recs_sorted_by_score.length);
  // const RECS_TO_SHOW = 50;
  // recs = recs.slice(0, RECS_TO_SHOW);
  // recs_no_watched = recs_no_watched.slice(0, RECS_TO_SHOW);

  // const recs_sorted_by_diff = recs_sorted_by_score
  //   .slice(0, RECS_TO_SHOW)
  //   .sort(
  //     (a, b) => b.PredictedScore - b.MALScore - (a.PredictedScore - a.MALScore),
  //   );
  // console.log(recs[0]["ShowName"]);
  // console.log(recs_no_watched[0]["ShowName"]);

  // const recs_sorted_by_diff = useMemo(() => {
  //   return sortRecsByDiff(recs);
  // }, [recs]);

  // const recs_no_watched_sorted_by_diff = useMemo(() => {
  //   return sortRecsByDiff(recs_no_watched);
  // }, [recs_no_watched]);

  // console.log("-------------------");
  // console.log(recs[0]["ShowName"]);
  // console.log(recs_no_watched[0]["ShowName"]);

  // console.log(recs.slice(0, 10));
  // console.log(recs_no_watched.slice(0, 10));
  // console.log(recs_sorted_by_diff.slice(0, 10));
  // console.log(recs_no_watched_sorted_by_diff.slice(0, 10));
  // console.log(recs_sorted_by_diff.slice(0, 4));
  const initialState = {
    // Saving all 4 recs arrays to state for toggling between them to avoid extra computation
    // in case users go ham on the sorting buttons
    recs: recs,
    // recsNoWatched: recs_no_watched,
    recsSortedByDiff: recs_sorted_by_diff,
    // recsNoWatchedSortedByDiff: recs_no_watched_sorted_by_diff,
    displayedRecs: recs,
    startYear: 1960,
    endYear: new Date().getFullYear(),
    tag: "",
    minMALScore: 6.5,
    maxMALScore: 10,
    // sortByPredictionScore: true,
    // sortByScoreDifference: false,
    sortedBy: SORT_BY_PREDICTION_SCORE,
    noWatchedOnly: false,
  };

  // console.log(initialState);
  const [state, dispatch] = useReducer(recReducer, initialState);

  const { handleToggleSort, handleFilterByYear, handleToggleWatched } =
    useHandlers(dispatch, "recs");

  const showColumns = [
    "Image",
    "Show Name",
    "Predicted Score",
    "User Score",
    "MAL Score",
    "Score Difference",
  ];

  // const [buttonHovered, setButtonHovered] = useState(false);

  return (
    <>
      <Nav />
      <div className="absolute inset-0 mx-auto flex max-h-front-n-center max-w-front-n-center-600 flex-col text-center text-white">
        <div className="relative mt-32 flex w-full justify-between">
          <LargeButton
            extraStyles="py-4 relative bg-zinc-600"
            onClick={() => {
              console.log("Before handle");
              state.sortedBy === SORT_BY_PREDICTION_SCORE
                ? handleToggleSort("SORT_BY_SCORE_DIFFERENCE")
                : handleToggleSort("SORT_BY_PREDICTION_SCORE");
              console.log("After handle");
            }}
          >
            {state.sortedBy === SORT_BY_PREDICTION_SCORE
              ? "Sort by Score Difference"
              : "Sort by Predicted Score"}
          </LargeButton>
          <div className="absolute right-0 top-0 z-50">
            <TooltipQuestionMark
              text={tooltipsContent["Recommendation Sort"]}
            />
          </div>

          <br />
          <LargeButton
            extraStyles="py-4 bg-zinc-600"
            onClick={() => handleFilterByYear(2015, 2016)}
          >
            Filter By Year
          </LargeButton>
          <FilterDropdown type="Recs" customDispatch={dispatch} />
          <LargeButton
            extraStyles="py-4 bg-zinc-600"
            onClick={handleToggleWatched}
          >
            Watched Only
          </LargeButton>
        </div>
        <table>
          <thead>
            <tr>
              {showColumns.map((col) => (
                <th key={col} className="bg-zinc-800  px-4 py-2 ">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {state.displayedRecs.slice(0, 50).map((rec) => (
              <Rec rec={rec} key={rec["ShowName"]} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
