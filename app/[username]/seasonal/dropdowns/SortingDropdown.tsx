import {
  SeasonalContext,
  SeasonalDispatchContext,
} from "@/app/[username]/seasonal/reducer/SeasonalContext";
import { Action } from "@/app/[username]/seasonal/reducer/actions";

import React, { useContext, useState } from "react";
import { useHandlers } from "../reducer/useHandlers";
import SettingsButton from "@/components/general/SettingsButton";
import { useCloseOnOutsideClick } from "@/hooks/useCloseOnOutsideClick";
import { DropdownType } from "@/app/interfaces";
import SortFilterOption from "./SortFilterOption";

function SortingDropdown({
  type,
  graphDispatch,
  graphSortedBy,
  graphSortedReverse,
}: {
  type: DropdownType;
  graphDispatch?: React.Dispatch<Action>;
  graphSortedBy?: string;
  graphSortedReverse?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);

  const dispatch = useContext(SeasonalDispatchContext)!;

  const dispatchToUse =
    type === "Full" || !graphDispatch ? dispatch : graphDispatch;

  const {
    handleSortByMean,
    handleSortBySeason,
    handleSortByShowCount,
    handleSortByFavMean,
    handleSortByShows,
  } = useHandlers(dispatchToUse);

  const { sortedBy, sortedReverse } = useContext(SeasonalContext)!;

  const sortedByToUse = graphSortedBy ? graphSortedBy : sortedBy;
  const sortedReverseToUse = graphSortedReverse
    ? graphSortedReverse
    : sortedReverse;

  console.log("sortedByToUse", sortedByToUse);
  console.log("sortedReverseToUse", sortedReverseToUse);

  const ref = useCloseOnOutsideClick<HTMLDivElement>(isOpen, setIsOpen);

  return (
    <div ref={ref} className="relative">
      <SettingsButton onClick={toggleDropdown}>Sorting Options</SettingsButton>
      {isOpen && (
        <div
          className="absolute left-0 w-24 rounded-md bg-zinc-700 py-2
           shadow-md md:w-44 "
        >
          <SortFilterOption
            statName="Season"
            onClick={handleSortBySeason}
            sortedBy={sortedByToUse}
            sortedReverse={sortedReverseToUse}
          />
          <SortFilterOption
            statName="Mean Score"
            onClick={handleSortByMean}
            sortedBy={sortedByToUse}
            sortedReverse={sortedReverseToUse}
          />
          <SortFilterOption
            statName="Mean Score (Top 10)"
            onClick={handleSortByFavMean}
            sortedBy={sortedByToUse}
            sortedReverse={sortedReverseToUse}
          />
          <SortFilterOption
            statName="Shows Watched"
            onClick={
              type === "Graph" ? handleSortByShows : handleSortByShowCount
            }
            sortedBy={sortedByToUse}
            sortedReverse={sortedReverseToUse}
          />
        </div>
      )}
    </div>
  );
}

export default SortingDropdown;
