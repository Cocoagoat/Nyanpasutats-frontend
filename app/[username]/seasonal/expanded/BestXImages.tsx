import { ImageRow } from "@/app/interfaces";
import { Lato } from "next/font/google";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { SingleSeasonContext } from "../reducer/SeasonalContext";
import BestXImage from "./BestXImage";

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

  const initialTitle =
    type === "Best" ? `Best ${rowSubject}` : `Worst ${rowSubject}`;

  const [clickedImageIndex, setClickedImageIndex] = useState(0);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [title, setTitle] = useState(initialTitle);
  const { editModeOpen } = useContext(SingleSeasonContext)!;
  const hasMounted = useRef(false);

  useEffect(() => {
    // If the component is mounting for the first time and rowNum==0, that means
    // the user has just expanded the seasonal card for the first time. In this
    // case, no need to add or remove an image.
    if (!hasMounted.current) {
      hasMounted.current = true;
      if (rowNum === 0 || !editModeOpen) {
        return;
      }
    }

    // Otherwise, we want to add an image (which will be a "ghost" image that
    // the user click on to "solidify" it to exist even after edit mode is closed)
    // whenever the user opens edit mode and remove it when the user exits edit mode.
    if (editModeOpen) {
      handleAddImage(); // Always adds to the end regardless
    } else {
      handleRemoveGhostImage();
    }
  }, [editModeOpen]);

  function handleRemoveGhostImage() {
    const keys = Object.keys(images);
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
      return newImages;
    });

    if (type === "Worst" && Object.keys(newBestImages).length === 0) {
      setWorstImagesNotEmpty && setWorstImagesNotEmpty(rowNum, false);
    }
  }

  function handleAddImage() {
    if (Object.keys(images).length === 1) {
      setWorstImagesNotEmpty && setWorstImagesNotEmpty(rowNum, true);
    }
    setImages((prevImages: ImageRow[]) => {
      const newImages = [...prevImages];
      newImages[rowNum] = { ...images, [Object.keys(images).length]: "" };
      return newImages;
    });
  }

  function handleNewImageUrl(newImageUrl: string) {
    setImages((prevImages: ImageRow[]) => {
      const newImages = [...prevImages];
      newImages[rowNum][clickedImageIndex] = newImageUrl;
      return newImages;
    });
  }

  return (
    <div
      className={`group relative ${
        type === "Worst"
          ? !editModeOpen && Object.keys(images).length === 0 // && lastIsGhost
            ? "hidden"
            : "col-span-1 col-start-1"
          : editModeOpen || worstImagesNotEmpty
            ? "col-span-2 col-start-2"
            : "col-span-3 col-start-1"
      } 
      h-full w-full`}
    >
      <div className="flex flex-col">
        <div className="flex flex-wrap justify-center gap-4 text-sky-550">
          {Object.entries(images).map(([index, image_url], _) => (
            <BestXImage
              index={Number(index)}
              key={_}
              image_url={image_url as string}
              setUploadModalOpen={setUploadModalOpen}
              handleNewImageUrl={handleNewImageUrl}
              setClickedImageIndex={setClickedImageIndex}
              lastImage={index === Object.keys(images).at(-1)}
              ghost={editModeOpen && index === Object.keys(images).at(-1)}
              solidifyGhost={handleAddImage}
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
            className={`mt-1 place-self-center
       border-none  bg-transparent text-center shadow-black 
       text-shadow ${lato.className}`}
          />
        ) : null}
      </div>
    </div>
  );
}
