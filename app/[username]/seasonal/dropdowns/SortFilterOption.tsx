import React from "react";
import { statNamesToKeys } from "@/app/interfaces";

export default function SortFilterOption({
  onClick,
  statName,
  sortedBy,
  onMouseEnter,
  onMouseLeave,
  sortedReverse,
  extraStyles,
}: {
  onClick: any;
  statName: string;
  sortedBy?: string;
  onMouseEnter?: any;
  onMouseLeave?: any;
  sortedReverse?: boolean;
  extraStyles?: string;
}) {
  return (
    <div
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`cursor-pointer rounded-lg bg-blue-970 py-2
       text-center text-xs text-white hover:bg-lime-600 
     md:text-sm ${extraStyles}`}
    >
      {statName}
      {sortedBy &&
        sortedBy ===
          statNamesToKeys[statName as keyof typeof statNamesToKeys] && (
          <p className="inline text-xs">{` ${sortedReverse ? "▲" : "▼"}`}</p>
        )}
    </div>
  );
}
