import React from "react";
import ImageWithPlaceholder from "./TierListImage";
import TierListRating from "./TierListRating";
import { ImageData } from "@/app/interfaces";

export default function TierListRow({
  color,
  score,
  images,
  showText,
  onDropImage,
}: {
  color: string;
  score: string;
  images: ImageData[];
  showText: boolean;
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
            <ImageWithPlaceholder
              key={imageIndex}
              src={imageUrl}
              showName={showText ? showName : ""}
              index={imageIndex}
              alt="test"
              className=""
            />
          </div>
        ))}
      </div>
    </div>
  );
}
