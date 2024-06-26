import React from "react";
import { useSingleSeasonContext } from "../reducer/SeasonalContext";
import { hexToRgb } from "@/utils/general";

export default function GradientFill(
  {
    // displayGradient,
    // setDisplayGradient,
  }: {
    // displayGradient: boolean;
    // setDisplayGradient: React.Dispatch<React.SetStateAction<boolean>>;
  },
) {
  const { season, backgroundColor, editModeOpen } = useSingleSeasonContext();
  // const [colorSwitched, setColorSwitched] = React.useState(false);
  function getGradientLength() {
    if (season.startsWith("Summer")) {
      return "25%";
    } else {
      return "50%";
    }
  }
  const rgbColor = hexToRgb(backgroundColor);
  console.log("rgbColor is ", rgbColor);
  return (
    <div
      className="absolute inset-0 rounded-t-3xl"
      style={{
        backgroundImage: `${`linear-gradient(to bottom, rgba(${rgbColor}, 1)
         ${"7%"}, transparent ${getGradientLength()})`}`,
        zIndex: 10,
      }}
    ></div>
  );
}
