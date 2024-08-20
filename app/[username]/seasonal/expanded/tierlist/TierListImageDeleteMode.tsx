import { ShowToDisplay } from "@/app/interfaces";
import React from "react";

export default function TierListImageDeleteMode({
  imageData,
  index,
  deleteImage,
}: {
  imageData: ShowToDisplay;
  index: number;
  deleteImage?: (index: number, score: number) => void;
}) {
  return (
    <div
      className={`absolute right-0 top-0 z-[100] flex h-full w-full
        cursor-pointer items-center justify-center  bg-gradient-to-t 
         from-5% to-50%  text-center text-4xl font-semibold 
         ${
           imageData["displayed"]
             ? "from-lime-600 text-lime-600"
             : "from-red-500 text-red-500"
         } shadow-black text-shadow`}
      onClick={
        deleteImage ? () => deleteImage(index, imageData["score"]) : () => {}
      }
    >
      <p>{imageData["displayed"] ? "+" : "x"}</p>
    </div>
  );
}
