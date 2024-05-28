import React, { useState } from "react";
import TierListDeleteButton from "./TierListDeleteButton";

interface ImageWithPlaceholderProps {
  src: string;
  showName: string;
  index: number;
  tier: number;
  deleteMode: boolean;
  onLoadImage: (index: number) => void;
  alt: string;
  className?: string;
  deleteImage?: (index: number, tier: number) => void;
}
const TierListImage: React.FC<ImageWithPlaceholderProps> = ({
  src,
  showName,
  index,
  tier,
  deleteMode,
  onLoadImage,
  alt,
  className,
  deleteImage,
}) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative ${className} cursor-pointer`}>
      {!loaded && (
        <div className="z-50 h-[88px] w-[62px] animate-pulse bg-zinc-600"></div>
      )}
      <img
        key={index}
        src={src}
        alt={alt}
        height={54}
        width="fit-height"
        style={{ height: "88px", width: "62px" }}
        className={` ${showName && "opacity-60"} ${!loaded ? "hidden" : ""}`}
        onLoad={() => {
          setLoaded(true);
          onLoadImage(index);
        }}
      />
      {deleteMode && (
        // <TierListDeleteButton
        //   onClick={deleteImage ? () => deleteImage(index, tier) : () => {}}
        // />
        <div
          className="absolute right-0 top-0 z-[100] flex h-full w-full
        cursor-pointer items-center justify-center  bg-gradient-to-t from-red-500 from-5% to-50%
         text-center text-4xl font-semibold text-red-500 shadow-black text-shadow"
          onClick={deleteImage ? () => deleteImage(index, tier) : () => {}}
        >
          <p>x</p>
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
          {showName}
        </p>
      </div>
    </div>
  );
};

export default TierListImage;
