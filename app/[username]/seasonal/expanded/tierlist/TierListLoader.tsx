import Padoru from "@/components/general/Padoru";
import React from "react";

export default function TierListLoader({
  width,
  height,
  maxRowSize,
}: {
  width: number;
  height: number;
  maxRowSize: number;
}) {
  return (
    <div
      className={`fixed left-1/2 top-1/2 z-[5000]   
            -translate-x-1/2 -translate-y-1/2  bg-zinc-800`}
      style={{
        height: `max(500px, ${height - 50}px)`,
        width:
          width > 1000 ? `max(1000px, ${maxRowSize * 65 + 100}px)` : "100%",
      }}
    >
      <Padoru />
    </div>
  );
}
