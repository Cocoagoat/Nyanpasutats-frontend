import React, {
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
import { downloadCardAsImage } from "@/utils/downloadCardAsImage";
import { RiDownload2Fill } from "react-icons/ri";
import { MdClose } from "react-icons/md";
import { PiTextTBold } from "react-icons/pi";
import { ImageData, TiersState } from "@/app/interfaces";
import TierListRating from "./TierListRating";
import ToasterWithX from "@/components/general/ToasterWithX";
import useToast from "@/hooks/useToast";
import { get } from "http";
import springBackground from "@/public/SpringBackground.png";

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

  // useEffect(() => {
  //   setMaxRatingTextLength(getMaxRatingTextLength());
  //   console.log("maxRatingTextLength is", getMaxRatingTextLength());
  // }, [tiers, ratingTexts, Object.keys(tiers).length]);

  // Turn maxratingtextlength into state

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
      // console.log(imageUrls);
      let initialTiers: TiersState = {};
      for (let i = 1; i <= 10; i++) {
        initialTiers[i] = [];
      }

      Object.entries(showList).forEach(([name, score], index) => {
        const tier = score;
        initialTiers[tier].push([showNames[index], imageUrls[index], tier]); // Include the tier in the image data
      });

      setTiers(initialTiers);
      console.log("end of getImageUrls/useEffect");
      console.log(JSON.stringify(initialTiers, null, 2));
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

  function deleteTierListRow(tier: number) {
    if (tiers[tier].length === 0) {
      const { [tier]: _, ...newTiers } = tiers; // Destructuring to omit the specific tier
      setTiers(newTiers);

      const { [tier]: __, ...newRatingTexts } = ratingTexts;
      console.log("New rating texts are", newRatingTexts);
      setRatingTexts(newRatingTexts);

      if (Object.keys(tiers).length === 10) {
        notifySuccess(
          "To add back the deleted tiers, simply close and open the tier list again.",
        );
      }
    } else {
      notifyError("Please move all shows from this tier before deleting it.");
    }
  }

  console.log("Tiers are", tiers);

  return (
    <div
      className="fixed left-1/2 top-1/2 z-50 flex w-full -translate-x-1/2
     -translate-y-1/2 flex-col bg-zinc-800 xl:w-1/2"
    >
      <div className="right-0 top-0 text-right ">
        <TierListButton onClick={() => setShowText(!showText)}>
          <PiTextTBold />
        </TierListButton>
        <TierListButton
          onClick={() => {
            setTimeout(() => {
              downloadCardAsImage(
                `${season} Tier List`,
                `${params.username} ${season} Tier List${noSequels ? " (No Sequels)" : ""}`,
              );
            }, 1000);
          }}
        >
          <RiDownload2Fill />
        </TierListButton>
        <TierListButton onClick={handleCloseTierList}>
          <MdClose />
        </TierListButton>
      </div>
      <div
        id={`${season} Tier List`}
        className="bg-zinc-800"
        // style={{
        //   backgroundImage: `url(${springBackground.src})`,
        //   backgroundSize: "cover",
        // }}
      >
        <TierListHeader season={season} />
        <div className="flex">
          <div
            className="flex w-20 flex-col "
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
                  setRatingText={(text) => setRatingText(tier - 1, text)}
                />
              ))}
          </div>
          <div className="flex w-full flex-col">
            {Object.entries(tiers)
              .sort((a, b) => Number(b[0]) - Number(a[0]))
              .map(([score, images], index) => (
                <div key={index} className=" bg-zinc-800 ">
                  <TierListRow
                    key={index}
                    color={tierColors[index + 1]}
                    score={score}
                    images={images}
                    showText={showText}
                    onDropImage={(showData: ImageData) =>
                      handleDrop(+score, showData)
                    }
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
