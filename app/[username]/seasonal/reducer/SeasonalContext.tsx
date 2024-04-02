import { Dispatch, createContext, useContext } from "react";
import { State } from "./SeasonalStatsReducer";
import { Action } from "./actions";
import { SeasonData } from "@/app/interfaces";

export const SeasonalContext = createContext<State | null>(null);

export const SeasonalDispatchContext = createContext<Dispatch<Action>>(
  () => {},
);

export const SingleSeasonContext =
  createContext<singleSeasonContextType | null>(null);

export function useSingleSeasonContext() {
  const context = useContext(SingleSeasonContext);
  if (!context) {
    throw new Error("SingleSeasonContext not provided");
  }
  return context;
}

export type singleSeasonContextType = {
  season: string;
  seasonStats: SeasonData;
  backgroundImage: string;
  backgroundColor: string;
  seasonCount: number;
  setExpanded: Dispatch<React.SetStateAction<boolean>>;
  imageChanged: boolean;
  nightImage: boolean;
};
