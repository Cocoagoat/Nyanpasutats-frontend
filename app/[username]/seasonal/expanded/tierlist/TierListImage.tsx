import React, { useState } from "react";
import TierListDeleteButton from "./TierListDeleteButton";
import { image } from "html2canvas/dist/types/css/types/image";
import { ImageData, ShowToDisplay } from "@/app/interfaces";

function TierListImage({
  imageData,
  index,
  deleteMode,
  className,
  deleteImage,
  showText,
}: {
  imageData: ShowToDisplay;
  index: number;
  deleteMode: boolean;
  className: string;
  deleteImage?: (index: number, tier: number) => void;
  showText?: boolean;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative ${className} cursor-pointer`}>
      {!loaded && (
        <div className="z-50 h-[88px] w-[62px] animate-pulse bg-zinc-600"></div>
      )}
      <img
        key={index}
        src={imageData["imageUrl"]}
        alt={imageData["name"]}
        height={54}
        width="fit-height"
        style={{ height: "88px", width: "62px" }}
        className={` ${showText && "opacity-60"} ${!loaded ? "hidden" : ""}`}
        onLoad={() => {
          setLoaded(true);
        }}
      />
      {deleteMode && (
        // <TierListDeleteButton
        //   onClick={deleteImage ? () => deleteImage(index, tier) : () => {}}
        // />
        <div
          className={`absolute right-0 top-0 z-[100] flex h-full w-full
        cursor-pointer items-center justify-center  bg-gradient-to-t  from-5% to-50%
         text-center text-4xl font-semibold ${imageData["displayed"] ? "from-lime-600 text-lime-600" : "from-red-500 text-red-500"} shadow-black text-shadow`}
          onClick={
            deleteImage
              ? () => deleteImage(index, imageData["score"])
              : () => {}
          }
        >
          <p>{imageData["displayed"] ? "+" : "x"}</p>
        </div>
      )}
      <div
        className="absolute left-1/2 top-1/2 flex h-full  w-full
           -translate-x-1/2 -translate-y-1/2 items-center justify-center
            text-center text-[0.5rem] font-semibold text-white"
      >
        <p
          className="z-[60] mb-2 text-center opacity-100 shadow-black 
        text-shadow"
        >
          {showText && imageData["name"]}
        </p>
      </div>
    </div>
  );
}

export default TierListImage;
