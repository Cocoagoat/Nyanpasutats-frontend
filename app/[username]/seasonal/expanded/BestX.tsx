import { Dispatch, SetStateAction } from "react";
import BestXImages from "./BestXImages";
import { ImageRow } from "@/app/interfaces";

export default function BestX({
  bestImages,
  setBestImages,
  worstImages,
  setWorstImages,
  worstImagesNotEmpty,
  setWorstImagesNotEmpty,
}: {
  bestImages: ImageRow[];
  setBestImages: Dispatch<SetStateAction<ImageRow[]>>;
  worstImages: ImageRow[];
  setWorstImages: Dispatch<SetStateAction<ImageRow[]>>;
  worstImagesNotEmpty: boolean[];
  setWorstImagesNotEmpty: Dispatch<SetStateAction<boolean[]>>;
}) {
  function handleEmptyWorstImages(rowNum: number, value: boolean) {
    setWorstImagesNotEmpty((prevWorstImagesNotEmpty: boolean[]) => {
      const newWorstImagesNotEmpty = [...prevWorstImagesNotEmpty];
      newWorstImagesNotEmpty[rowNum] = value;
      return newWorstImagesNotEmpty;
    });
  }

  return (
    <>
      {Array.from({ length: bestImages.length }).map((_, i) => (
        <>
          <BestXImages
            key={i}
            images={worstImages[i]}
            setImages={setWorstImages}
            type="Worst"
            rowNum={i}
            setWorstImagesNotEmpty={handleEmptyWorstImages}
          />
          <BestXImages
            key={i + 100}
            images={bestImages[i]}
            setImages={setBestImages}
            type="Best"
            rowNum={i}
            worstImagesNotEmpty={worstImagesNotEmpty[i]}
          />
        </>
      ))}
    </>
  );
}
