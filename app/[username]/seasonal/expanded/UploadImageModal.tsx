import React, {
  ChangeEventHandler,
  EventHandler,
  SyntheticEvent,
  useState,
} from "react";
import LargeButton from "../../../../components/general/LargeButton";

type GenericEventHandler<E = SyntheticEvent<any>> = (event: E) => void;

export default function UploadImageModal({
  onUpload,
  closeModal,
  type,
  imageIndex,
}: {
  onUpload: any;
  closeModal: () => void;
  type?: string;
  imageIndex?: number;
}) {
  const [text, setText] = useState("");
  return (
    <>
      <div
        className="absolute top-0 z-[500] flex min-h-[200px] w-full 
      flex-col items-center justify-center gap-5 rounded-3xl bg-zinc-700
       text-white"
      >
        {type !== "text" ? (
          <input
            type="file"
            accept="image/*"
            onChange={onUpload}
            className="rounded-3xl border-4 border-zinc-600"
          />
        ) : (
          <input
            type="text"
            value={text}
            aria-label="Paste image URL here"
            onChange={(e) => setText(e.target.value)}
            className=" rounded-3xl border-4 border-zinc-600 text-black"
          />
        )}
        {type === "text" && (
          <LargeButton
            onClick={() => {
              onUpload(imageIndex, text);
            }}
          >
            Upload
          </LargeButton>
        )}
        <LargeButton onClick={closeModal}>Close</LargeButton>
      </div>
    </>
  );
}
