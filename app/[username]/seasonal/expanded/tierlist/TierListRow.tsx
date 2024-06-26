import React from "react";
import TierListImage from "./TierListImage";
import TierListRating from "./TierListRating";
import { ImageData, ImageData2 } from "@/app/interfaces";

export default function TierListRow({
  score,
  images,
  showText,
  deleteMode,
  deleteShow,
  onDropImage,
}: {
  score: string;
  images: ImageData2[];
  showText: boolean;
  deleteMode: boolean;
  deleteShow: (index: number, tier: number) => void;
  onDropImage: (showData: ImageData2) => void;
}) {
  // console.log(images);
  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    showData: ImageData2,
  ) => {
    e.dataTransfer.setData("text", JSON.stringify(showData));
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    try {
      const showData = JSON.parse(e.dataTransfer.getData("text")) as ImageData2;
      onDropImage(showData);
    } catch (err) {
      e.dataTransfer.clearData();
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // Necessary to allow the drop
  };

  return (
    <div
      className=" flex gap-4"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      {/* <TierListRating color={color} initialScore={score} /> */}
      <div className="relative flex h-[88px] ">
        {images.map((imageData, imageIndex) => (
          <div
            className=""
            key={imageIndex}
            draggable="true"
            onDragStart={(e) => handleDragStart(e, imageData)}
          >
            <TierListImage
              key={imageIndex}
              src={imageData["imageUrl"]}
              showName={showText ? imageData["showName"] : ""}
              index={imageIndex}
              tier={+score}
              deleteMode={deleteMode}
              alt="test"
              className=""
              deleteImage={deleteShow}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
