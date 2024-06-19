import {
  ChartDataKeys,
  UserPathType,
  RecommendationSortOptions,
} from "@/app/interfaces";
import {
  GENERATE_DISPLAYED_RECS,
  TOGGLE_SORT,
  TOGGLE_WATCHED,
} from "../../recs/RecReducer";

type SeasonalHandlers = {
  handleSortByMean: () => void;
  handleSortBySeason: () => void;
  handleSortByFavMean: () => void;
  handleSortByShowCount: () => void;
  handleChangeDisplayedStat: (stat: ChartDataKeys) => void;
  handleFilterByYear: (
    startYear: number,
    endYear: number,
    setDropdownState?: React.Dispatch<React.SetStateAction<boolean>>,
  ) => void;
  handleFilterByShowCount: (
    minShows: number,
    maxShows: number,
    setDropdownState?: React.Dispatch<React.SetStateAction<boolean>>,
  ) => void;
  handleFilterByName: (
    text: string,
    setDropdownState?: React.Dispatch<React.SetStateAction<boolean>>,
  ) => void;
  handleResetFilter: () => void;
  handleToggleSequels: (nonSequelsOnly: boolean) => void;
};

function createSeasonalHandlers(
  dispatch: React.Dispatch<any>,
): SeasonalHandlers {
  return {
    handleSortBySeason: () => {
      dispatch({ type: "SORT", payload: { by: "Season" } });
    },

    handleSortByMean: () => {
      dispatch({ type: "SORT", payload: { by: "AvgScore" } });
      dispatch({ type: "CHANGE_DISPLAYED_MEAN", payload: "AvgScore" });
    },

    handleSortByFavMean: () => {
      dispatch({ type: "SORT", payload: { by: "FavoritesAvgScore" } });
      dispatch({ type: "CHANGE_DISPLAYED_MEAN", payload: "FavoritesAvgScore" });
    },

    handleChangeDisplayedStat: (stat: ChartDataKeys) => {
      dispatch({ type: "CHANGE_DISPLAYED_MEAN", payload: stat });
    },

    handleSortByShowCount: () => {
      dispatch({ type: "SORT", payload: { by: "Shows" } });
      dispatch({ type: "RECALCULATE_OVERALL_RANK" });
    },

    handleFilterByYear: (
      startYear: number,
      endYear: number,
      setDropdownState?: React.Dispatch<React.SetStateAction<boolean>>,
    ) => {
      dispatch({
        type: "FILTER_BY_YEAR",
        payload: { startYear: startYear, endYear: endYear },
      });
      dispatch({ type: "RECALCULATE_OVERALL_RANK" });
      if (setDropdownState) {
        setDropdownState(false);
      }
    },

    handleFilterByShowCount: (
      minShows: number,
      maxShows: number,
      setDropdownState?: React.Dispatch<React.SetStateAction<boolean>>,
    ) => {
      dispatch({
        type: "FILTER_BY_SHOW_COUNT",
        payload: { minShows: minShows, maxShows: maxShows },
      });
      dispatch({ type: "RECALCULATE_OVERALL_RANK" });
      if (setDropdownState) {
        setDropdownState(false);
      }
    },

    handleFilterByName: (
      text: string,
      setDropdownState?: React.Dispatch<React.SetStateAction<boolean>>,
    ) => {
      dispatch({ type: "FILTER_BY_SEASON_NAME", payload: { text: text } });
      dispatch({ type: "RECALCULATE_OVERALL_RANK" });
      if (setDropdownState) {
        setDropdownState(false);
      }
    },

    handleResetFilter: () => {
      dispatch({ type: "RESET_FILTER" });
      dispatch({ type: "RECALCULATE_OVERALL_RANK" });
    },

    handleToggleSequels: (nonSequelsOnly: boolean) => {
      dispatch({
        type: "TOGGLE_SEQUELS",
        payload: nonSequelsOnly ? "Include" : "Remove",
      });
    },
  };
}

//------------------------------------------------//

type RecHandlers = {
  handleToggleSort: (sortBy: RecommendationSortOptions) => void;
  handleToggleWatched: () => void;
  handleFilterByYear: (
    startYear: number,
    endYear: number,
    setDropdownState?: React.Dispatch<React.SetStateAction<boolean>>,
  ) => void;
  handleResetFilter: () => void;
  handleFilterByMALScore: (min: number, max: number) => void;
};

function createRecHandlers(dispatch: React.Dispatch<any>): RecHandlers {
  return {
    handleToggleSort: (sortBy: RecommendationSortOptions) => {
      dispatch({ type: TOGGLE_SORT, payload: sortBy });
      dispatch({ type: GENERATE_DISPLAYED_RECS });
    },

    handleToggleWatched: () => {
      dispatch({ type: TOGGLE_WATCHED });
      dispatch({ type: GENERATE_DISPLAYED_RECS });
    },

    handleFilterByYear: (
      startYear: number,
      endYear: number,
      setDropdownState?: React.Dispatch<React.SetStateAction<boolean>>,
    ) => {
      dispatch({
        type: "FILTER_BY_YEAR",
        payload: { startYear: startYear, endYear: endYear },
      });
      dispatch({ type: GENERATE_DISPLAYED_RECS });
      if (setDropdownState) {
        setDropdownState(false);
      }
    },
    handleResetFilter: () => {
      dispatch({ type: "RESET_FILTER" });
      dispatch({ type: GENERATE_DISPLAYED_RECS });
    },

    handleFilterByMALScore: (min: number, max: number) => {
      dispatch({
        type: "FILTER_BY_MAL_SCORE",
        payload: { min: min, max: max },
      });
      dispatch({ type: GENERATE_DISPLAYED_RECS });
    },
  };
}

//overloading because typescript asdkjfhasdjkf its 3am help
export function useHandlers(
  dispatch: React.Dispatch<any>,
  path: "seasonal",
): SeasonalHandlers;
export function useHandlers(
  dispatch: React.Dispatch<any>,
  path: "recs",
): RecHandlers;
export function useHandlers(
  dispatch: React.Dispatch<any>,
  path: UserPathType,
): SeasonalHandlers | RecHandlers;

export function useHandlers(
  dispatch: React.Dispatch<any>,
  path: UserPathType,
): SeasonalHandlers | RecHandlers {
  switch (path) {
    case "seasonal":
      return createSeasonalHandlers(dispatch);
    case "recs":
      return createRecHandlers(dispatch);
    case "affinity":
      throw new Error("Affinity handlers not implemented");
  }
}
