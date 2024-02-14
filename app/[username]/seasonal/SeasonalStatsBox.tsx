"use client";

import { SeasonsData } from "@/app/interfaces";
import { useReducer, useState } from "react";
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

  const [graphOpen, setGraphOpen] = useState(false);
  const [brightness, setBrightness] = useState(100);

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
            className={`max-w-front-n-center-60 bg-zinc-800 
           fullhd:max-w-front-n-center  ${styles.firefoxborder} absolute inset-0 mx-auto my-auto
            max-h-front-n-center overflow-y-scroll rounded-3xl border-y-[14px] 
            border-l-[14px] border-r-[2px] border-zinc-600 pb-6`}
          >
            <>
              <DisplayOptions setGraphOpen={setGraphOpen} />
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
              {Object.entries(displayedStats).map(([season, seasonStats]) => (
                <Season
                  seasonStats={seasonStats}
                  season={season}
                  seasonCount={Object.keys(seasonalStats).length}
                  key={season}
                  brightness={brightness}
                />
              ))}
            </>
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
