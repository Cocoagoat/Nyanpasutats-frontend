import React from "react";
import AffBarNegativeHalf from "./AffBarNegativeHalf";
import AffBarPositiveHalf from "./AffBarPositiveHalf";

function AffBar({ affinity }: { affinity: number }) {
  const isPositive = affinity >= 0;
  const barWidthCoeff = Math.abs(affinity) / 100;

  return (
    // I tried to make a single half component and pass positive or negative as a prop
    // but the amount of conditions made it very hard to read so I decided against it.
    <div className="flex w-56 bg-black h-8">
      <AffBarNegativeHalf
        isPositive={isPositive}
        affinity={affinity}
        barWidthCoeff={barWidthCoeff}
      />

      <AffBarPositiveHalf
        isPositive={isPositive}
        affinity={affinity}
        barWidthCoeff={barWidthCoeff}
      />
    </div>
  );
}

export default AffBar;
