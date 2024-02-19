import SettingsButton from "@/components/general/SettingsButton";
import React from "react";
import styles from "./DisplayOptions.module.css";
import { SORT_BY_PREDICTION_SCORE } from "./RecReducer";
import TooltipQuestionMark from "@/components/general/TooltipQuestionMark";
import { tooltipsContent } from "@/utils/TooltipsContent";
import FilterDropdown from "../seasonal/dropdowns/FilterDropdown";
import { useHandlers } from "../seasonal/reducer/useHandlers";

export default function DisplayOptions({
  sortedBy,
  noWatchedOnly,
  dispatch,
}: {
  sortedBy: string;
  noWatchedOnly: boolean;
  dispatch: React.Dispatch<any>;
}) {
  const { handleToggleSort, handleToggleWatched } = useHandlers(
    dispatch,
    "recs",
  );
  return (
    <div className=" mb-4 flex w-full justify-between">
      <SettingsButton
        extraStyles={`${styles.modifiedButton}`}
        onClick={() => {
          console.log("Before handle");
          sortedBy === SORT_BY_PREDICTION_SCORE
            ? handleToggleSort("SORT_BY_SCORE_DIFFERENCE")
            : handleToggleSort("SORT_BY_PREDICTION_SCORE");
          console.log("After handle");
        }}
      >
        {sortedBy === SORT_BY_PREDICTION_SCORE
          ? "Sort by Score Difference"
          : "Sort by Predicted Score"}
      </SettingsButton>
      <div className="absolute right-0 top-0 z-50">
        <TooltipQuestionMark text={tooltipsContent["Recommendation Sort"]} />
      </div>

      <FilterDropdown
        type="Recs"
        customDispatch={dispatch}
        extraStyles={`${styles.modifiedButton}`}
      />
      <SettingsButton
        extraStyles={`${styles.modifiedButton}`}
        onClick={handleToggleWatched}
      >
        {noWatchedOnly ? "Add Watched Shows" : "Remove Watched Shows"}
      </SettingsButton>
    </div>
  );
}
