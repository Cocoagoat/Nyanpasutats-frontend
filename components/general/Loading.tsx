import React from "react";
import LoadingPadoru from "./LoadingPadoru";
import LoadingSpinner from "./LoadingSpinner";

export default function Loading({
  width,
  height,
  absolute,
}: {
  width?: number;
  height?: number;
  absolute?: boolean;
}) {
  const currentMonth = new Date().getMonth();
  return currentMonth === 11 ? (
    <LoadingPadoru width={width} />
  ) : (
    <LoadingSpinner width={width} height={height} absolute={absolute} />
  );
}
