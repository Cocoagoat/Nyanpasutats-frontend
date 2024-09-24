import { ImageRow } from "@/app/interfaces";
import { range } from "@/utils/general";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function useLoadBestXImagesFromCookies(
  season: string,
  setWorstImages: (images: ImageRow[]) => void,
  setBestImages: (images: ImageRow[]) => void,
  setWorstImagesNotEmpty: (worstImagesNotEmpty: boolean[]) => void,
) {
  const username = useParams<{ username: string }>().username;
  useEffect(() => {
    let savedWorstImages = localStorage.getItem(
      `${username}_${season}_worstImages`,
    );
    let savedBestImages = localStorage.getItem(
      `${username}_${season}_bestImages`,
    );

    if (savedWorstImages) {
      setWorstImages(JSON.parse(savedWorstImages)); // ffs typescript
      let parsedSavedWorstImages = JSON.parse(savedWorstImages) as ImageRow[];
      if (!parsedSavedWorstImages) return;
      setWorstImagesNotEmpty(
        Array.from(
          range(0, parsedSavedWorstImages.length - 1, 1),
          (i: number) =>
            Object.keys(parsedSavedWorstImages[i]).length >= 1 ||
            (parsedSavedWorstImages[i][0] !== "" &&
              parsedSavedWorstImages[i][0] !== undefined),
        ),
      );
    }
    if (savedBestImages) {
      setBestImages(JSON.parse(savedBestImages));
    }
  }, []);
}
