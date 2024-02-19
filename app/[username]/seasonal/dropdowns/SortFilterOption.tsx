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
      className={`mb-1 cursor-pointer py-1 text-center
       text-xs text-white transition-colors duration-200  
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
