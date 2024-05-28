import React from "react";
import TierListImage from "./TierListImage";
import TierListRating from "./TierListRating";
import { ImageData } from "@/app/interfaces";

export default function TierListRow({
  score,
  images,
  showText,
  deleteMode,
  deleteShow,
  onLoadImage,
  onDropImage,
}: {
  score: string;
  images: ImageData[];
  showText: boolean;
  deleteMode: boolean;
  deleteShow: (index: number, tier: number) => void;
  onLoadImage: (index: number) => void;
  onDropImage: (showData: ImageData) => void;
}) {
  // console.log(images);
  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    showData: ImageData,
  ) => {
    e.dataTransfer.setData("text", JSON.stringify(showData));
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const showData = JSON.parse(e.dataTransfer.getData("text")) as ImageData;
    onDropImage(showData);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // Necessary to allow the drop
  };

  function deleteImageFromTierList(index: number) {
    console.log("Deleting image from tier list");
  }

  return (
    <div
      className=" flex gap-4"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      {/* <TierListRating color={color} initialScore={score} /> */}
      <div className="relative flex h-[88px] items-center">
        {images.map(([showName, imageUrl], imageIndex) => (
          <div
            className=""
            key={imageIndex}
            draggable="true"
            onDragStart={(e) =>
              handleDragStart(e, [showName, imageUrl, +score])
            }
          >
            <TierListImage
              key={imageIndex}
              src={imageUrl}
              showName={showText ? showName : ""}
              index={imageIndex}
              tier={+score}
              deleteMode={deleteMode}
              onLoadImage={onLoadImage}
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
