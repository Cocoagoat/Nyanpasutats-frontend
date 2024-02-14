import React from "react";

export default function AffBarNegativeHalf({
  isPositive,
  affinity,
  barWidthCoeff,
}: {
  isPositive: boolean;
  affinity: number;
  barWidthCoeff: number;
}) {
  return (
    <div className="text-right relative justify-end flex items-center bg-green-MAL-outer w-28">
      <span
        style={{
          width: `${!isPositive ? (barWidthCoeff * 112).toFixed(0) : 0}px`,
        }}
        className="bg-green-MAL-inner absolute text-left h-full "
      ></span>
      <p
        className={`mr-2 z-10 ${
          !isPositive ? "font-semibold" : "font-extralight"
        } `}
      >
        {!isPositive ? affinity : 0}%
      </p>
    </div>
  );
}
