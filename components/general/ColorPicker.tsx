import React from "react";
import { ChromePicker, ColorResult } from "react-color";

function ColorPicker({
  color,
  setColor,
}: {
  color: string;
  setColor:
    | React.Dispatch<React.SetStateAction<string>>
    | ((color: string) => void);
}) {
  const handleChangeComplete = (color: ColorResult) => {
    setColor(color.hex);
  };

  return (
    <div className="flex">
      <ChromePicker color={color} onChangeComplete={handleChangeComplete} />
      <div
        style={{
          marginRight: "20px",
          width: "100px",
          height: "100px",
          backgroundColor: color,
        }}
      ></div>
    </div>
  );
}

export default ColorPicker;
