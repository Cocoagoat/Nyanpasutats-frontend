import React from "react";

export default function AffBarNegativeHalf({
  affinity,
  isPositive,
  barWidthCoeff,
}: {
  affinity: number;
  isPositive: boolean;
  barWidthCoeff: number;
}) {
  return (
    <div className="relative flex w-28 items-center justify-end bg-green-MAL-outer text-right">
      <span
        style={{
          width: `${!isPositive ? (barWidthCoeff * 112).toFixed(0) : 0}px`,
        }}
        className="absolute h-full bg-green-MAL-inner text-left "
      ></span>
      <p
        className={`z-10 mr-2 ${
          !isPositive ? "font-semibold" : "font-extralight"
        } `}
      >
        {!isPositive ? affinity : 0}%
      </p>
    </div>
  );
}
