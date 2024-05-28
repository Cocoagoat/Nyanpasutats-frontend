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
        className=" absolute left-1/2 top-1/2 z-30 min-w-[64px] -translate-x-1/2
         -translate-y-1/2 rounded-3xl bg-lime-600 p-2.5 text-center text-xs text-white"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {text}
      </div>
    )
  );
}
