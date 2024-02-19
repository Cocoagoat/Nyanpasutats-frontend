import React, { MouseEventHandler } from "react";

export default function LargeButton({
  children,
  onClick,
  fill,
  extraStyles,
}: {
  children: any;
  onClick: MouseEventHandler<HTMLButtonElement>;
  fill?: boolean;
  extraStyles?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={` ${
        fill ? "" : ""
      }   col-span-2 col-start-2 mx-auto max-w-1/2 self-center 
      rounded-md border border-zinc-600 px-4 py-1.5 text-center 
      text-white transition-colors duration-200 hover:bg-sky-550 ${extraStyles}`}
    >
      {children}
    </button>
  );
}
