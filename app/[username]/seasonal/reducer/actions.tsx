import { displayedMeanOptions } from "@/app/interfaces";

type StatsSortingOptions =
  | "Season"
  | "AvgScore"
  | "FavoritesAvgScore"
  | "Shows";

type ChartSortingOptions = "season" | "avgScore";

type SortAction = {
  type: "SORT";
  payload: { by: StatsSortingOptions | ChartSortingOptions };
};

type FilterByYearAction = {
  type: "FILTER_BY_YEAR";
  payload: { startYear: number; endYear: number };
};

type FilterByShowCountAction = {
  type: "FILTER_BY_SHOW_COUNT";
  payload: { minShows: number; maxShows: number };
};

type FilterByNameAction = {
  type: "FILTER_BY_SEASON_NAME";
  payload: { text: string };
};

type ResetFilterAction = {
  type: "RESET_FILTER";
};

type ChangeMeanAction = {
  type: "CHANGE_DISPLAYED_MEAN";
  payload: displayedMeanOptions;
};

type ToggleSequelsAction = {
  type: "TOGGLE_SEQUELS";
  payload: "Remove" | "Include";
};

export type Action =
  | SortAction
  | FilterByYearAction
  | FilterByShowCountAction
  | FilterByNameAction
  | ChangeMeanAction
  | ResetFilterAction
  | ToggleSequelsAction;
