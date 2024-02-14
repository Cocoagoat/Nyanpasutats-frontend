import React from "react";

export default function AffBarPositiveHalf({
  affinity,
  isPositive,
  barWidthCoeff,
}: {
  affinity: number;
  isPositive: boolean;
  barWidthCoeff: number;
}) {
  return (
    <div className="text-left relative justify-start flex items-center bg-orange-MAL-outer w-28">
      <span
        style={{
          width: `${isPositive ? (barWidthCoeff * 112).toFixed(0) : 0}px`,
        }}
        className="bg-orange-MAL-inner absolute text-left h-full "
      ></span>
      <p
        className={`ml-2 z-10 ${
          isPositive ? "font-semibold" : "font-extralight"
        }`}
      >
        {isPositive ? affinity : 0}%
      </p>
    </div>
  );
}
