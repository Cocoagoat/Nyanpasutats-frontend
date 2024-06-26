import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import BestXImages from "./BestXImages";
import { RiArrowDownDoubleFill } from "react-icons/ri";
import CollapseToggle from "./CollapseToggle";
import useToast from "@/hooks/useToast";
import { ImageRow } from "./SeasonExpanded";
import { useSingleSeasonContext } from "../reducer/SeasonalContext";
import { range } from "@/utils/general";

export default function BestX2({
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
  //   const [rows, setRows] = useState(1);
  const { season } = useSingleSeasonContext()!;
  const [firstTimeRender, setFirstTimeRender] = useState(true);

  //
  function handleEmptyWorstImages(rowNum: number, value: boolean) {
    setWorstImagesNotEmpty((prevWorstImagesNotEmpty: boolean[]) => {
      const newWorstImagesNotEmpty = [...prevWorstImagesNotEmpty];
      newWorstImagesNotEmpty[rowNum] = value;
      return newWorstImagesNotEmpty;
    });
    // const newWorstImagesNotEmpty = [...worstImagesNotEmpty];
    // newWorstImagesNotEmpty[rowNum] = value;
    // setWorstImagesNotEmpty(newWorstImagesNotEmpty);
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
