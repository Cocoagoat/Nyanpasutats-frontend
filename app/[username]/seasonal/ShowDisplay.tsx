import { ShowToDisplay, ShowsToDisplay } from "@/app/interfaces";
import { ModalContext } from "@/contexts/ModalContext";
import React, { useContext, useState } from "react";
import { MdOutlineStar } from "react-icons/md";

export default function ShowDisplay({
  show,
  controversialImage,
  setFavorites,
  partOfModal,
  leftovers,
}: {
  show: ShowToDisplay;
  controversialImage?: boolean;
  setFavorites?: React.Dispatch<React.SetStateAction<ShowsToDisplay>>;
  partOfModal?: boolean;
  leftovers?: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { setFavoritesModalOpen } = useContext(ModalContext);

  function toggleFavorite() {
    if (setFavorites) {
      setFavorites((prev) => {
        const newFavorites = {
          ...prev,
        };

        newFavorites[show.name] = {
          ...newFavorites[show.name],
          displayed: !newFavorites[show.name].displayed,
        };

        if (newFavorites[show.name].displayed) {
          const filteredFavorites = Object.entries(newFavorites).filter(
            ([key]) => key !== show.name
          );

          const updatedFavorites = [
            ...filteredFavorites,
            [show.name, newFavorites[show.name]],
          ];

          return Object.fromEntries(updatedFavorites);
        }

        return newFavorites;
      });
    }
  }

  return (
    <div className="flex relative flex-col">
      <div
        className={`relative w-[75px] h-[105px] ${
          controversialImage ? "mx-auto" : ""
        }`}
      >
        {isLoading && (
          <div className="w-[75px] h-[105px] bg-zinc-700 flex justify-center items-center">
            Loading...
          </div>
        )}{" "}
        <img // Not using Next's Image component because html-to-image doesn't support it
          src={show.imageUrl}
          alt="Test image"
          width={75}
          height={105}
          className={`h-full rounded-xl shadow-md shadow-black mx-auto ${
            hovered ? "opacity-50" : ""
          }`}
          onLoad={() => setIsLoading(false)}
        />
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={
            partOfModal ? toggleFavorite : () => setFavoritesModalOpen(true)
          }
          className=" absolute flex justify-center items-center cursor-pointer  w-full h-full text-center  text-white text-xs font-semibold top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition duration-300 ease-in-out"
        >
          <p className="row-start-2 text-center text-shadow shadow-black z-[60] mb-2">
            {hovered && show.name}
          </p>
        </div>
        <div className="absolute rounded-b-xl bottom-0 w-full flex justify-center items-center bg-black bg-opacity-50 px-1">
          <span
            className="font-semibold text-white"
            style={{ verticalAlign: "middle" }}
          >
            {show.score}
          </span>
          <MdOutlineStar
            style={{ verticalAlign: "middle" }}
            className="text-yellow-300 text-lg"
          />
        </div>
      </div>
    </div>
  );
}
