import {
  ChartDataKeys,
  Paths,
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
  // handleSortByShows: () => void;
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

    // handleSortByShows: () => {
    //   dispatch({ type: "SORT", payload: { by: "Shows" } });
    //   dispatch({ type: "CHANGE_DISPLAYED_MEAN", payload: "Shows" });
    // },

    handleChangeDisplayedStat: (stat: ChartDataKeys) => {
      dispatch({ type: "CHANGE_DISPLAYED_MEAN", payload: stat });
    },

    handleSortByShowCount: () => {
      dispatch({ type: "SORT", payload: { by: "Shows" } });
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
      if (setDropdownState) {
        setDropdownState(false);
      }
    },

    handleFilterByName: (
      text: string,
      setDropdownState?: React.Dispatch<React.SetStateAction<boolean>>,
    ) => {
      dispatch({ type: "FILTER_BY_SEASON_NAME", payload: { text: text } });
      if (setDropdownState) {
        setDropdownState(false);
      }
    },

    handleResetFilter: () => {
      dispatch({ type: "RESET_FILTER" });
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
  path: Paths,
): SeasonalHandlers | RecHandlers;

export function useHandlers(
  dispatch: React.Dispatch<any>,
  path: Paths,
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

// export function useHandlers2<T extends "seasonal" | "recs">(
//   dispatch: React.Dispatch<any>,
//   path: T,
// ): T extends "seasonal" ? SeasonalHandlers : RecHandlers {
//   // The implementation can be adjusted to handle different paths appropriately
//   // TypeScript will use the type of `path` to determine which handler type to return
//   switch (path) {
//     case "seasonal":
//       // TypeScript knows this must return SeasonalHandlers
//       return createSeasonalHandlers(dispatch) as SeasonalHandlers;
//     case "recs":
//       // TypeScript knows this must return RecHandlers
//       return createRecHandlers(dispatch) as RecHandlers;
//   }
//   return;
// }
