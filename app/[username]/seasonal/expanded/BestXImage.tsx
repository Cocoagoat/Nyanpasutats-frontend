import { useContext, useState } from "react";
import { SingleSeasonContext } from "../reducer/SeasonalContext";
import useToast from "@/hooks/useToast";
import { PiPlusBold } from "react-icons/pi";
import { RiDeleteBin6Fill } from "react-icons/ri";
import ImageUrlUploadModal from "./ImageUrlUploadModal";

export default function BestXImage({
  index,
  image_url,
  setUploadModalOpen,
  setClickedImageIndex,
  handleNewImageUrl,
  lastImage,
  ghost,
  solidifyGhost,
  remove,
}: {
  index: number;
  image_url: string;
  setUploadModalOpen: (value: boolean) => void;
  setClickedImageIndex: (index: number) => void;
  handleNewImageUrl: (newImageUrl: string) => void;
  lastImage: boolean;
  ghost?: boolean;
  solidifyGhost?: () => void;
  remove: () => void;
}) {
  const { notifyError } = useToast();
  const { editModeOpen } = useContext(SingleSeasonContext)!;
  const [imageClicked, setImageClicked] = useState(false);
  return imageClicked ? (
    <ImageUrlUploadModal
      currentImageUrl={image_url}
      onUpload={(newImageUrl: string) => handleNewImageUrl(newImageUrl)}
      closeModal={() => setImageClicked(false)}
    />
  ) : (
    <div className="relative flex flex-col">
      {!ghost && (
        <RiDeleteBin6Fill
          size="32px"
          className={`${
            editModeOpen ? "" : "hidden"
          } absolute -top-8 w-full cursor-pointer text-center text-black`}
          onClick={remove}
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
  );
}
