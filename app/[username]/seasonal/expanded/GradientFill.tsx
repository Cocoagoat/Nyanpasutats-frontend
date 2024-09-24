import React from "react";
import { useSingleSeasonContext } from "../reducer/SeasonalContext";
import { hexToRgb } from "@/utils/general";

export default function GradientFill() {
  const { season, backgroundColor } = useSingleSeasonContext();
  function getGradientLength() {
    if (season.startsWith("Summer")) {
      return "25%";
    } else {
      return "50%";
    }
  }
  const rgbColor = hexToRgb(backgroundColor);
  // Zindex of the backgroundImage is 5, gradient is 6, backgroundColor is 4
  return (
    <>
      <div
        className="absolute inset-0 rounded-3xl"
        style={{
          backgroundImage: `${`linear-gradient(to bottom, rgba(${rgbColor}, 1)
         ${"7%"}, transparent ${getGradientLength()})`}`,
          zIndex: 6,
          opacity: 0.95,
        }}
      ></div>
    </>
  );
}
