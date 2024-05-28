// Refactor this with Reducer + Context later
import React, {
  Suspense,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  SeasonalContext,
  SingleSeasonContext,
} from "../../reducer/SeasonalContext";
import { getShowData } from "@/app/actions/getShowData";
import TierListRow from "./TierListRow";
import { useParams } from "next/navigation";
import TierListHeader from "./TierListHeader";
import TierListButton from "./TierListButton";
import {
  downloadCardAsImage,
  copyCardAsImage,
} from "@/utils/downloadCardAsImage";
import {
  RiCopyleftFill,
  RiCopyrightFill,
  RiDownload2Fill,
  RiFileCopy2Fill,
  RiFileCopyFill,
  RiFileCopyLine,
  RiLoaderFill,
} from "react-icons/ri";
import { MdClose } from "react-icons/md";
import { PiTextTBold } from "react-icons/pi";
import { ImageData, TiersState } from "@/app/interfaces";
import TierListRating from "./TierListRating";
import ToasterWithX from "@/components/general/ToasterWithX";
import useToast from "@/hooks/useToast";
import { get } from "http";
import springBackground from "@/public/SpringBackground.png";
import { TbTrash } from "react-icons/tb";

const tierColors: Record<number, string> = {
  1: "#440404",
  2: "#b71c1c",
  3: "#d84300",
  4: "#ef6c00",
  5: "#ffea00",
  6: "#eeff41",
  7: "#b3ff00",
  8: "#56ff03",
  9: "#00ff99",
  10: "#00b0ff",
};

