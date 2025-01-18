import React, { useContext, useState } from "react";
import { RiArrowDownDoubleFill } from "react-icons/ri";
import {
  SeasonalContext,
  SeasonalDispatchContext,
  useSingleSeasonContext,
} from "./reducer/SeasonalContext";
import { displayedMeanOptions } from "@/app/interfaces";
import { hexToRgb } from "@/utils/general";
import Image from "next/image";

export default function SeasonCollapsed({
  setCardOpen,
}: {
  setCardOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { season, seasonStats, backgroundImage, backgroundColor, setExpanded } =
    useSingleSeasonContext();

  const dispatch = useContext(SeasonalDispatchContext);

  const { displayedMean } = useContext(SeasonalContext) as {
    displayedMean: displayedMeanOptions;
  };

  const [hovered, setHovered] = useState(false);

  const rgbColor = hexToRgb(backgroundColor);

  return (
    <div
      className="relative mx-4 mb-5 overflow-hidden rounded-3xl text-sky-100
     shadow-lg lg:mx-16"
    >
      <Image
        src={backgroundImage}
        fill
        alt="Test"
        className={`absolute inset-0 rounded-3xl  object-cover `}
        quality={85}
        style={{
          zIndex: 0,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(${rgbColor}, 1)
           10%, transparent 50%)`,
          zIndex: 10,
        }}
      ></div>
      <div className="relative z-20">
        <div className="flex items-center justify-between p-4">
          <div>
            <h2
              className={`text-lg font-bold shadow-black text-shadow-sm 
                lg:text-2xl`}
            >
              {season}
            </h2>
          </div>

          <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <p className="text-xs sm:text-sm lg:text-md bg-black bg-opacity-40 p-1 
            font-semibold shadow-black text-shadow-sm">
              Shows Watched: {seasonStats["Shows"]}
            </p>
            <p className="text-xs sm:text-sm lg:text-md bg-black bg-opacity-40 p-1 font-semibold shadow-black text-shadow-sm">
              {`Mean Score ${displayedMean == "AvgScore" ? "" : "(Top 10)"}`}:{" "}
              {seasonStats[displayedMean]}
            </p>
            {hovered && (
              <button
                className="absolute justify-self-center rounded-xl border border-zinc-600 bg-zinc-700 px-1.5 py-0.5 text-xs"
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
          onClick={() => {
            setExpanded(true);
            setCardOpen(true);
          }}
          className="text-xs sm:text-sm lg:text-md cursor-pointer 
          bg-black bg-opacity-50 py-1 lg:py-2 text-center"
        >
          Expand
          <RiArrowDownDoubleFill className="inline-block" />
        </div>
      </div>
    </div>
  );
}
