"use client";
import scrollbarStyles from "@/app/globals.module.css";
import { RecommendationType } from "@/app/interfaces";
import { useUpdateRouteCookies } from "@/hooks/useUpdateRouteCookies";
import { useReducer, useState } from "react";
import DisplayOptions from "./DisplayOptions";
import { SORT_BY_PREDICTION_SCORE, recReducer } from "./RecReducer";
import RecsTable from "./RecsTable";
import RecsWelcome from "./RecsWelcome";
import TagRanking from "./TagRanking";

export default function RecsBox({
  recs,
  recs_sorted_by_diff,
  favTags,
  leastFavTags,
}: {
  recs: RecommendationType[];
  recs_sorted_by_diff: RecommendationType[];
  favTags: string[];
  leastFavTags: string[];
}) {
  const initialState = {
    recs: recs,
    recsSortedByDiff: recs_sorted_by_diff,
    displayedRecs: recs,
    startYear: 1960,
    endYear: new Date().getFullYear(),
    tag: "",
    minMALScore: 6.8,
    maxMALScore: 10,
    sortedBy: SORT_BY_PREDICTION_SCORE,
    noWatchedOnly: false,
  };

  const [state, dispatch] = useReducer(recReducer, initialState);
  const [welcomeOpen, setWelcomeOpen] = useState(true);

  useUpdateRouteCookies("recs");

  return (
    <>
      <div className="flex flex-col xl:flex-row">
        <p className="flex-grow-1 mx-auto basis-1/6"></p>
        <div
          className={`flex-grow-1 relative mx-auto my-auto mt-32 flex max-h-[75vh] max-w-front-n-center-45 basis-2/3 flex-col overflow-y-scroll
        text-white xl:mt-16 ${scrollbarStyles.hiddenscrollbar}`}
        >
          {welcomeOpen && <RecsWelcome setOpen={setWelcomeOpen} />}
          <DisplayOptions
            sortedBy={state.sortedBy}
            noWatchedOnly={state.noWatchedOnly}
            dispatch={dispatch}
            welcomeOpen={welcomeOpen}
            setWelcomeOpen={setWelcomeOpen}
          />
          <RecsTable displayedRecs={state.displayedRecs} />
        </div>
        <div
          className=" mx-auto mt-32 flex flex-col justify-between gap-24 text-white
          xl:mt-16 fullhd:gap-60"
        >
          <TagRanking tags={favTags} />
          <TagRanking tags={leastFavTags} least_fav={true} />
        </div>
      </div>
    </>
  );
}
