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
  const { handleToggleSequels } = useHandlers(dispatch);

  return (
    <div className="sticky z-30 top-0">
      <div className="mb-12 w-full z-30 pt-8 flex flex-wrap gap-12 pb-8 border-b-2 border-zinc-600 bg-zinc-800 justify-center">
        <SortingDropdown type="Full" />
        <FilterDropdown type="Full" />
        <SearchSeason />
        <SeasonalGraphDropdown setGraphOpen={setGraphOpen} />
        <SettingsButton
          onClick={() => {
            handleToggleSequels(noSequels);
          }}
          fill={noSequels}
        >
          {noSequels ? "Include Sequels" : "Exclude Sequels"}
        </SettingsButton>
      </div>
    </div>
  );
}
