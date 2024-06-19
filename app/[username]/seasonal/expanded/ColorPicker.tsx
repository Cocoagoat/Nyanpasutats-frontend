import React, { useState } from "react";
import { ChromePicker, ColorResult } from "react-color";

function ColorPickerComponent({
  color,
  setColor,
}: {
  color: string;
  setColor: React.Dispatch<React.SetStateAction<string>>;
}) {
  //   const [color, setColor] = useState("#888888");

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

export default ColorPickerComponent;
