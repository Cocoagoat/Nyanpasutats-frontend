import React, { useContext, useState } from "react";
import { RiArrowDownDoubleFill } from "react-icons/ri";
import {
  SeasonalContext,
  SeasonalDispatchContext,
  useSingleSeasonContext,
} from "./reducer/SeasonalContext";
import { displayedMeanOptions } from "@/app/interfaces";

export default function SeasonCollapsed() {
  const { season, seasonStats, backgroundImage, backgroundColor, setExpanded } =
    useSingleSeasonContext();

  const dispatch = useContext(SeasonalDispatchContext);

  const { displayedMean } = useContext(SeasonalContext) as {
    displayedMean: displayedMeanOptions;
  };

  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative overflow-hidden rounded-3xl mx-16 shadow-lg text-sky-100 mb-5"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(${backgroundColor}, 1) 10%, transparent 50%)`,
          zIndex: 10,
        }}
      ></div>
      <div className="relative z-20">
        <div className="flex justify-between items-center p-4">
          <div>
            <h2
              className={`text-2xl text-shadow-sm ${
                season.startsWith("Summer") ? "shadow-slate-700" : ""
              } font-bold`}
            >
              {season}
            </h2>
          </div>

          <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <p className="text-md font-semibold p-1 bg-black bg-opacity-40">
              Shows Watched: {seasonStats["Shows"]}
            </p>
            <p className="text-md  bg-black bg-opacity-40 font-semibold p-1">
              {`Mean Score ${displayedMean == "AvgScore" ? "" : "(Top 10)"}`}:{" "}
              {seasonStats[displayedMean]}
            </p>
            {hovered && (
              <button
                className="rounded-xl absolute justify-self-center bg-zinc-700 border text-xs border-zinc-600 px-1.5 py-0.5"
                onClick={() => {
                  const newDisplayedMean =
                    displayedMean === "AvgScore"
                      ? "FavoritesAvgScore"
                      : "AvgScore";
                  dispatch({
                    type: "CHANGE_DISPLAYED_MEAN",
                    payload: newDisplayedMean,
                  });
                }}
              >
                Toggle Mean
              </button>
            )}
          </div>
        </div>
        <div
          onClick={() => setExpanded(true)}
          className="bg-black bg-opacity-50 text-center py-2 cursor-pointer"
        >
          Expand
          <RiArrowDownDoubleFill className="inline-block" />
        </div>
      </div>
    </div>
  );
}
