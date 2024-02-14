import React, { ChangeEventHandler } from "react";
import LargeButton from "../../../../components/general/LargeButton";

export default function UploadImageModal({
  onUpload,
  closeModal,
}: {
  onUpload: ChangeEventHandler<HTMLInputElement>;
  closeModal: () => void;
}) {
  return (
    <>
      <div className="absolute w-full h-full rounded-3xl flex flex-col items-center justify-center gap-20 bg-zinc-700 z-50 top-0 text-white">
        <input
          type="file"
          accept="image/*"
          onChange={onUpload}
          className="border-4 border-zinc-600 rounded-3xl "
        />
        <LargeButton onClick={closeModal}>Close</LargeButton>
      </div>
    </>
  );
}
