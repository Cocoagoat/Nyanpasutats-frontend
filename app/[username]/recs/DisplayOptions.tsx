import SettingsButton from "@/components/general/SettingsButton";
import React from "react";
import styles from "./DisplayOptions.module.css";
import { SORT_BY_PREDICTION_SCORE } from "./RecReducer";
import FilterDropdown from "../seasonal/dropdowns/FilterDropdown";
import { useHandlers } from "../seasonal/reducer/useHandlers";
import { MdArrowUpward } from "react-icons/md";

export default function DisplayOptions({
  sortedBy,
  noWatchedOnly,
  dispatch,
  welcomeOpen,
  setWelcomeOpen,
}: {
  sortedBy: string;
  noWatchedOnly: boolean;
  dispatch: React.Dispatch<any>;
  welcomeOpen?: boolean;
  setWelcomeOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { handleToggleSort, handleToggleWatched } = useHandlers(
    dispatch,
    "recs",
  );
  return (
    <div className=" relative mb-4 flex w-full justify-between">
      <SettingsButton
        extraStyles={`${styles.modifiedButton}`}
        onClick={() => {
          sortedBy === SORT_BY_PREDICTION_SCORE
            ? handleToggleSort("SORT_BY_SCORE_DIFFERENCE")
            : handleToggleSort("SORT_BY_PREDICTION_SCORE");
        }}
      >
        {sortedBy === SORT_BY_PREDICTION_SCORE
          ? "Sort by Score Difference"
          : "Sort by Predicted Score"}
      </SettingsButton>
      <div className="absolute right-0 top-0 z-50">
        {!welcomeOpen && (
          <MdArrowUpward
            className="h-7 w-7 cursor-pointer rounded-full bg-blue-970 p-1 text-xs hover:bg-lime-600"
            onClick={() => {
              if (setWelcomeOpen) {
                setWelcomeOpen(true);
              }
            }}
          />
        )}
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
