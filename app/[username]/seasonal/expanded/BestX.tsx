import React, { useContext, useState } from "react";
import BestXImage from "./BestXImage";
import { SingleSeasonContext } from "../reducer/SeasonalContext";
import UploadImageModal from "./UploadImageModal";
import ImageUrlUploadModal from "./ImageUrlUploadModal";
import { Lato } from "next/font/google";
const lato = Lato({ weight: "700", subsets: ["latin"] });

type BestImages = {
  [key: string]: string;
};

export default function BestX(
  {
    //   uploadModalOpen,
    //   setUploadModalOpen,
  }: {
    //   uploadModalOpen: boolean;
    //   setUploadModalOpen: (value: boolean) => void;
  },
) {
  const [bestImages, setBestImages] = useState<BestImages>({
    0: "",
    1: "",
    2: "",
    3: "",
    4: "",
  });

  const [worstImages, setWorstImages] = useState<BestImages>({
    0: "",
  });

  const [leftTitle, setLeftTitle] = useState("Worst Girl");
  const [rightTitle, setRightTitle] = useState("Best Girls");
  const [lastIsGhost, setLastIsGhost] = useState(false);
  const [leftSideRemoved, setLeftSideRemoved] = useState(false);
  console.log(Object.keys(bestImages).at(-1));

  function handleNewImageUrl(index: number, newImageUrl: string) {
    setBestImages((prev) => ({ ...prev, [index]: newImageUrl }));
  }

  function handleRemoveImage(index: number) {
    const newBestImages: BestImages = {};
    for (let i = 0; i < Object.keys(bestImages).length; i++) {
      if (i === index) continue;
      newBestImages[i] = bestImages[i];
    }
    setBestImages(newBestImages);
    if (index === 0) {
      setLeftSideRemoved(true);
    }
  }

  function handleAddGhostImage() {
    if (!lastIsGhost) {
      setBestImages((prev) => ({
        ...prev,
        [Object.keys(prev).length]: "",
      }));
    }
    setLastIsGhost(true);
  }

  function handleRemoveGhostImage() {
    if (lastIsGhost) {
      const keys = Object.keys(bestImages);
      if (keys.length === 0) return;

      handleRemoveImage(Number(keys.at(-1)));
      setLastIsGhost(false);
    }
  }

  const [clickedImageIndex, setClickedImageIndex] = useState(0);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  return (
    <>
      <div className={`group relative col-span-1 col-start-1 h-full w-full`}>
        <div className="flex flex-col">
          {!leftSideRemoved && (
            <div className="flex flex-wrap justify-center gap-4">
              {Object.entries(worstImages).map(([index, image_url], _) => (
                <BestXImage
                  index={Number(index)}
                  key={index}
                  image_url={image_url}
                  setUploadModalOpen={setUploadModalOpen}
                  onUpload={handleNewImageUrl}
                  // uploadModalOpen={uploadModalOpen}
                  // setUploadModalOpen={setUploadModalOpen}

                  setClickedImageIndex={setClickedImageIndex}
                  lastImage={index === Object.keys(bestImages).at(-1)}
                  ghost={
                    lastIsGhost && index === Object.keys(bestImages).at(-1)
                  }
                  solidifyGhost={() => setLastIsGhost(false)}
                  onMouseEnter={
                    index === Object.keys(bestImages).at(-1)
                      ? handleAddGhostImage
                      : () => {}
                  }
                  remove={() => handleRemoveImage(Number(index))}
                />
              ))}
              <input
                type="text"
                value={leftTitle}
                aria-label="Best X Title"
                onChange={(e) => setRightTitle(e.target.value)}
                className={`absolute bottom-0 col-span-1 place-self-center border-none
             bg-transparent p-1 text-center text-lg shadow-black 
             text-shadow ${lato.className}`}
              />
            </div>
          )}
        </div>
      </div>
      <div
        className={`row-start-4 ${
          leftSideRemoved ? "col-span-3 col-start-1" : "col-span-2 col-start-2"
        } group relative h-full w-full`}
      >
        {!uploadModalOpen ? (
          <div className="flex flex-col">
            <div
              className="flex flex-wrap justify-center gap-4 "
              onMouseLeave={handleRemoveGhostImage}
            >
              {Object.entries(bestImages).map(([index, image_url], _) => (
                <BestXImage
                  index={Number(index)}
                  key={index}
                  image_url={image_url}
                  setUploadModalOpen={setUploadModalOpen}
                  onUpload={handleNewImageUrl}
                  // uploadModalOpen={uploadModalOpen}
                  // setUploadModalOpen={setUploadModalOpen}

                  setClickedImageIndex={setClickedImageIndex}
                  lastImage={index === Object.keys(bestImages).at(-1)}
                  ghost={
                    lastIsGhost && index === Object.keys(bestImages).at(-1)
                  }
                  solidifyGhost={() => setLastIsGhost(false)}
                  onMouseEnter={
                    index === Object.keys(bestImages).at(-1)
                      ? handleAddGhostImage
                      : () => {}
                  }
                  remove={() => handleRemoveImage(Number(index))}
                />
              ))}
            </div>
            <input
              type="text"
              value={rightTitle}
              aria-label="Best X Title"
              onChange={(e) => setRightTitle(e.target.value)}
              className={`col-span-1 place-self-center border-none
             bg-transparent p-1 text-center text-lg shadow-black 
             text-shadow ${lato.className}`}
            />
          </div>
        ) : (
          // <div className=" h-full w-full bg-zinc-800">
          <ImageUrlUploadModal
            onUpload={handleNewImageUrl}
            closeModal={() => setUploadModalOpen(false)}
            imageIndex={clickedImageIndex}
          />
          // </div>
        )}
      </div>
    </>
  );
}
