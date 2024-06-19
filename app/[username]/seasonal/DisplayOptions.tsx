import React, { useContext } from "react";
import SortingDropdown from "./dropdowns/SortingDropdown";
import FilterDropdown from "./dropdowns/FilterDropdown";
import SearchSeason from "./dropdowns/SearchSeason";
import SeasonalGraphDropdown from "./dropdowns/SeasonalGraphDropdown";
import SettingsButton from "@/components/general/SettingsButton";
import { useHandlers } from "./reducer/useHandlers";
import {
  SeasonalContext,
  SeasonalDispatchContext,
} from "./reducer/SeasonalContext";

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
        <SeasonalGraphDropdown setGraphOpen={setGraphOpen} />
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
