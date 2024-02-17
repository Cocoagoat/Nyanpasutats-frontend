import React from "react";

export default function SettingsButton({
  onClick,
  children,
  border,
}: {
  onClick: () => void;
  children: string;
  border?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`${
        border ? "border border-sky-550 " : ""
      } bg-blue-990 box-border h-12 w-24 rounded-md text-xs text-white transition-colors duration-200 hover:bg-sky-550 sm:w-36 sm:text-sm`}
    >
      {children}
    </button>
  );
}
