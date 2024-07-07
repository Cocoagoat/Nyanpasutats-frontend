"use client";
import { RecommendationType } from "@/app/interfaces";
import { useEffect, useReducer, useState } from "react";
import { recReducer, SORT_BY_PREDICTION_SCORE } from "./RecReducer";
import { Nav } from "@/components/general/Nav";
import DisplayOptions from "./DisplayOptions";
import RecsTable from "./RecsTable";
import { getShowData } from "@/app/home/api";
import styles from "./RecsBox.module.css";
import scrollbarStyles from "@/app/globals.module.css";
import TagRanking from "./TagRanking";
import { TbX } from "react-icons/tb";
import RecsWelcome from "./RecsWelcome";
import updateCookie from "@/app/actions/updateCookie";

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
    minMALScore: 6.5,
    maxMALScore: 10,
    sortedBy: SORT_BY_PREDICTION_SCORE,
    noWatchedOnly: false,
  };

  const [state, dispatch] = useReducer(recReducer, initialState);
  const [imgUrls, setImgUrls] = useState<string[]>([]);
  const [imgError, setImgError] = useState(false);
  const [imgLoading, setImgLoading] = useState(true);
  const [welcomeOpen, setWelcomeOpen] = useState(true);

  useEffect(() => {
    async function fetchImgUrl() {
      try {
        const show_names = state.displayedRecs
          .slice(0, 50)
          .map((rec) => rec["ShowName"]);
        const urls = await getShowData(show_names, "img_urls");
        setImgUrls(urls);
      } catch (error) {
        setImgError(true);
      } finally {
        setImgLoading(false);
      }
    }
    setImgLoading(true);
    fetchImgUrl();
  }, [state.displayedRecs]);

  useEffect(() => {
    updateCookie("recs", "true");
  }, []);

  return (
    <>
      <Nav />
      <div className="flex flex-col xl:flex-row">
        <p className="flex-grow-1 mx-auto basis-1/6"></p>
        <div
          className={`flex-grow-1 relative mx-auto my-auto mt-32 flex max-h-[75vh] max-w-front-n-center-600 basis-2/3 flex-col overflow-y-scroll
        text-white xl:mt-16 ${scrollbarStyles.hiddenscrollbar}`}
        >
          {welcomeOpen && (
            <div className="mb-20 rounded-xl bg-blue-990 p-3  ">
              <RecsWelcome />
              <TbX
                className="absolute right-0 top-0 h-6 w-6 cursor-pointer"
                onClick={() => setWelcomeOpen(false)}
              />
            </div>
          )}
          <DisplayOptions
            sortedBy={state.sortedBy}
            noWatchedOnly={state.noWatchedOnly}
            dispatch={dispatch}
            welcomeOpen={welcomeOpen}
            setWelcomeOpen={setWelcomeOpen}
          />
          <RecsTable
            displayedRecs={state.displayedRecs}
            imageUrls={imgUrls}
            imageError={imgError}
            imageLoading={imgLoading}
          />
        </div>
        <div className=" mx-auto mt-32 flex flex-col justify-between  gap-24  text-white  xl:mt-16 xl:gap-60">
          <TagRanking tags={favTags} />
          <TagRanking tags={leastFavTags} least_fav={true} />
        </div>
      </div>
    </>
  );
}
