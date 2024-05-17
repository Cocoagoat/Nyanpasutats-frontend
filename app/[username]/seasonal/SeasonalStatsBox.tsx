"use client";

import { SeasonsData } from "@/app/interfaces";
import { useEffect, useReducer, useState } from "react";
import Season from "./Season";
import DisplayOptions from "./DisplayOptions";
import { seasonalStatsReducer } from "./reducer/SeasonalStatsReducer";
import { displayedMeanOptions } from "@/app/interfaces";
import {
  SeasonalContext,
  SeasonalDispatchContext,
} from "./reducer/SeasonalContext";
import SeasonalGraph from "./SeasonalGraph";
import VerticalSlider from "@/components/general/VerticalSlider";
import styles from "./SeasonalStatsBox.module.css";
import ToasterWithX from "@/components/general/ToasterWithX";
import TooltipQuestionMark from "@/components/general/TooltipQuestionMark";
import SeasonalWelcome from "./SeasonalWelcome";
import { TbX } from "react-icons/tb";
import { MdArrowUpward } from "react-icons/md";
import InfiniteScroll from "react-infinite-scroll-component";

const getKEntries = <T extends object>(obj: T, a: number, b: number): T => {
  return Object.keys(obj)
    .slice(a, b)
    .reduce((acc, key) => {
      acc[key as keyof T] = obj[key as keyof T];
      return acc;
    }, {} as T);
};

export default function SeasonalStatsBox({
  seasonStats,
  noSequelsSeasonStats,
}: {
  seasonStats: SeasonsData;
  noSequelsSeasonStats: SeasonsData;
}) {
  const initialState = {
    seasonalStats: seasonStats,
    noSequelsSeasonalStats: noSequelsSeasonStats,
    displayedStats: seasonStats,
    sortedBy: "Season",
    sortedReverse: false,
    displayedMean: "AvgScore" as displayedMeanOptions,
    noSequels: false,
  };
  const [
    {
      seasonalStats,
      noSequelsSeasonalStats,
      displayedStats,
      sortedBy,
      sortedReverse,
      displayedMean,
      noSequels,
    },
    dispatch,
  ] = useReducer(seasonalStatsReducer, initialState);

  const MAX_ITEMS = 5;

  const [graphOpen, setGraphOpen] = useState(false);
  const [welcomeOpen, setWelcomeOpen] = useState(true);
  const [brightness, setBrightness] = useState(100);
  const [hasMore, setHasMore] = useState(true);

  const [partialDisplayedStats, setPartialDisplayedStats] = useState(
    getKEntries(displayedStats, 0, MAX_ITEMS),
  );

  useEffect(() => {
    setPartialDisplayedStats(getKEntries(displayedStats, 0, MAX_ITEMS));
    setHasMore(true);
    const scrollableContainer = document.getElementById("scrollableDiv");
    if (scrollableContainer) {
      scrollableContainer.scrollTop = 0;
    }
  }, [displayedStats]);

  const fetchMoreData = () => {
    console.log("Entered fetchMoreData");
    if (
      Object.keys(partialDisplayedStats).length >=
      Object.keys(displayedStats).length
    ) {
      setHasMore(false);
      return;
    }
    console.log(
      `fetching more data: ${Object.keys(partialDisplayedStats).length}`,
    );

    const nextItems = getKEntries(
      displayedStats,
      Object.keys(partialDisplayedStats).length,
      Object.keys(partialDisplayedStats).length + MAX_ITEMS,
    );
    setPartialDisplayedStats({ ...partialDisplayedStats, ...nextItems });
  };

  return (
    <SeasonalContext.Provider
      value={{
        seasonalStats,
        noSequelsSeasonalStats,
        displayedStats,
        sortedBy,
        sortedReverse,
        displayedMean,
        noSequels,
      }}
    >
      <SeasonalDispatchContext.Provider value={dispatch}>
        {!graphOpen ? (
          <div
            className={`max-w-front-n-center-60 bg-blue-990 
     fullhd:max-w-front-n-center  ${styles.firefoxborder} absolute inset-0 mx-auto my-auto
      max-h-front-n-center overflow-x-hidden overflow-y-scroll rounded-3xl border-y-[14px] 
      border-l-[14px] border-r-[2px] border-gray-600 pb-6`}
            id="scrollableDiv"
          >
            {welcomeOpen && (
              <div className="rounded-xl bg-blue-990 p-3">
                <SeasonalWelcome />
                <TbX
                  className="absolute right-0 top-0 h-6 w-6 cursor-pointer text-white"
                  onClick={() => setWelcomeOpen(false)}
                />
              </div>
            )}
            <DisplayOptions setGraphOpen={setGraphOpen} />
            <div className="absolute right-0 top-0 z-50">
              {!welcomeOpen && (
                <MdArrowUpward
                  className="h-6 w-6 cursor-pointer rounded-full bg-blue-970 p-1 text-xs text-white hover:bg-lime-600"
                  onClick={() => {
                    if (setWelcomeOpen) {
                      setWelcomeOpen(true);
                    }
                  }}
                />
              )}
            </div>
            <VerticalSlider
              value={brightness}
              min={0}
              max={100}
              onChange={(e, newValue) => {
                if (typeof newValue === "number") {
                  setBrightness(newValue);
                }
              }}
              step={5}
            />
            <InfiniteScroll
              dataLength={Object.keys(partialDisplayedStats).length}
              next={fetchMoreData}
              hasMore={hasMore}
              loader={<h4>Loading...</h4>}
              scrollableTarget="scrollableDiv"
            >
              {Object.keys(partialDisplayedStats).length ? (
                Object.entries(partialDisplayedStats).map(
                  ([season, seasonStats]) => (
                    <Season
                      seasonStats={seasonStats}
                      season={season}
                      seasonCount={
                        noSequels
                          ? Object.keys(noSequelsSeasonalStats).length
                          : Object.keys(seasonalStats).length
                      }
                      key={season}
                      brightness={brightness}
                    />
                  ),
                )
              ) : (
                <>
                  <TooltipQuestionMark
                    text="For a season to be displayed here, you must watch and score at least 5 shows in it."
                    extraStyles="bg-zinc-700 text-lime-600"
                  />
                  <div className="mx-24 text-center text-5xl font-bold text-lime-600">
                    <p className="mt-10">
                      It seems like you haven't scored much anime yet...
                    </p>
                  </div>
                </>
              )}
            </InfiniteScroll>
          </div>
        ) : (
          <SeasonalGraph
            stats={displayedStats}
            graphOpen={graphOpen}
            setGraphOpen={setGraphOpen}
          />
        )}
        <ToasterWithX />
      </SeasonalDispatchContext.Provider>
    </SeasonalContext.Provider>
  );
}
