import { ShowToDisplay } from "@/app/interfaces";
import { useState } from "react";
import TierListImageText from "./TierListImageText";
import TierListImageDeleteMode from "./TierListImageDeleteMode";

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
        // Not using Next's Image component since html-to-image doesn't like it
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
        <TierListImageDeleteMode
          imageData={imageData}
          index={index}
          deleteImage={deleteImage}
        />
      )}

      {showText && <TierListImageText showName={imageData["name"]} />}
    </div>
  );
}

export default TierListImage;
