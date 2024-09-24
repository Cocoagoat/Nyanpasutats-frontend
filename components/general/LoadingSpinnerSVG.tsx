import React from "react";

export default function LoadingSpinnerSVG({
  width,
  height,
  backgroundColor,
}: {
  width?: number;
  height?: number;
  backgroundColor?: string;
}) {
  return (
    <svg
      className={`my-auto animate-spin place-self-center self-center text-center
           text-lime-600`}
      width={width ?? height ?? 150}
      height={height ?? width ?? 150}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-50"
        cx="12"
        cy="12"
        r="10"
        stroke="#222"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-100"
        fill={backgroundColor ?? "#65A30D"}
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      ></path>
    </svg>
  );
}
