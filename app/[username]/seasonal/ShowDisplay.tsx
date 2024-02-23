import { ShowToDisplay, ShowsToDisplay } from "@/app/interfaces";
import { ModalContext } from "@/contexts/ModalContext";
import React, { useContext, useEffect, useState } from "react";
import { MdOutlineStar } from "react-icons/md";
import errorImg from "@/public/default.png";

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
  const [error, setError] = useState(false);
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
            ([key]) => key !== show.name,
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

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isLoading) {
        setIsLoading(false);
        setError(true);
        show.imageUrl = errorImg.src;
      }
    }, 5000);

    if (show.imageUrl === errorImg.src) {
      setError(true);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [isLoading, setIsLoading, setError]);

  console.log(show.imageUrl);

  return (
    <div className="relative flex flex-col">
      <div
        className={`relative h-[105px] w-[75px] ${
          controversialImage ? "mx-auto" : ""
        }`}
      >
        {/* {isLoading && (
          <div
            className="flex h-[105px] w-[75px] items-center justify-center
           bg-zinc-700"
          >
            Loading...
          </div> */}
        {/* )} */}

        {!error && !isLoading ? (
          <img // Not using Next's Image component because html-to-image doesn't support it
            src={show.imageUrl}
            alt={show.name}
            width={75}
            height={105}
            className={`mx-auto h-full rounded-xl shadow-md shadow-black ${
              hovered ? "opacity-50" : ""
            }`}
            onLoad={() => setIsLoading(false)}
          />
        ) : (
          <div
            className="flex h-[105px] w-[75px] items-center rounded-xl
           bg-zinc-800 text-center text-xs shadow-md shadow-black"
          ></div>
        )}

        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={
            partOfModal ? toggleFavorite : () => setFavoritesModalOpen(true)
          }
          className=" absolute left-1/2 top-1/2 flex h-full  w-full
           -translate-x-1/2 -translate-y-1/2  transform cursor-pointer
            items-center justify-center text-center text-xs font-semibold
             text-white transition duration-300 ease-in-out"
        >
          <p className="z-[60] row-start-2 mb-2 text-center shadow-black text-shadow">
            {(hovered || error) && show.name}
          </p>
        </div>

        <div className="absolute bottom-0 flex w-full items-center justify-center rounded-b-xl bg-black bg-opacity-50 px-1">
          <span
            className="font-semibold text-white"
            style={{ verticalAlign: "middle" }}
          >
            {show.score}
          </span>
          <MdOutlineStar
            style={{ verticalAlign: "middle" }}
            className="text-lg text-yellow-300"
          />
        </div>
      </div>
    </div>
  );
}
