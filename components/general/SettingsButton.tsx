import React from "react";

export default function SettingsButton({
  onClick,
  children,
  border,
  extraStyles,
}: {
  onClick: () => void;
  children: string;
  border?: boolean;
  extraStyles?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`${
        border ? "border border-sky-550 " : ""
      }  bg-blue-970 h-12 w-24 rounded-md text-xs
       text-white transition-colors duration-200 hover:bg-lime-600
        sm:w-36 sm:text-sm ${extraStyles}`}
    >
      {children}
    </button>
  );
}
