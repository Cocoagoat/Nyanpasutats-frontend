import React from "react";

export default function HoverPopup({
  hovered,
  setHovered,
  text,
  backgroundColor,
}: {
  hovered: boolean;
  setHovered: React.Dispatch<React.SetStateAction<boolean>>;
  text: string;
  backgroundColor?: string;
}) {
  return (
    hovered && (
      <div
        className=" text-shadow-xs absolute left-1/2 top-1/2 z-30 min-w-[64px]
         -translate-x-1/2 -translate-y-1/2 rounded-3xl p-2.5 text-center text-xs text-white shadow-black"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ backgroundColor: backgroundColor ?? "#65A30D" }}
      >
        {text}
      </div>
    )
  );
}
