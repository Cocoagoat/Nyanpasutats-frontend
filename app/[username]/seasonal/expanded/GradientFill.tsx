import React from "react";
import { useSingleSeasonContext } from "../reducer/SeasonalContext";

export default function GradientFill() {
  const { season, backgroundColor } = useSingleSeasonContext();

  return (
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(${backgroundColor}, 1) 7%, transparent ${
          season.startsWith("Summer") ? "25%" : "50%"
        })`,
        zIndex: 10,
      }}
    ></div>
  );
}
