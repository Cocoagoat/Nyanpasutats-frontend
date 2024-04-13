import React, { Suspense, use, useContext, useEffect, useState } from "react";
import {
  SeasonalContext,
  SingleSeasonContext,
} from "../../reducer/SeasonalContext";
import { getShowData } from "@/app/actions/getShowData";
import Image from "next/image";
import ImageWithPlaceholder from "./TierListImage";
import TierListRating from "./TierListRating";
import TierListRow from "./TierListRow";
import { useParams } from "next/navigation";
import { Lato } from "next/font/google";
import TierListHeader from "./TierListHeader";
import TierListButton from "./TierListButton";
import { downloadCardAsImage } from "@/utils/downloadCardAsImage";
import { RiDownload2Fill } from "react-icons/ri";
import { MdClose, MdTextSnippet } from "react-icons/md";
import { PiTextTBold } from "react-icons/pi";
const latoBold = Lato({ weight: "900", subsets: ["latin"] });

// export type ShowToDisplay = {
//   imageUrl: string;
//   score: number;
//   displayed: boolean;
//   name: string;
// };

// type TierListProps = {
//   shows: ShowToDisplay[];
//   tierColors: string[];
// };

async function getShowListImageUrls(showList: string[]) {
  return await getShowData(showList, "img_urls");
}

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
  // Group shows by score into tiers
  const { season, seasonStats } = useContext(SingleSeasonContext)!;
  const { noSequels } = useContext(SeasonalContext)!;
  const [showText, setShowText] = useState(false);
  const [imageUrls, setImageUrls] = useState([]);
  const params = useParams<{ username: string }>();
  const tiers: Record<number, [string, string][]> = {};
  for (let i = 1; i <= 10; i++) {
    tiers[i] = [];
  }

  const showList = seasonStats.ShowList;
  const showNames = Object.keys(showList);

  useEffect(() => {
    async function getImageUrls() {
      let imageUrls = await getShowData(showNames, "img_urls");
      setImageUrls(imageUrls);
    }
    getImageUrls();
  }, []);

  Object.entries(showList).forEach(([name, score], index) => {
    const tier = score;
    tiers[tier] = [
      ...(tiers[tier] || []),
      [showNames[index], imageUrls[index]],
    ];
  });

  function handleCloseTierList() {
    setSeasonGraphOpen(false);
  }

  //   const imageUrls = await getShowData(showNames, "img_urls");
  //   const namesToImageUrls = [...showNames].reduce(
  //     (acc, name, index) => {
  //       acc[name] = imageUrls[index];
  //       return acc;
  //     },
  //     {} as Record<string, string>,
  //   );
  //   console.log(namesToImageUrls);

  return (
    // <div>pain</div>
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
            }, 1000); // This will delay the function call by 3000 milliseconds (3 seconds)
          }}
        >
          <RiDownload2Fill />
        </TierListButton>
        <TierListButton onClick={handleCloseTierList}>
          <MdClose />
        </TierListButton>
      </div>
      <div id={`${season} Tier List`}>
        <TierListHeader season={season} />
        {Object.entries(tiers).map(([score, images], index) => (
          <div key={index} className="bg-zinc-800 ">
            <TierListRow
              key={index}
              color={tierColors[index + 1]}
              score={score}
              images={images}
              showText={showText}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
