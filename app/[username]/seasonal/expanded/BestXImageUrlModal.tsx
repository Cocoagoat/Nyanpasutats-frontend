import React, { useState } from "react";
import { RiCloseFill, RiUpload2Fill } from "react-icons/ri";

export default function BestXImageUrlModal({
  onUpload,
  closeModal,
  imageIndex,
}: {
  onUpload: any;
  closeModal: () => void;
  imageIndex: number;
}) {
  const [text, setText] = useState("");
  return (
    <>
      <div
        className="z-50 flex h-[150px] w-full items-center
   justify-center gap-5 rounded-3xl bg-zinc-700 p-4
   text-white"
      >
        <label
          htmlFor="image-url"
          className="mb-2 block  text-center text-xs text-white lg:text-sm"
        >
          Paste image URL here
        </label>
        <input
          type="text"
          id="image-url"
          className="min-w-0 rounded-3xl
           border-zinc-600 text-black focus:ring-4
            focus:ring-lime-600"
          value={text}
          onChange={(e) => setText(e.target.value)}
          aria-label={`Paste image URL here`}
        />
        <div>
          <button
            className="p-1 text-2xl text-lime-600 hover:bg-zinc-600"
            onClick={() => {
              onUpload(imageIndex, text);
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
    </>
  );
}