export default function TierList({
  setSeasonGraphOpen,
}: {
  setSeasonGraphOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { season, seasonStats } = useContext(SingleSeasonContext)!;
  const { noSequels } = useContext(SeasonalContext)!;
  const [showText, setShowText] = useState(false);
  // const [imageUrls, setImageUrls] = useState([]);
  const [tiers, setTiers] = useState<TiersState>({});
  // const [ratingTexts, setRatingTexts] = useState<string[]>(
  //   Array.from({ length: 10 }, (_, i) => `${i + 1}/10`),
  // );
  const isFirstRender = useRef(true);
  const [deleteMode, setDeleteMode] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const imageLoadStatus = useRef<boolean[]>([]);
  const [objectWasDeleted, setObjectWasDeleted] = useState(false);
  const [ratingTexts, setRatingTexts] = useState<Record<number, string>>({
    1: "1/10",
    2: "2/10",
    3: "3/10",
    4: "4/10",
    5: "5/10",
    6: "6/10",
    7: "7/10",
    8: "8/10",
    9: "9/10",
    10: "10/10",
  });
  // const [maxRatingTextLength, setMaxRatingTextLength] = useState(0);
  const params = useParams<{ username: string }>();
  const { notifyError, notifySuccess } = useToast();

  // const tiers: Record<number, [string, string][]> = {};
  // for (let i = 1; i <= 10; i++) {
  //   tiers[i] = [];
  // }

  function getMaxRatingTextLength() {
    let maxLength = 0;
    // console.log("Entered getmax");
    for (const ratingText of Object.values(ratingTexts)) {
      console.log("Rating text is", ratingText);
      if (ratingText.length > maxLength) {
        maxLength = ratingText.length;
      }
    }
    console.log("Max length is", maxLength);
    return maxLength;
  }

  const handleImageLoad = (index: number) => {
    imageLoadStatus.current[index] = true;
    console.log(imageLoadStatus.current);
    // Check if all images have loaded
    if (imageLoadStatus.current.every((status) => status)) {
      setLoaded(true);
    }
  };

  const setRatingText = useCallback((index: number, text: string) => {
    setRatingTexts((prevTexts) => {
      const newRatingTexts = { ...prevTexts };
      newRatingTexts[index + 1] = text;
      return newRatingTexts;
    });
  }, []);

  useEffect(() => {
    async function getImageUrls() {
      const showList = seasonStats.ShowList;
      const showNames = Object.keys(showList);
      let imageUrls = await getShowData(showNames, "img_urls");
      // setImageUrls(imageUrls);
      console.log(imageUrls);
      let initialTiers: TiersState = {};
      for (let i = 1; i <= 10; i++) {
        initialTiers[i] = [];
      }

      Object.entries(showList).forEach(([name, score], index) => {
        const tier = Math.max(1, Math.round(score)); // In case someone has scores below 0.5 on Anilist
        if (score) {
          initialTiers[tier].push([showNames[index], imageUrls[index], tier]);
        } // Include the tier in the image data
      });

      setTiers(initialTiers);
      setLoaded(true);
      imageLoadStatus.current = Array(imageUrls.length).fill(false);
    }

    getImageUrls();
  }, []);

  // Object.entries(showList).forEach(([name, score], index) => {
  //   const tier = score;
  //   tiers[tier] = [
  //     ...(tiers[tier] || []),
  //     [showNames[index], imageUrls[index]],
  //   ];
  // });

  const handleDrop = (newTier: number, showData: ImageData) => {
    const oldTier = +showData[2];
    const newTiers = { ...tiers };
    // Remove from old tier
    newTiers[oldTier] = newTiers[oldTier].filter(
      (image) => image[0] !== showData[0],
    );
    // Add to new tier
    newTiers[newTier].push([showData[0], showData[1], newTier]);
    setTiers(newTiers);
  };

  function handleCloseTierList() {
    setSeasonGraphOpen(false);
  }

  function deleteShowFromTierList(index: number, tier: number) {
    const newTiers = { ...tiers };
    newTiers[tier] = newTiers[tier].filter((_, i) => i !== index);
    setTiers(newTiers);
    if (!objectWasDeleted) {
      setObjectWasDeleted(true);
    }
  }

  function deleteTierListRow(tier: number) {
    if (tiers[tier].length === 0) {
      const { [tier]: _, ...newTiers } = tiers; // Destructuring to omit the specific tier
      setTiers(newTiers);

      const { [tier]: __, ...newRatingTexts } = ratingTexts;
      console.log("New rating texts are", newRatingTexts);
      setRatingTexts(newRatingTexts);

      if (!objectWasDeleted) {
        setObjectWasDeleted(true);
      }
    } else {
      notifyError("Please move all shows from this tier before deleting it.");
    }
  }

  useEffect(() => {
    if (objectWasDeleted) {
      notifySuccess(`To add back the deleted tiers/shows,
       simply close and open the tier list again.`);
      // setObjectWasDeleted(false);
    }
  }, [objectWasDeleted]);

  console.log("Tiers are", tiers);

  return (
    <div
      className="fixed left-1/2 top-1/2 z-50 flex w-full -translate-x-1/2
     -translate-y-1/2 flex-col bg-zinc-800 xl:w-1/2"
    >
      <div className="right-0 top-0 flex justify-end gap-4 text-right ">
        <TierListButton
          onClick={() => setDeleteMode(!deleteMode)}
          descText="Delete tiers/shows"
        >
          <TbTrash />
        </TierListButton>
        <TierListButton
          onClick={() => setShowText(!showText)}
          descText="Display text"
        >
          <PiTextTBold />
        </TierListButton>
        <TierListButton
          onClick={() => {
            downloadCardAsImage(
              `${season} Tier List`,
              `${params.username} ${season} Tier List${noSequels ? " (No Sequels)" : ""}`,
            );
          }}
          descText="Download as image"
        >
          <RiDownload2Fill />
        </TierListButton>
        <TierListButton
          onClick={() => {
            copyCardAsImage(
              `${season} Tier List`,
              // `${params.username} ${season} Tier List${noSequels ? " (No Sequels)" : ""}`,
            );
          }}
          descText="Copy as image"
        >
          <RiFileCopyLine />
        </TierListButton>
        <TierListButton onClick={handleCloseTierList}>
          <MdClose />
        </TierListButton>
      </div>

      <div className="relative bg-zinc-800">
        <div
          className={`absolute z-50 h-[880px] -translate-y-1/2 ${loaded && "hidden"} w-full animate-pulse bg-zinc-600`}
        >
          <RiLoaderFill />
        </div>

        <Suspense
          fallback={
            <div className="z-50 h-[880px] w-full animate-pulse bg-zinc-600"></div>
          }
        >
          <div id={`${season} Tier List`} className=" w-full  bg-zinc-800">
            <TierListHeader season={season} loaded={loaded} />
            <div className="flex">
              <div
                className="flex w-20 flex-col"
                style={{ width: `${getMaxRatingTextLength() * 14 + 30}px` }}
              >
                {Object.keys(tiers)
                  .map(Number) // Convert keys to numbers
                  .sort((a, b) => b - a) // Sort numbers in descending order
                  .map((tier) => (
                    <TierListRating
                      key={tier}
                      color={tierColors[tier]}
                      initialScore={tier.toString()} // Assuming you want the score to be formatted as "n/10"
                      ratingText={ratingTexts[tier]} // Adjusted for zero-based index
                      deleteRow={() => deleteTierListRow(tier)}
                      deleteMode={deleteMode}
                      setRatingText={(text) => setRatingText(tier - 1, text)}
                    />
                  ))}
              </div>
              <div className="flex w-full flex-col ">
                {Object.entries(tiers)
                  .sort((a, b) => Number(b[0]) - Number(a[0]))
                  .map(([score, images], index) => (
                    <div key={index} className=" bg-zinc-800 ">
                      <TierListRow
                        key={index}
                        score={score}
                        images={images}
                        showText={showText}
                        deleteMode={deleteMode}
                        deleteShow={deleteShowFromTierList}
                        onLoadImage={handleImageLoad}
                        onDropImage={(showData: ImageData) =>
                          handleDrop(+score, showData)
                        }
                      />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </Suspense>
      </div>
    </div>
  );
}
