import React from "react";

export default function HoverPopup({
  hovered,
  setHovered,
  text,
}: {
  hovered: boolean;
  setHovered: React.Dispatch<React.SetStateAction<boolean>>;
  text: string;
}) {
  return (
    hovered && (
      <div
        className=" bg-zinc-600 text-white text-center min-w-[64px] text-xs p-2 z-50 rounded-3xl absolute -bottom-0"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {text}
      </div>
    )
  );
}
