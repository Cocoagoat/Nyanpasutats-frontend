import React from "react";
import FavoriteShows from "./FavoriteShows";
import { ShowsToDisplay } from "@/app/interfaces";
import LargeButton from "../../../../components/general/LargeButton";

export default function FavoriteShowsModal({
  favorites,
  setFavorites,
  setFavoritesModalOpen,
}: {
  favorites: ShowsToDisplay;
  setFavorites: React.Dispatch<React.SetStateAction<ShowsToDisplay>>;
  setFavoritesModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const topFiveFavorites = Object.fromEntries(
    Object.entries(favorites).filter((show) => show[1].displayed)
  );

  const leftoverFavorites = Object.fromEntries(
    Object.entries(favorites).filter((show) => !show[1].displayed)
  );

  return (
    <div className="absolute w-full h-full flex flex-col items-center justify-center gap-20 bg-zinc-700 z-40 top-0 text-white">
      <div>
        <FavoriteShows
          favorites={topFiveFavorites}
          setFavorites={setFavorites}
          partOfModal={true}
        />
      </div>
      <div>
        <FavoriteShows
          favorites={leftoverFavorites}
          setFavorites={setFavorites}
          partOfModal={true}
          leftovers={true}
        />
      </div>
      <LargeButton onClick={() => setFavoritesModalOpen(false)}>
        Close
      </LargeButton>
    </div>
  );
}
