"use client";
import { RecommendationType } from "@/app/interfaces";
import { useEffect, useReducer, useState } from "react";
import { recReducer, SORT_BY_PREDICTION_SCORE } from "./RecReducer";
import { Nav } from "@/components/general/Nav";
import DisplayOptions from "./DisplayOptions";
import RecsTable from "./RecsTable";
import { getShowData } from "@/app/home/api";
import styles from "./RecsBox.module.css";

export default function RecsBox({
  recs,
  recs_sorted_by_diff,
}: {
  recs: RecommendationType[];
  recs_sorted_by_diff: RecommendationType[];
}) {
  const initialState = {
    recs: recs,
    recsSortedByDiff: recs_sorted_by_diff,
    displayedRecs: recs,
    startYear: 1960,
    endYear: new Date().getFullYear(),
    tag: "",
    minMALScore: 6.5,
    maxMALScore: 10,
    sortedBy: SORT_BY_PREDICTION_SCORE,
    noWatchedOnly: false,
  };

  const [state, dispatch] = useReducer(recReducer, initialState);
  const [imgUrls, setImgUrls] = useState<string[]>([]);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    // Define the async function inside the effect
    async function fetchImgUrl() {
      try {
        const show_names = state.displayedRecs
          .slice(0, 50)
          .map((rec) => rec["ShowName"]);
        const urls = await getShowData(show_names, "img_urls");
        setImgUrls(urls); // Update state with the URL
      } catch (error) {
        // Handle any errors here, such as setting a default image or logging the error
        setImgError(true);
      }
    }

    // Call the async function
    fetchImgUrl();
  }, [state.displayedRecs]);

  return (
    <>
      <Nav />
      <div
        className={`absolute inset-0 mx-auto my-auto mt-32 flex max-h-front-n-center max-w-front-n-center-600
       flex-col overflow-y-scroll text-white ${styles.hiddenscrollbar}`}
      >
        <DisplayOptions
          sortedBy={state.sortedBy}
          noWatchedOnly={state.noWatchedOnly}
          dispatch={dispatch}
        />
        <RecsTable
          displayedRecs={state.displayedRecs}
          imageUrls={imgUrls}
          imageError={imgError}
        />
      </div>
    </>
  );
}
