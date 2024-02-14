import { Dispatch, SetStateAction, createContext } from "react";

export type ModalContextType = {
  favoritesModalOpen: boolean;
  setFavoritesModalOpen: Dispatch<SetStateAction<boolean>>;
};

export const ModalContext = createContext<ModalContextType>(null!);
