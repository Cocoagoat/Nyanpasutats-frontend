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
  graphDispatch,
}: {
  type: DropdownType;
  graphDispatch?: React.Dispatch<Action>;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [yearRangeIsOpen, setYearRangeIsOpen] = useState(false);
  const [showAmountIsOpen, setShowAmountIsOpen] = useState(false);
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");

  const dispatch = React.useContext(SeasonalDispatchContext)!;

  const dispatchToUse =
    type === "Full" || !graphDispatch ? dispatch : graphDispatch;
  let { handleFilterByYear, handleResetFilter } = useHandlers(dispatchToUse);

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
            // onMouseEnter={() => setYearRangeIsOpen(true)}
          />
          <SortFilterOption
            statName="Show Amount"
            onClick={() => setShowAmountIsOpen(!showAmountIsOpen)}
          />
          {yearRangeIsOpen && <FilterByYear type={type} />}
          {showAmountIsOpen && <FilterByShowAmount type={type} />}
          {/* <input
              type="number"
              placeholder="Start Year"
              value={startYear}
              onChange={(e) => setStartYear(e.target.value)}
              className="border border-zinc-600 bg-zinc-700 text-white focus:border-sky-550"
            />
            <input
              type="number"
              placeholder="End Year"
              value={endYear}
              onChange={(e) => setEndYear(e.target.value)}
              className="border border-zinc-600 bg-zinc-700 text-white focus:border-sky-550"
            />
            <div className="flex justify-center gap-10">
              <button
                onClick={() =>
                  handleFilterByYear(
                    Number(startYear),
                    Number(endYear),
                    setIsOpen,
                  )
                }
                className=" w-1/3 self-center rounded-md border border-zinc-600 p-1 text-white transition-colors duration-200 hover:bg-sky-550"
              >
                Apply
              </button>
              <button
                onClick={handleResetFilter}
                className=" w-1/3 self-center rounded-md border border-zinc-600 p-1 text-white transition-colors duration-200 hover:bg-sky-550"
              >
                Reset
              </button>
            </div> */}
        </div>
        // </div>
      )}
    </div>
  );
}
