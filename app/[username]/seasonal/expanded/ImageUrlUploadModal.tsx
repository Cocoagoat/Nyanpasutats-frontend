import { handleNewImageUrl } from "@/utils/general";
import React, { useState } from "react";
import { RiCloseFill, RiUpload2Fill } from "react-icons/ri";

export default function ImageUrlUploadModal({
  currentImageUrl,
  onUpload,
  closeModal,
  verticalPlacement,
  includeTitle,
}: {
  currentImageUrl: string;
  onUpload: any;
  closeModal: () => void;
  verticalPlacement?: number;
  includeTitle?: boolean;
}) {
  const [imageUrl, setImageUrl] = useState(currentImageUrl);
  const [text, setText] = useState("");
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
          <div className="flex flex-col gap-20">
            <div className="flex gap-4">
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
                className="h-[48px] w-full min-w-[50%] rounded-3xl
           border-zinc-600 text-black focus:ring-4
            focus:ring-lime-600"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                aria-label={`Paste image URL here`}
              />
            </div>
            {includeTitle && (
              <div className="flex gap-4">
                <label
                  htmlFor="image-url"
                  className=" translate-y-[30%]  
             text-xs text-white lg:text-sm"
                >
                  Show Name
                </label>
                <input
                  type="text"
                  id="text"
                  className="h-[48px] w-full min-w-[50%] rounded-3xl
           border-zinc-600 text-black focus:ring-4
            focus:ring-lime-600"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  aria-label={`Write down the show's name here`}
                />
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <button
              className="h-12 p-1 text-2xl text-lime-600 hover:bg-zinc-600"
              onClick={() => {
                handleNewImageUrl(
                  imageUrl,
                  includeTitle
                    ? () => onUpload(imageUrl, text)
                    : () => onUpload(imageUrl),
                );
                closeModal();
              }}
            >
              <RiUpload2Fill />
            </button>
            <button
              className="h-12 p-1 text-2xl text-lime-600 hover:bg-zinc-600"
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
