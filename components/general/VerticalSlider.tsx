import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { RiSunFill } from "react-icons/ri";
import HoverPopup from "./HoverPopup";

export default function VerticalSlider({
  value,
  onChange,
  min,
  max,
  step,
}: {
  value: number;
  onChange: (event: Event, newValue: number | number[]) => void;
  min: number;
  max: number;
  step?: number;
}) {
  function preventHorizontalKeyboardNavigation(event: React.KeyboardEvent) {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
    }
  }

  const [textBoxOpen, setTextBoxOpen] = React.useState(false);

  return (
    <Box sx={{ height: 300 }} className="absolute flex z-50 flex-col ml-4">
      <Slider
        sx={{
          "& .MuiSlider-thumb": {
            color: "#74ceff", // Thumb color
          },
          "& .MuiSlider-track": {
            color: "#74ceff", // Track color
          },
          "& .MuiSlider-rail": {
            color: "#74ceff", // Rail color
          },
          "& .MuiSlider-valueLabel": {
            left: "calc(-50% + 6px)",
          },
          '& input[type="range"]': {
            WebkitAppearance: "slider-vertical",
          },
        }}
        orientation="vertical"
        min={min}
        max={max}
        step={step ? step : 1}
        value={value}
        aria-label="Temperature"
        valueLabelDisplay="auto"
        onChange={onChange}
        onKeyDown={preventHorizontalKeyboardNavigation}
      />
      <RiSunFill
        onMouseEnter={() => setTextBoxOpen(true)}
        onMouseLeave={() => setTextBoxOpen(false)}
        className="mt-3 ml-[5px] text-center text-xl text-white"
      ></RiSunFill>
      <HoverPopup
        hovered={textBoxOpen}
        setHovered={setTextBoxOpen}
        text="Adjust the brightness of the expanded cards"
      />
      {/* {textBoxOpen && (
        <div
          className=" bg-zinc-600 text-white text-center text-xs p-2 rounded-3xl absolute bottom-0 -right-6"
          onMouseEnter={() => setTextBoxOpen(true)}
          onMouseLeave={() => setTextBoxOpen(false)}
        >
          Adjust the brightness of the expanded cards
        </div>
      )} */}
    </Box>
  );
}
