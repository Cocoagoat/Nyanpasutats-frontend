import React, { useContext } from "react";
import { SeasonalContext } from "../reducer/SeasonalContext";
import {
  SeasonDataKeys,
  statKeysToNames,
  statNamesToKeys,
} from "@/app/interfaces";

export default function SortFilterOption({
  onClick,
  statName,
  sortedBy,
  onMouseEnter,
  onMouseLeave,
  sortedReverse,
}: {
  onClick: any;
  statName: string;
  sortedBy?: string;
  onMouseEnter?: any;
  onMouseLeave?: any;
  sortedReverse?: boolean;
}) {
  return (
    <div
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className=" mb-1 cursor-pointer py-1 text-center text-xs text-white transition-colors duration-200  
    hover:bg-sky-550  md:text-sm"
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
