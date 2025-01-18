import React from "react";
import LoadingSpinnerSVG from "./LoadingSpinnerSVG";

function FlexLoadingSpinner({ children }: { children: React.ReactNode }) {
  return (
    <div className={`flex h-full w-full items-center justify-center`}>
      {children}
    </div>
  );
}

function AbsoluteLoadingSpinner({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2`}
    >
      {children}
    </div>
  );
}

function RegularLoadingSpinner({ children }: { children: React.ReactNode }) {
  return <div className="m-1">{children}</div>;
}

export default function LoadingSpinner({
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
  let LoadingSpinnerContainer =
    spinnerType == "Absolute"
      ? AbsoluteLoadingSpinner
      : spinnerType == "Regular"
        ? RegularLoadingSpinner
        : FlexLoadingSpinner;
  return (
    <LoadingSpinnerContainer>
      <LoadingSpinnerSVG
        width={width}
        height={height}
        backgroundColor={backgroundColor}
      />
    </LoadingSpinnerContainer>
  );
}
