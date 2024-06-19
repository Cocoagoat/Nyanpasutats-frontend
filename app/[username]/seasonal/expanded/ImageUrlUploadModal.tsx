import { handleNewImageUrl2 } from "@/utils/general";
import React, { useState } from "react";
import { RiCloseFill, RiUpload2Fill } from "react-icons/ri";

export default function ImageUrlUploadModal({
  currentImageUrl,
  onUpload,
  closeModal,
  imageIndex,
  verticalPlacement,
}: {
  currentImageUrl: string;
  onUpload: any;
  closeModal: () => void;
  imageIndex?: number;
  verticalPlacement?: number;
}) {
  const [text, setText] = useState(currentImageUrl);
  return (
    <>
      <div
        className="absolute top-0 z-[500000] flex h-full w-full 
   gap-5 rounded-3xl bg-zinc-700 p-4
   text-white"
      >
        <div
          className="absolute left-1/2  flex w-full -translate-x-1/2 
        justify-center gap-4"
          style={{ top: `${verticalPlacement ? verticalPlacement : 35}%` }}
        >
          <label
            htmlFor="image-url"
            className=" translate-y-[30%]  
             text-xs text-white lg:text-sm"
          >
            Paste image URL here
          </label>
          <input
            type="text"
            id="image-url"
            className="h-[48px] w-1/2 min-w-0 rounded-3xl
           border-zinc-600 text-black focus:ring-4
            focus:ring-lime-600"
            value={text}
            onChange={(e) => setText(e.target.value)}
            aria-label={`Paste image URL here`}
          />
          <div className="flex  gap-2">
            <button
              className="p-1 text-2xl text-lime-600 hover:bg-zinc-600"
              onClick={() => {
                handleNewImageUrl2(text, () => onUpload(text));
                closeModal();
              }}
            >
              <RiUpload2Fill />
            </button>
            <button
              className="p-1 text-2xl text-lime-600 hover:bg-zinc-600"
              onClick={closeModal}
            >
              <RiCloseFill />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
