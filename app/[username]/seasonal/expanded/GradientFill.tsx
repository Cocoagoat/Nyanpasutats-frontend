import React from "react";
import { useSingleSeasonContext } from "../reducer/SeasonalContext";

export default function GradientFill() {
  const { season, backgroundColor } = useSingleSeasonContext();
  const { nightImage } = useSingleSeasonContext();
  function getGradientLength() {
    if (nightImage) {
      return "0%";
    }
    if (season.startsWith("Summer")) {
      return "25%";
    } else {
      return "50%";
    }
  }
  return (
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(${backgroundColor}, 1)
         ${nightImage ? "0%" : "7%"}, transparent ${getGradientLength()})`,
        zIndex: 10,
      }}
    ></div>
  );
}
