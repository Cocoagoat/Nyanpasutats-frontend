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
    <Box sx={{ height: 300 }} className="absolute z-50 ml-4 flex flex-col">
      <Slider
        sx={{
          "& .MuiSlider-thumb": {
            color: "#65A30D",
          },
          "& .MuiSlider-track": {
            color: "#65A30D",
          },
          "& .MuiSlider-rail": {
            color: "#65A30D",
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
        className="ml-[5px] mt-3 text-center text-xl text-white"
      ></RiSunFill>
      <HoverPopup
        hovered={textBoxOpen}
        setHovered={setTextBoxOpen}
        text="Adjust the brightness of the expanded cards"
      />
    </Box>
  );
}
