import React, { useState } from "react";
import { SeasonalDispatchContext } from "../reducer/SeasonalContext";
import SettingsButton from "@/components/general/SettingsButton";
import { useCloseOnOutsideClick } from "@/hooks/useCloseOnOutsideClick";
import { useHandlers } from "../reducer/useHandlers";
import { DropdownType } from "@/app/interfaces";
import { Action } from "../reducer/actions";
import SortFilterOption from "./SortFilterOption";
import FilterByYear from "./FilterByYear";
import FilterByShowAmount from "./FilterByShowAmount";

export default function FilterDropdown({
  type,
  customDispatch,
}: {
  type: DropdownType;
  customDispatch?: React.Dispatch<any>;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [yearRangeIsOpen, setYearRangeIsOpen] = useState(false);
  const [showAmountIsOpen, setShowAmountIsOpen] = useState(false);
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");

  const dispatch = React.useContext(SeasonalDispatchContext)!;

  const dispatchToUse =
    type === "Full" || !customDispatch ? dispatch : customDispatch;
  // let { handleFilterByYear, handleResetFilter } = useHandlers(
  //   dispatchToUse,
  //   "seasonal",
  // );

  const ref = useCloseOnOutsideClick<HTMLDivElement>(isOpen, setIsOpen);

  return (
    <div ref={ref} className="relative">
      <SettingsButton onClick={() => setIsOpen(!isOpen)}>
        Filter Options
      </SettingsButton>

      {isOpen && (
        // <div className="absolute left-0 z-50 mt-2 rounded-lg bg-zinc-700 p-4 shadow-lg">
        <div
          className="absolute left-0 w-24 rounded-md bg-zinc-700 py-2
           shadow-md md:w-44"
          onMouseLeave={() => {
            setYearRangeIsOpen(false);
            setShowAmountIsOpen(false);
          }}
        >
          <SortFilterOption
            statName="Year Range"
            onClick={() => setYearRangeIsOpen(!yearRangeIsOpen)}
          />
          {type !== "Recs" && (
            <SortFilterOption
              statName="Show Amount"
              onClick={() => setShowAmountIsOpen(!showAmountIsOpen)}
            />
          )}
          {yearRangeIsOpen && (
            <FilterByYear type={type} customDispatch={customDispatch} />
          )}
          {showAmountIsOpen && type !== "Recs" && (
            <FilterByShowAmount type={type} />
          )}
        </div>
        // </div>
      )}
    </div>
  );
}
