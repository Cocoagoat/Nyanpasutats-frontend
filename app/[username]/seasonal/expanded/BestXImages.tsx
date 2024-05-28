import React, { useContext, useEffect, useRef, useState } from "react";
import BestXImage from "./BestXImage";
import { Lato } from "next/font/google";
import BestXImageUrlModal from "./BestXImageUrlModal";
import { PiLinkBreakLight } from "react-icons/pi";
import { SingleSeasonContext } from "../reducer/SeasonalContext";
const lato = Lato({ weight: "700", subsets: ["latin"] });

type ImageRow = {
  [key: string]: string;
};
export default function BestXImages({
  type,
  rowNum,
  worstImagesNotEmpty,
  setWorstImagesNotEmpty,
}: {
  type: "Best" | "Worst";
  rowNum: number;
  worstImagesNotEmpty?: boolean;
  setWorstImagesNotEmpty?: (rowNum: number, value: boolean) => void;
}) {
  let rowSubject = null;
  //   console.log("rowNum is", rowNum);
  switch (rowNum) {
    case 0:
      rowSubject = "Girls";
      break;
    case 1:
      rowSubject = "Guys";
      break;
    default:
      rowSubject = "X";
  }
  const initialImageState: ImageRow =
    type === "Best"
      ? {
          0: "",
          1: "",
          2: "",
          3: "",
          4: "",
        }
      : {
          0: "",
        };

  const initialTitle =
    type === "Best" ? `Best ${rowSubject}` : `Worst ${rowSubject}`;

  const [images, setImages] = useState<ImageRow>(initialImageState);
  const [clickedImageIndex, setClickedImageIndex] = useState(0);
  const [lastIsGhost, setLastIsGhost] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [title, setTitle] = useState(initialTitle);
  const { editModeOpen } = useContext(SingleSeasonContext)!;
  const hasMounted = useRef(false);

  //   console.log("Images are", images);
  //   console.log("Type is", type);
  //   console.log("RowNum is", rowNum);
  //   console.log("--------");

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      if (rowNum === 0) {
        return;
      } // Skip the effect on the first render
    }

    if (editModeOpen) {
      handleAddGhostImage();
    } else {
      handleRemoveGhostImage();
    }
  }, [editModeOpen]);

  function handleAddGhostImage() {
    // if (!lastIsGhost) {
    if (Object.keys(images).length === 0) {
      setWorstImagesNotEmpty && setWorstImagesNotEmpty(rowNum, true);
    }
    setImages((prev) => ({
      ...prev,
      [Object.keys(prev).length]: "",
    }));
  }
  // setLastIsGhost(true);
  //   }

  function handleNewImageUrl(index: number, newImageUrl: string) {
    setImages((prev) => ({ ...prev, [index]: newImageUrl }));
  }

  function handleRemoveImage(index: number) {
    const newBestImages: ImageRow = {};
    let j = 0;
    for (let i = 0; i < Object.keys(images).length; i++) {
      if (i === index) {
        j++;
        continue;
      }
      newBestImages[i - j] = images[i];
    }
    setImages(newBestImages);

    if (Object.keys(newBestImages).length === 0) {
      console.log("Entered if");
      setWorstImagesNotEmpty && setWorstImagesNotEmpty(rowNum, false);
      //   newBestImages[0] = "";
      console.log("New best images", newBestImages);
      setImages(newBestImages);
      setLastIsGhost(true);
    }
  }

  console.log("Images are", images);

  function handleRemoveGhostImage() {
    // if (lastIsGhost) {
    const keys = Object.keys(images);
    // if (keys.length === 1) return;
    //   console.log("Images are", images);
    //   console.log("Keys are", keys);

    handleRemoveImage(Number(keys.at(-1)));
    //   setLastIsGhost(false);
  }
  //   }

  if (type === "Best") {
    console.log("Worst images not empty in row", rowNum, worstImagesNotEmpty);
  }

  return (
    <div
      className={`group relative ${
        type === "Worst"
          ? !editModeOpen && Object.keys(images).length === 0 && lastIsGhost
            ? "hidden"
            : "col-span-1 col-start-1"
          : editModeOpen || worstImagesNotEmpty
            ? "col-span-2 col-start-2"
            : "col-span-3 col-start-1"
      } 
      h-full w-full`}
      //   onMouseLeave={handleRemoveGhostImage}
    >
      {!uploadModalOpen ? (
        <div className="flex flex-col">
          <div className="flex flex-wrap justify-center gap-4">
            {Object.entries(images).map(([index, image_url], _) => (
              <BestXImage
                index={Number(index)}
                key={index}
                image_url={image_url}
                setUploadModalOpen={setUploadModalOpen}
                onUpload={handleNewImageUrl}
                // uploadModalOpen={uploadModalOpen}
                // setUploadModalOpen={setUploadModalOpen}

                setClickedImageIndex={setClickedImageIndex}
                lastImage={index === Object.keys(images).at(-1)}
                ghost={editModeOpen && index === Object.keys(images).at(-1)}
                solidifyGhost={handleAddGhostImage}
                onMouseEnter={
                  index === Object.keys(images).at(-1)
                    ? handleAddGhostImage
                    : () => {}
                }
                remove={() => handleRemoveImage(Number(index))}
              />
            ))}
          </div>

          {!(Object.keys(images).length == 0 && lastIsGhost) && (
            <input
              type="text"
              value={title}
              aria-label="Best X Title"
              onChange={(e) => setTitle(e.target.value)}
              className={`  place-self-center border-none
       bg-transparent  text-center shadow-black 
       text-shadow ${lato.className}`}
            />
          )}
        </div>
      ) : (
        <BestXImageUrlModal
          onUpload={handleNewImageUrl}
          closeModal={() => setUploadModalOpen(false)}
          imageIndex={clickedImageIndex}
        />
      )}
    </div>
  );
}
