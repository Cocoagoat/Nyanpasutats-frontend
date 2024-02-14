import React from "react";
import ShowDisplay from "../ShowDisplay";
import { ShowsToDisplay } from "@/app/interfaces";
import { Lato } from "next/font/google";

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
  return (
    <div
      className={`row-start-3 ${
        contShowRemoved ? "col-start-1 col-span-3" : "col-start-2 col-span-2"
      } relative group`}
    >
      <div className="flex flex-wrap justify-center gap-4 ">
        {Object.entries(favorites).map((show, index) => (
          <ShowDisplay
            show={show[1]}
            key={`${show[0]} ${index}`}
            setFavorites={setFavorites}
            partOfModal={partOfModal}
            leftovers={leftovers}
          />
        ))}
      </div>
      <p
        className={`text-center text-shadow text-lg shadow-black p-1 ${lato.className}`}
      >
        {displayText}
      </p>
    </div>
  );
}
