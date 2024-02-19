import SettingsButton from "@/components/general/SettingsButton";
import { useCloseOnOutsideClick } from "@/hooks/useCloseOnOutsideClick";
import React, { useState } from "react";
import { useHandlers } from "../reducer/useHandlers";
import LargeButton from "../../../../components/general/LargeButton";
import { SeasonalDispatchContext } from "../reducer/SeasonalContext";

export default function SearchSeason() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  const ref = useCloseOnOutsideClick<HTMLDivElement>(isOpen, setIsOpen);

  const dispatch = React.useContext(SeasonalDispatchContext)!;

  const { handleResetFilter, handleFilterByName } = useHandlers(
    dispatch,
    "seasonal",
  );

  return (
    <div ref={ref} className="relative">
      <SettingsButton onClick={() => setIsOpen(!isOpen)}>Search</SettingsButton>
      {isOpen && (
        <div className="absolute left-0 z-50 mt-2 rounded-lg bg-zinc-700 p-4 shadow-lg">
          <div className="flex flex-col space-y-4">
            <input
              type="text"
              placeholder="Search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="border border-zinc-600 bg-zinc-700 text-white focus:border-sky-550"
            />
            <LargeButton onClick={() => handleFilterByName(searchText)}>
              Apply
            </LargeButton>
            <LargeButton onClick={handleResetFilter}>Reset</LargeButton>
          </div>
        </div>
      )}
    </div>
  );
}
