import React from "react";

export default function TierListRating({
  color,
  score,
}: {
  color: string;
  score: string;
}) {
  return (
    <div
      className="relative z-[60] h-[88px] w-20 border-r-2 border-black"
      style={{
        backgroundColor: color,
      }}
    >
      <p className=" absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white shadow-black text-shadow">
        {score}/10
      </p>
    </div>
  );
}
