import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import BestXImage from "./BestXImage";
import { Lato } from "next/font/google";
import ImageUrlUploadModal from "./ImageUrlUploadModal";
import { PiLinkBreakLight } from "react-icons/pi";
import { SingleSeasonContext } from "../reducer/SeasonalContext";
import { ImageRow } from "./SeasonExpanded";
import {
  handleNewImageUrl2,
  isImgurUrl,
  isMyAnimeListUrl,
  isUrlPartOfHost,
  isUrlPartOfHosts,
} from "@/utils/general";
import useToast from "@/hooks/useToast";
const lato = Lato({ weight: "700", subsets: ["latin"] });

export default function BestXImages({
  images,
  setImages,
  type,
  rowNum,
  worstImagesNotEmpty,
  setWorstImagesNotEmpty,
}: {
  images: ImageRow;
  setImages: Dispatch<SetStateAction<ImageRow[]>>;
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
  //   const initialImageState: ImageRow =
  //     type === "Best"
  //       ? {
  //           0: "",
  //           1: "",
  //           2: "",
  //           3: "",
  //           4: "",
  //         }
  //       : {
  //           0: "",
  //         };

  const initialTitle =
    type === "Best" ? `Best ${rowSubject}` : `Worst ${rowSubject}`;

  //   const [images, setImages] = useState<ImageRow>(initialImageState);
  const [clickedImageIndex, setClickedImageIndex] = useState(0);
  const [lastIsGhost, setLastIsGhost] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [title, setTitle] = useState(initialTitle);
  const { editModeOpen } = useContext(SingleSeasonContext)!;
  const { notifyError } = useToast();
  const hasMounted = useRef(false);

  useEffect(() => {
    // If the component is mounting for the first time and rowNum==0, that means
    // the user has just expanded the seasonal card for the first time. In this
    // case, no need to add or remove a ghost image.
    if (!hasMounted.current) {
      hasMounted.current = true;
      // console.log("Entered hasmounted if, rownum is", rowNum);
      if (rowNum === 0 || !editModeOpen) {
        return;
        // } // Skip the effect on the first render
      }
    }

    // Otherwise, we want to add a ghost image whenever the user opens edit mode
    // and remove it when the user exits edit mode.
    if (editModeOpen) {
      // console.log("Entered handleAddGhostImage");
      handleAddGhostImage();
    } else {
      console.log("Entered handleRemoveGhostImage");
      handleRemoveGhostImage();
    }
  }, [editModeOpen]);

  function handleRemoveGhostImage() {
    // if (lastIsGhost) {
    const keys = Object.keys(images);
    console.log("Images inside handleRemoveGhostImage are", images);
    console.log("RowNum inside handleRemoveGhostImage is", rowNum);
    // console.log(
    //   "Images[rowNum] inside handleRemoveGhostImage are",
    //   images[rowNum],
    // );
    // console.log("Keys inside handleRemoveGhostImage are", keys);
    // if (keys.length === 1) return;
    //   console.log("Images are", images);
    //   console.log("Keys are", keys);

    handleRemoveImage(Number(keys.at(-1)));
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
    setImages((prevImages: ImageRow[]) => {
      const newImages = [...prevImages];
      newImages[rowNum] = newBestImages;
      //   console.log("Index and rownum", index, rowNum);
      //   console.log("oldImages inside setImages", prevImages);
      //   console.log("newImages inside setImages", newImages);
      return newImages;
    });

    if (Object.keys(newBestImages).length === 0) {
      //   console.log("Entered if");
      console.log(rowNum);
      setWorstImagesNotEmpty && setWorstImagesNotEmpty(rowNum, false);
      //   newBestImages[0] = "";
      //   console.log("New best images", newBestImages);
      //   setImages((prevImages: ImageRow[]) => {
      //     return { ...prevImages, [rowNum]: newBestImages };
      //   });
      setLastIsGhost(true);
    }
  }

  function handleAddGhostImage() {
    // if (!lastIsGhost) {
    // console.log("Stop 1");
    // console.log("Images inside handleAddGhostImage are", images);
    // console.log("Length", Object.keys(images).length);

    if (Object.keys(images).length === 1) {
      setWorstImagesNotEmpty && setWorstImagesNotEmpty(rowNum, true);
    }

    // let newImages = { ...images, [Object.keys(images).length]: "" };
    // console.log("Stop 2");
    setImages((prevImages: ImageRow[]) => {
      const newImages = [...prevImages];
      newImages[rowNum] = { ...images, [Object.keys(images).length]: "" };
      return newImages;
    });
    // console.log("Stop 3");
  }
  // setLastIsGhost(true);
  //   }

  function handleNewImageUrl(newImageUrl: string) {
    // const allowedHosts = ["imgur.com", "myanimelist.net", "anilist.co"];
    // if (!isUrlPartOfHosts(newImageUrl, allowedHosts)) {
    //   notifyError(
    //     `The site currently supports images from the following sites :

    //   - Imgur
    //   - MyAnimeList
    //   - Anilist

    //   If your image is from another site, please upload it to Imgur and try again.`,
    //     undefined,
    //     15000,
    //   );
    //   return;
    // }

    setImages((prevImages: ImageRow[]) => {
      //   console.log("rowNum inside handleNewImageUrl is", rowNum, prevImages);
      const newImages = [...prevImages];

      newImages[rowNum][clickedImageIndex] = newImageUrl;
      return newImages;
    });
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
      {true ? (
        <div className="flex flex-col">
          <div className="flex flex-wrap justify-center gap-4 text-sky-550">
            {Object.entries(images).map(([index, image_url], _) => (
              <BestXImage
                index={Number(index)}
                key={_}
                image_url={image_url as string}
                setUploadModalOpen={setUploadModalOpen}
                handleNewImageUrl={handleNewImageUrl}
                // onUpload={() =>
                //   setImages((prevImages: ImageRow[]) => {
                //     const newImages = [...prevImages];
                //     newImages[rowNum] = {
                //       ...images,
                //       [Object.keys(images).length]: "",
                //     };
                //     return newImages;
                //   })
                // }
                // uploadModalOpen={uploadModalOpen}
                // setUploadModalOpen={setUploadModalOpen}

                setClickedImageIndex={setClickedImageIndex}
                lastImage={index === Object.keys(images).at(-1)}
                ghost={editModeOpen && index === Object.keys(images).at(-1)}
                solidifyGhost={handleAddGhostImage}
                // onMouseEnter={
                //   index === Object.keys(images).at(-1)
                //     ? handleAddGhostImage
                //     : () => {}
                // }
                remove={() => handleRemoveImage(Number(index))}
              />
            ))}
          </div>

          {Object.keys(images).length ? (
            <input
              type="text"
              value={title}
              aria-label="Best X Title"
              onChange={(e) => setTitle(e.target.value)}
              className={`place-self-center border-none
       bg-transparent  text-center shadow-black 
       text-shadow ${lato.className}`}
            />
          ) : null}
        </div>
      ) : (
        <ImageUrlUploadModal
          currentImageUrl={images[clickedImageIndex]}
          onUpload={(index: number, newImageUrl: string) =>
            setImages((prevImages: ImageRow[]) => {
              //   console.log("rowNum inside handleNewImageUrl is", rowNum, prevImages);
              const newImages = [...prevImages];

              newImages[rowNum][index] = newImageUrl;
              return newImages;
            })
          }
          closeModal={() => setUploadModalOpen(false)}
          imageIndex={clickedImageIndex}
        />
      )}
    </div>
  );
}
