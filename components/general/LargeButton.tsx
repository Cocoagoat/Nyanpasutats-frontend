import React, { MouseEventHandler } from "react";

export default function LargeButton({
  children,
  onClick,
  onKeyDown,
  fill,
  extraStyles,
}: {
  children: any;
  onClick: MouseEventHandler<HTMLButtonElement>;
  onKeyDown?: (e: React.KeyboardEvent<HTMLButtonElement>) => void;
  fill?: boolean;
  extraStyles?: string;
}) {
  return (
    <button
      onClick={onClick}
      onKeyDown={onKeyDown}
      className={` ${
        fill ? "" : ""
      }   col-span-2 col-start-2 mx-auto max-w-1/2 self-center 
      rounded-md border border-zinc-600  px-4 py-1.5 text-center 
      text-white transition-colors duration-200 hover:bg-lime-600 ${extraStyles}`}
    >
      {children}
    </button>
  );
}
