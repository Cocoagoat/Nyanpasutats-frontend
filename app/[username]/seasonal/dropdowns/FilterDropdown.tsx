import React, { useState } from "react";
import SettingsButton from "@/components/general/SettingsButton";
import { useCloseOnOutsideClick } from "@/hooks/useCloseOnOutsideClick";
import { DropdownType } from "@/app/interfaces";
import SortFilterOption from "./SortFilterOption";
import FilterByYear from "./FilterByYear";
import FilterByShowAmount from "./FilterByShowAmount";

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

  const ref = useCloseOnOutsideClick<HTMLDivElement>(isOpen, setIsOpen);
  console.log(extraStyles);
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
          className={`absolute left-0 w-24 rounded-md 
            py-2 shadow-md md:w-44 ${extraStyles}`}
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
          {type !== "Recs" && showAmountIsOpen && (
            <FilterByShowAmount type={type} />
          )}
        </div>
      )}
    </div>
  );
}
