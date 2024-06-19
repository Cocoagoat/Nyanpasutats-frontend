import React, { useState } from "react";
import SettingsButton from "@/components/general/SettingsButton";
import { useCloseOnOutsideClick } from "@/hooks/useCloseOnOutsideClick";
import { DropdownType } from "@/app/interfaces";
import SortFilterOption from "./SortFilterOption";
import FilterByYear from "./FilterByYear";

export default function FilterDropdown({
  type,
  customDispatch,
  extraStyles,
}: {
  type: DropdownType;
  customDispatch?: React.Dispatch<any>;
  extraStyles?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [yearRangeIsOpen, setYearRangeIsOpen] = useState(false);
  const [showAmountIsOpen, setShowAmountIsOpen] = useState(false);
  const [MALScoreIsOpen, setMALScoreIsOpen] = useState(false);

  const ref = useCloseOnOutsideClick<HTMLDivElement>(isOpen, () => {
    setIsOpen(false);
    setYearRangeIsOpen(false);
    setShowAmountIsOpen(false);
    setMALScoreIsOpen(false);
  });
  // console.log(extraStyles);
  return (
    <div ref={ref} className="relative">
      <SettingsButton
        onClick={() => setIsOpen(!isOpen)}
        extraStyles={extraStyles}
      >
        Filter Options
      </SettingsButton>

      {isOpen && (
        <div
          className={` ${type === "Graph" ? "-top-20" : ""} absolute left-0 w-24 rounded-lg
            bg-blue-970 py-2 shadow-md md:w-44 ${extraStyles}`}
          // onMouseLeave={() => {
          //   setYearRangeIsOpen(false);
          //   setShowAmountIsOpen(false);
          // }}
        >
          <SortFilterOption
            statName="Year Range"
            onClick={() => {
              setYearRangeIsOpen(!yearRangeIsOpen);
              setShowAmountIsOpen(false);
              setMALScoreIsOpen(false);
            }}
          />
          {type !== "Recs" && (
            <SortFilterOption
              statName="Show Amount"
              onClick={() => {
                setShowAmountIsOpen(!showAmountIsOpen);
                setYearRangeIsOpen(false);
              }}
            />
          )}
          {type === "Recs" && (
            <SortFilterOption
              statName="MAL Score"
              onClick={() => setMALScoreIsOpen(!MALScoreIsOpen)}
            />
          )}

          {yearRangeIsOpen && (
            <FilterByYear
              type="Year"
              path={type === "Recs" ? "recs" : "seasonal"}
              dispatch={customDispatch}
            />
          )}
          {type !== "Recs" && showAmountIsOpen && (
            <FilterByYear
              type="ShowCount"
              path="seasonal"
              dispatch={customDispatch}
            />
          )}
          {type === "Recs" && MALScoreIsOpen && (
            <FilterByYear
              type="MALScore"
              path="recs"
              dispatch={customDispatch}
            />
          )}
        </div>
      )}
    </div>
  );
}
