import React from "react";

export default function ImageCarouselButton({
  type,
  animating,
  onClick,
  setOnHover,
}: {
  type: "previous" | "next";
  animating: boolean;
  onClick: () => void;
  setOnHover: (hovered: boolean) => void;
}) {
  return (
    <button
      disabled={animating}
      onClick={onClick}
      onMouseEnter={() => setOnHover(true)}
      onMouseLeave={() => setOnHover(false)}
      className={`bg-blue-990 absolute ${type === "previous" ? "left-0" : "right-0"} top-1/2 z-10 -translate-y-1/2
       rounded-full p-2 text-white opacity-80`}
    >
      {type === "previous" ? "<" : ">"}
    </button>
  );
}
