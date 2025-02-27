import React from "react";
import ShowDisplay from "../ShowDisplay";
import { ShowsToDisplay } from "@/app/interfaces";
import { Lato } from "next/font/google";
import { useSingleSeasonContext } from "../reducer/SeasonalContext";

const lato = Lato({ weight: "700", subsets: ["latin"] });

export default function FavoriteShows({
  favorites,
  setFavorites,
  partOfModal,
  leftovers,
  contShowRemoved,
}: {
  favorites: ShowsToDisplay;
  setFavorites?: React.Dispatch<React.SetStateAction<ShowsToDisplay>>;
  partOfModal?: boolean;
  leftovers?: boolean;
  contShowRemoved?: boolean;
}) {
  const displayText = partOfModal
    ? leftovers
      ? "Add to Favorites"
      : "Remove from Favorites"
    : "Favorite Shows";

  const maxScore = Object.values(favorites)[0]?.score;

  const { editModeOpen } = useSingleSeasonContext()!;
  return (
    <div
      className={` ${
        contShowRemoved && !editModeOpen
          ? "col-span-3 col-start-1"
          : "col-span-2 col-start-2"
      } group relative`}
    >
      <div className="flex flex-wrap justify-center gap-4">
        {Object.entries(favorites).map((show, index) => (
          <ShowDisplay
            show={show[1]}
            key={`${show[0]} ${index}`}
            setFavorites={setFavorites}
            partOfModal={partOfModal}
            topScore={show[1].score >= maxScore}
          />
        ))}
      </div>
      <p
        className={`p-1 text-center text-lg shadow-black text-shadow ${lato.className}`}
      >
        {displayText}
      </p>
    </div>
  );
}
