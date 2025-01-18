import React from "react";
import LoadingPadoru from "./LoadingPadoru";
import LoadingSpinner from "./LoadingSpinner";

export default function Loading({
  width,
  height,
  backgroundColor,
  spinnerType,
}: {
  width?: number;
  height?: number;
  backgroundColor?: string;
  spinnerType?: "Absolute" | "Flex" | "Regular";
}) {
  const currentMonth = new Date().getMonth();
  return currentMonth === 11 ? (
    <LoadingPadoru width={width} />
  ) : (
    <LoadingSpinner
      width={width}
      height={height}
      backgroundColor={backgroundColor}
      spinnerType={spinnerType}
    />
  );
}
