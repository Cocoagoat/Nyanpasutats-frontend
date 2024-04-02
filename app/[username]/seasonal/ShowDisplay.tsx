import { ShowToDisplay, ShowsToDisplay } from "@/app/interfaces";
import { ModalContext } from "@/contexts/ModalContext";
import React, { useContext, useEffect, useState } from "react";
import { MdOutlineStar } from "react-icons/md";
import errorImg from "@/public/default.png";
import { updateImageUrl } from "@/app/home/api";

export default function ShowDisplay({
  show,
  controversialImage,
  setFavorites,
  partOfModal,
}: {
  show: ShowToDisplay;
  controversialImage?: boolean;
  setFavorites?: React.Dispatch<React.SetStateAction<ShowsToDisplay>>;
  partOfModal?: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const { setFavoritesModalOpen } = useContext(ModalContext);
  console.log("Show display: ", show);
  console.log("Show display image_url: ", show.imageUrl);
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
    if (!show.imageUrl) {
      setError(true);
    } else {
      setError(false);
    }
  }, [show.imageUrl]);

  function handleImageError() {
    setError(true);
    updateImageUrl(show.name);
  }

  // useEffect(() => {
  //   console.log("Testing", show.imageUrl);

  //   // const timer = setTimeout(() => {
  //   //   if (isLoading) {
  //   //     console.log("Image loading timeout");
  //   //     setIsLoading(false);
  //   //     setError(true);
  //   //     show.imageUrl = errorImg.src;
  //   //   }
  //   // }, 5000);

  //   if (show.imageUrl === errorImg.src) {
  //     console.log("Error image loaded");
  //     setError(true);
  //   }

  //   return () => {
  //     clearTimeout(timer);
  //   };
  // }, [isLoading, setIsLoading, setError]);

  // console.log(show.imageUrl);

  return (
    <div className="relative flex flex-col">
      <div
        className={`relative h-[105px] w-[75px] ${
          controversialImage ? "mx-auto" : ""
        }`}
      >
        {!error ? (
          <img // Not using Next's Image component because html-to-image doesn't support it
            src={show.imageUrl}
            alt={show.name}
            width={75}
            height={105}
            className={`mx-auto h-full rounded-xl shadow-md shadow-black ${
              hovered ? "opacity-50" : ""
            }`}
            onError={handleImageError}
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
