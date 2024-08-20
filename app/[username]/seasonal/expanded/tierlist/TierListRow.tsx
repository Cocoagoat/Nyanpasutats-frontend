import { ShowToDisplay } from "@/app/interfaces";
import React from "react";
import TierListImage from "./TierListImage";

export default function TierListRow({
  images,
  showText,
  deleteMode,
  deleteShow,
  onDropImage,
}: {
  images: ShowToDisplay[];
  showText: boolean;
  deleteMode: boolean;
  deleteShow: (index: number, tier: number) => void;
  onDropImage: (showData: ShowToDisplay) => void;
}) {
  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    showData: ShowToDisplay,
  ) => {
    e.dataTransfer.setData("text", JSON.stringify(showData));
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    try {
      const showData = JSON.parse(
        e.dataTransfer.getData("text"),
      ) as ShowToDisplay;
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
              index={imageIndex}
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
