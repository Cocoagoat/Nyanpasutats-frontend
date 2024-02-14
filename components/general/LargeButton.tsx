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
      }  ${extraStyles} py-1.5 px-4 text-center mx-auto col-start-2 col-span-2 max-w-1/2 border border-zinc-600 text-white self-center transition-colors duration-200 hover:bg-sky-550 rounded-md`}
    >
      {children}
    </button>
  );
}
