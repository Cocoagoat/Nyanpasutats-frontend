import SettingsButton from "@/components/general/SettingsButton";
import React, { useContext } from "react";
import FilterDropdown from "./dropdowns/FilterDropdown";
import SearchSeason from "./dropdowns/SearchSeason";
import SortingDropdown from "./dropdowns/SortingDropdown";
import {
  SeasonalContext,
  SeasonalDispatchContext,
} from "./reducer/SeasonalContext";
import { useHandlers } from "./reducer/useHandlers";

export default function DisplayOptions({
  setGraphOpen,
}: {
  setGraphOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const dispatch = useContext(SeasonalDispatchContext)!;
  const { noSequels } = useContext(SeasonalContext)!;
  const { handleToggleSequels } = useHandlers(dispatch, "seasonal");

  return (
    <div className="sticky -top-1 z-30">
      <div
        className="z-30 mb-12 flex w-full flex-wrap justify-center gap-12
         bg-blue-990 pb-8 pt-8"
      >
        <SortingDropdown type="Full" />
        <FilterDropdown type="Full" />
        <SearchSeason />
        <SettingsButton onClick={() => setGraphOpen(true)}>
          Graph
        </SettingsButton>
        <SettingsButton
          onClick={() => {
            handleToggleSequels(noSequels);
          }}
        >
          {noSequels ? "Include Sequels" : "Exclude Sequels"}
        </SettingsButton>
      </div>
    </div>
  );
}
