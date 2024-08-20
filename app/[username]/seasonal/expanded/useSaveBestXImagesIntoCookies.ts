import { ImageRow } from "@/app/interfaces";
import useSetCookie from "../../../../hooks/useSetCookie";
import { useParams } from "next/navigation";

function imagesAreEmpty(images: ImageRow[]) {
  for (const imageRow of images) {
    for (const key in imageRow) {
      if (imageRow[key] !== "") {
        return false;
      }
    }
  }
  return true;
}
export default function useSaveBestXImagesIntoCookies(
  images: ImageRow[],
  season: string,
  type: "best" | "worst",
) {
  const username = useParams<{ username: string }>().username;
  console.log(`${username}_${season}_${type}Images`);
  useSetCookie(
    `${username}_${season}_${type}Images`,
    JSON.stringify(images),
    [images],
    !imagesAreEmpty(images) || images.length > 1,
  );
}
