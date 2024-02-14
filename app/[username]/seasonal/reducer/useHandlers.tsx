import { ChartDataKeys } from "@/app/interfaces";

export function useHandlers(dispatch: React.Dispatch<any>) {
  function handleSortBySeason() {
    dispatch({ type: "SORT", payload: { by: "Season" } });
  }

  function handleSortByMean() {
    dispatch({ type: "SORT", payload: { by: "AvgScore" } });
    dispatch({ type: "CHANGE_DISPLAYED_MEAN", payload: "AvgScore" });
  }

  function handleSortByFavMean() {
    dispatch({ type: "SORT", payload: { by: "FavoritesAvgScore" } });
    dispatch({ type: "CHANGE_DISPLAYED_MEAN", payload: "FavoritesAvgScore" });
  }

  function handleSortByShows() {
    dispatch({ type: "SORT", payload: { by: "Shows" } });
    dispatch({ type: "CHANGE_DISPLAYED_MEAN", payload: "Shows" });
  }

  function handleChangeDisplayedStat({ stat }: { stat: ChartDataKeys }) {
    dispatch({ type: "CHANGE_DISPLAYED_MEAN", payload: stat });
  }

  function handleSortByShowCount() {
    dispatch({ type: "SORT", payload: { by: "Shows" } });
  }

  function handleFilterByYear(
    startYear: number,
    endYear: number,
    setDropdownState?: React.Dispatch<React.SetStateAction<boolean>>,
  ) {
    dispatch({
      type: "FILTER_BY_YEAR",
      payload: { startYear: startYear, endYear: endYear },
    });
    if (setDropdownState) {
      setDropdownState(false);
    }
  }

  function handleFilterByShowCount(
    minShows: number,
    maxShows: number,
    setDropdownState?: React.Dispatch<React.SetStateAction<boolean>>,
  ) {
    dispatch({
      type: "FILTER_BY_SHOW_COUNT",
      payload: { minShows: minShows, maxShows: maxShows },
    });
    if (setDropdownState) {
      setDropdownState(false);
    }
  }

  function handleFilterByName(
    text: string,
    setDropdownState?: React.Dispatch<React.SetStateAction<boolean>>,
  ) {
    dispatch({
      type: "FILTER_BY_SEASON_NAME",
      payload: { text: text },
    });
    if (setDropdownState) {
      setDropdownState(false);
    }
  }

  const handleResetFilter = () => {
    dispatch({
      type: "RESET_FILTER",
    });
  };

  function handleToggleSequels(nonSequelsOnly: boolean) {
    dispatch({
      type: "TOGGLE_SEQUELS",
      payload: nonSequelsOnly ? "Include" : "Remove",
    });
  }

  return {
    handleSortByMean,
    handleSortBySeason,
    handleSortByShowCount,
    handleSortByFavMean,
    handleFilterByYear,
    handleFilterByShowCount,
    handleFilterByName,
    handleResetFilter,
    handleSortByShows,
    handleChangeDisplayedStat,
    handleToggleSequels,
  };
}
