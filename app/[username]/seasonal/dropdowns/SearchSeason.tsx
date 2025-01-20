import SettingsButton from "@/components/general/SettingsButton";
import { useCloseOnOutsideClick } from "@/hooks/useCloseOnOutsideClick";
import React, { useState } from "react";
import { useHandlers } from "../reducer/useHandlers";
import LargeButton from "../../../../components/general/LargeButton";
import { SeasonalDispatchContext } from "../reducer/SeasonalContext";

export default function SearchSeason() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  const ref = useCloseOnOutsideClick<HTMLDivElement>(isOpen, () =>
    setIsOpen(false),
  );

  const dispatch = React.useContext(SeasonalDispatchContext)!;

  const { handleResetFilter, handleFilterByName } = useHandlers(
    dispatch,
    "seasonal",
  );

  return (
    <div ref={ref} className="relative">
      <SettingsButton onClick={() => setIsOpen(!isOpen)}>Search</SettingsButton>
      {isOpen && (
        <div className="absolute left-0 z-50 mt-2 rounded-lg bg-blue-970 p-4 shadow-lg">
          <div className="flex flex-col space-y-4">
            <input
              type="text"
              placeholder="Search"
              value={searchText}
              maxLength={11}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleFilterByName(searchText);
                }
              }}
              onChange={(e) => setSearchText(e.target.value)}
              className=" border-none outline-none focus:outline-none
               bg-zinc-700 text-white p-1 focus:ring-2 focus:ring-lime-600"
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
