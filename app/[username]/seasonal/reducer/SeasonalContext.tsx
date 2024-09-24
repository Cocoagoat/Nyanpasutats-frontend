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
  setBackgroundColor: Dispatch<React.SetStateAction<string>>;
  altBackgroundColor: string;
  uploadedImage: string | null;
  setUploadedImage: Dispatch<React.SetStateAction<string | null>>;
  displayGradient: boolean;
  setDisplayGradient: Dispatch<React.SetStateAction<boolean>>;
  seasonCount: number;
  setExpanded: Dispatch<React.SetStateAction<boolean>>;
  imageChanged: boolean;
  uploadModalOpen: boolean;
  setUploadModalOpen: Dispatch<React.SetStateAction<boolean>>;
  editModeOpen: boolean;
  setEditModeOpen: Dispatch<React.SetStateAction<boolean>>;
  dragModeOpen: boolean;
  setDragModeOpen: Dispatch<React.SetStateAction<boolean>>;
  setTierListOpen: Dispatch<React.SetStateAction<boolean>>;
  tierListOpen: boolean;
};
