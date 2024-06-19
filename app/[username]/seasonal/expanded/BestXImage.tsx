import React, { useContext, useState } from "react";
import { SingleSeasonContext } from "../reducer/SeasonalContext";
import UploadImageModal from "./UploadImageModal";
import ImageUrlUploadModal from "./ImageUrlUploadModal";
import { PiPlus, PiPlusBold } from "react-icons/pi";
import useToast from "@/hooks/useToast";
import {
  RiDeleteBackFill,
  RiDeleteBin2Fill,
  RiDeleteBin3Fill,
  RiDeleteBin4Fill,
  RiDeleteBin4Line,
  RiDeleteBin5Fill,
  RiDeleteBin6Fill,
  RiUpload2Fill,
} from "react-icons/ri";
import { TbEyeCancel } from "react-icons/tb";
import { handleNewImageUrl2 } from "@/utils/general";

export default function BestXImage({
  index,
  image_url,
  // uploadModalOpen,
  setUploadModalOpen,
  // handleUploadImage,
  setClickedImageIndex,
  handleNewImageUrl,
  lastImage,
  ghost,
  solidifyGhost,
  remove,
}: {
  index: number;
  image_url: string;
  // uploadModalOpen: boolean;
  setUploadModalOpen: (value: boolean) => void;

  // handleUploadImage: (index: number, newImageUrl: string) => void;
  setClickedImageIndex: (index: number) => void;
  handleNewImageUrl: (newImageUrl: string) => void;
  lastImage: boolean;
  ghost?: boolean;
  solidifyGhost?: () => void;
  remove: () => void;
}) {
  // console.log("Index is", index, leftImage);
  // console.log("Last image", lastImage);
  const [eyeHovered, setEyeHovered] = useState(false);
  const { notifyError } = useToast();
  const { editModeOpen } = useContext(SingleSeasonContext)!;
  const ImageSymbol = lastImage && ghost ? PiPlusBold : RiUpload2Fill;
  const [imageClicked, setImageClicked] = useState(false);
  // const [uploadModalOpen, setUploadModalOpen] = useState(false);
  //   const { setUploadModalOpen } = useContext(SingleSeasonContext)!;
  return !imageClicked ? (
    <div className="relative flex flex-col">
      {!ghost && (
        <RiDeleteBin6Fill
          size="32px"
          className={`${
            editModeOpen ? "" : "hidden"
          } absolute -top-8 w-full cursor-pointer text-center text-black`}
          onClick={remove}
          // onClick={handleHideContShow}
        >
          Test
        </RiDeleteBin6Fill>
      )}
      <div
        className={`relative mx-auto h-[105px] w-[75px]
         cursor-pointer`}
        onClick={
          lastImage && ghost && solidifyGhost
            ? () => solidifyGhost()
            : () => {
                setClickedImageIndex(index);
                setUploadModalOpen(true);
                setImageClicked(true);
              }
        }
        // onMouseEnter={editModeOpen ? onMouseEnter : () => {}}
      >
        {image_url ? (
          // Not using Next's Image component because after lots of pain
          // I realized that html-to-image doesn't support it
          <img
            src={image_url}
            alt=""
            width={75}
            height={105}
            className={`mx-auto h-full rounded-xl shadow-md shadow-black`}
            onError={() => {
              // onUpload(index, "");
              // handleNewImageUrl2(index, "", onUpload);
              notifyError("Image not found. Please enter a valid image URL.");
            }}
          />
        ) : (
          <div
            className={`flex h-[105px] w-[75px] items-center justify-center
       rounded-xl bg-zinc-800 ${ghost ? "opacity-40" : ""} text-center text-xs shadow-md  shadow-black`}
          >
            {lastImage && ghost ? (
              <p className="font-semibold text-lime-600">Add Image</p>
            ) : (
              <PiPlusBold className=" text-3xl font-semibold text-lime-600" />
            )}
          </div>
        )}
      </div>
    </div>
  ) : (
    <ImageUrlUploadModal
      currentImageUrl={image_url}
      onUpload={(newImageUrl: string) => handleNewImageUrl(newImageUrl)}
      closeModal={() => setImageClicked(false)}
      // imageIndex={clickedImageIndex}
    />
  );
}
