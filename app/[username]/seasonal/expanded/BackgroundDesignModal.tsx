import React, { useContext } from "react";
import ImageUrlUploadModal from "./ImageUrlUploadModal";
import { SingleSeasonContext } from "../reducer/SeasonalContext";
import ColorPicker from "@/components/general/ColorPicker";

export default function BackgroundDesignModal() {
  const {
    backgroundColor,
    setBackgroundColor,
    displayGradient,
    setDisplayGradient,
    uploadedImage,
    setUploadedImage,
    setUploadModalOpen,
  } = useContext(SingleSeasonContext)!;
  return (
    <>
      <ImageUrlUploadModal
        currentImageUrl={uploadedImage ? uploadedImage : ""}
        onUpload={(newImageUrl: string) => setUploadedImage(newImageUrl)}
        closeModal={() => setUploadModalOpen(false)}
        verticalPlacement={25}
      />
      <div
        className="absolute   left-1/2
  top-[70%] z-[500000] flex -translate-x-1/2 -translate-y-1/2"
      >
        <div className="flex items-center justify-center gap-4 text-sm text-white">
          <p className="min-w-[80px]">
            Or pick a solid color (also affects gradient) :{" "}
          </p>
          <ColorPicker color={backgroundColor} setColor={setBackgroundColor} />
          <button
            onClick={() => setDisplayGradient(!displayGradient)}
            className="flex max-h-[50px] items-center rounded-3xl
       bg-zinc-800 p-6 font-semibold text-lime-600 hover:bg-zinc-600"
          >
            {displayGradient ? "Remove Gradient" : "Add Gradient"}
          </button>
        </div>
      </div>
    </>
  );
}
