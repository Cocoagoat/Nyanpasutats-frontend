import React from "react";
import AffBarNegativeHalf from "./AffBarNegativeHalf";
import AffBarPositiveHalf from "./AffBarPositiveHalf";

function AffBar({ affinity }: { affinity: number }) {
  const isPositive = affinity >= 0;
  const barWidthCoeff = Math.abs(affinity) / 100;

  return (
    <div className="flex h-8 w-56 bg-black">
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
