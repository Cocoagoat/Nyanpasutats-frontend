import React, { useEffect } from "react";
import TierListImage from "./TierListImage";
import TierListRating from "./TierListRating";
import { ImageData, ImageData2, ShowToDisplay } from "@/app/interfaces";

export default function TierListRow({
  score,
  images,
  showText,
  deleteMode,
  deleteShow,
  onDropImage,
}: {
  score: string;
  images: ShowToDisplay[];
  showText: boolean;
  deleteMode: boolean;
  deleteShow: (index: number, tier: number) => void;
  onDropImage: (showData: ShowToDisplay) => void;
}) {
  // console.log(images);
  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    showData: ShowToDisplay,
  ) => {
    e.dataTransfer.setData("text", JSON.stringify(showData));
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    try {
      const showData = JSON.parse(e.dataTransfer.getData("text")) as ShowToDisplay;
      onDropImage(showData);
    } catch (err) {
      e.dataTransfer.clearData();
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // Necessary to allow the drop
  };

  function filterImages(imageData: ShowToDisplay) {
    return deleteMode || !imageData.displayed;
  }

  return (
    <div
      className=" flex gap-4"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      {/* <TierListRating color={color} initialScore={score} /> */}
      <div className="relative flex h-[88px] ">
        {images.filter(filterImages).map((imageData, imageIndex) => (
          <div
            className=""
            key={imageIndex}
            draggable="true"
            onDragStart={(e) => handleDragStart(e, imageData)}
          >
            <TierListImage
              key={imageIndex}
              imageData={imageData}
              // src={imageData["imageUrl"]}
              // showName={showText ? imageData["showName"] : ""}
              index={imageIndex}
              // tier={+score}
              deleteMode={deleteMode}
              className=""
              deleteImage={deleteShow}
              showText={showText}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
