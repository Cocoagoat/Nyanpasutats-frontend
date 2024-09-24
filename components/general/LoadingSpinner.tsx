import React from "react";
import LoadingSpinnerSVG from "./LoadingSpinnerSVG";

function RegularLoadingSpinner({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`flex h-full w-full items-center justify-center`}>
      {children}
    </div>
  );
}

function AbsoluteLoadingSpinner({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}>
      {children}
    </div>
  );
}

export default function LoadingSpinner({
  width,
  height,
  backgroundColor,
  absolute,
}: {
  width?: number;
  height?: number;
  backgroundColor?: string;
  absolute?: boolean;
}) {
    let LoadingSpinnerContainer = absolute ? AbsoluteLoadingSpinner : RegularLoadingSpinner;
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
