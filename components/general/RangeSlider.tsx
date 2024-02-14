import React, { useState } from "react";
import "./RangeSliderStyles.css";

export function RangeSlider({ min, max }: { min: number; max: number }) {
  const [value, setValue] = useState((min + max) / 2);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(Number(event.target.value));
  }

  return (
    <div className="range-slide">
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={handleChange}
        className="vertical-slider"
      />
      <p>Value: {value}</p>
    </div>
  );
}

export default RangeSlider;
