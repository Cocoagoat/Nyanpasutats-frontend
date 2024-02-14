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

  const { handleResetFilter, handleFilterByName } = useHandlers(dispatch);

  return (
    <div ref={ref} className="relative">
      <SettingsButton onClick={() => setIsOpen(!isOpen)}>Search</SettingsButton>
      {isOpen && (
        <div className="absolute left-0 mt-2 bg-zinc-700 shadow-lg rounded-lg p-4 z-50">
          <div className="flex flex-col space-y-4">
            <input
              type="text"
              placeholder="Search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="bg-zinc-700 border border-zinc-600 text-white focus:border-sky-550"
            />
            {/* <button
              onClick={() => handleFilterByName(searchText)}
              className="w-1/3 p-1 border border-zinc-600 text-white self-center transition-colors duration-200 hover:bg-sky-550 rounded-md"
            >
              Apply
            </button> */}
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
