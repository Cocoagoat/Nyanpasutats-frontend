import React, { Suspense } from "react";
import ImageWithPlaceholder from "./TierListImage";
import TierListRating from "./TierListRating";

export default function TierListRow({
  color,
  score,
  images,
}: {
  color: string;
  score: string;
  images: string[];
}) {
  return (
    <div className="flex gap-4">
      <TierListRating color={color} score={score} />
      <div className="relative flex items-center gap-2">
        {images.map((imageUrl, imageIndex) => (
          <div className="" key={imageIndex}>
            <ImageWithPlaceholder
              key={imageIndex}
              src={imageUrl}
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
