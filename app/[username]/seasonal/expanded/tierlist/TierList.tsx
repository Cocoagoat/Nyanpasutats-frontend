// Refactor this with Reducer + Context later
import { getShowData } from "@/app/actions/getShowData";
import styles from "@/app/globals.module.css";
import { ImageData2, TiersState } from "@/app/interfaces";
import useToast from "@/hooks/useToast";
import useWindowSize from "@/hooks/useWindowSize";
import {
  copyCardAsImage,
  downloadCardAsImage,
} from "@/utils/downloadCardAsImage";
import { useParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { MdClose, MdColorLens } from "react-icons/md";
import { PiTextTBold } from "react-icons/pi";
import { RiDownload2Fill, RiFileCopyLine } from "react-icons/ri";
import { TbTrash } from "react-icons/tb";
import {
  SeasonalContext,
  SingleSeasonContext,
} from "../../reducer/SeasonalContext";
import TierListButton from "./TierListButton";
import TierListColorPicker from "./TierListColorPicker";
import TierListHeader from "./TierListHeader";
import TierListLoader from "./TierListLoader";
import TierListRating from "./TierListRating";
import TierListRow from "./TierListRow";

const initialTierColors: Record<number, string> = {
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

const initialRatingTexts: Record<number, string> = {
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
};

export default function TierList({
  setSeasonGraphOpen,
}: {
  setSeasonGraphOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { season, seasonStats } = useContext(SingleSeasonContext)!;
  const { noSequels } = useContext(SeasonalContext)!;

  const [showText, setShowText] = useState(false);
  const [tiers, setTiers] = useState<TiersState>({});
  const [colorMode, setColorMode] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const { width, height } = useWindowSize();

  const [objectWasDeleted, setObjectWasDeleted] = useState(false);
  const params = useParams<{ username: string }>();
  const { notifyError, notifySuccess } = useToast();
  const maxRowSize = getMaxRowSize();

  // Used for setting the width of the rating text input
  function getMaxRatingTextLength() {
    let maxLength = 0;
    for (const tier of Object.values(tiers)) {
      console.log("Rating text is", tier["text"]);
      if (tier["text"].length > maxLength) {
        maxLength = tier["text"].length;
      }
    }
    console.log("Max length is", maxLength);
    return maxLength;
  }

  // Used for setting the width of the tier list
  function getMaxRowSize() {
    let maxRowSize = 0;
    for (const tier in tiers) {
      if (tiers[tier]["imageData"].length > maxRowSize) {
        maxRowSize = tiers[tier]["imageData"].length;
      }
    }
    return maxRowSize;
  }

  // Function to handle dropping an image from one tier to another
  function handleDrop(newTier: number, showData: ImageData2) {
    const oldTier = +showData["tier"];
    const newTiers = { ...tiers };

    newTiers[oldTier]["imageData"] = newTiers[oldTier]["imageData"].filter(
      (image) => image["showName"] !== showData["showName"],
    );

    // newTiers[newTier].push([showData[0], showData[1], newTier]);
    newTiers[newTier]["imageData"].push({
      showName: showData["showName"],
      imageUrl: showData["imageUrl"],
      tier: newTier,
    });
    setTiers(newTiers);
  }

  function deleteShowFromTierList(index: number, tier: number) {
    const newTiers = { ...tiers };
    newTiers[tier]["imageData"] = newTiers[tier]["imageData"].filter(
      (_, i) => i !== index,
    );
    setTiers(newTiers);
    if (!objectWasDeleted) {
      setObjectWasDeleted(true);
    }
  }

  function deleteTierListRow(tier: number) {
    if (tiers[tier]["imageData"].length === 0) {
      const { [tier]: _, ...newTiers } = tiers; // Destructuring to omit the specific tier
      setTiers(newTiers);

      // const { [tier]: __, ...newRatingTexts } = ratingTexts;
      // console.log("New rating texts are", newRatingTexts);
      // setRatingTexts(newRatingTexts);

      if (!objectWasDeleted) {
        setObjectWasDeleted(true);
      }
    } else {
      notifyError("Please move all shows from this tier before deleting it.");
    }
  }

  useEffect(() => {
    async function getImageUrls() {
      const showList = seasonStats.ShowList;
      const showNames = Object.keys(showList);
      let imageUrls = await getShowData(showNames, "img_urls");
      console.log(imageUrls);
      let initialTiers: TiersState = {};
      for (let i = 1; i <= 10; i++) {
        initialTiers[i] = {
          imageData: [],
          color: initialTierColors[i],
          text: initialRatingTexts[i],
        };
      }

      Object.entries(showList).forEach(([name, score], index) => {
        const tier = Math.max(1, Math.round(score)); // In case someone has scores below 0.5 on Anilist
        if (score) {
          // initialTiers[tier].push([showNames[index], imageUrls[index], tier]);
          initialTiers[tier]["imageData"].push({
            showName: showNames[index],
            imageUrl: imageUrls[index],
            tier: tier,
          });
        }
      });

      setTiers(initialTiers);
      setLoaded(true);
    }

    getImageUrls();
  }, []);

  useEffect(() => {
    // We want the effect to run only the first time an object is deleted
    if (objectWasDeleted) {
      notifySuccess(`To add back the deleted tiers/shows,
       simply close and open the tier list again.`);
    }
  }, [objectWasDeleted]);

  return (
    <>
      {!loaded && (
        <TierListLoader width={width} height={height} maxRowSize={maxRowSize} />
      )}

      <div
        className={`fixed left-1/2  top-1/2 z-[500]  flex  -translate-x-1/2
         -translate-y-1/2 flex-col overflow-x-scroll 
         ${width < 1000 ? styles.hiddenscrollbarVerticalOnly : styles.hiddenscrollbar} 
         overflow-y-scroll  bg-zinc-800
             `}
        style={{
          maxHeight: `max(500px, ${height - 50}px)`,
          width:
            width > 1000 ? `max(1000px, ${maxRowSize * 65 + 100}px)` : "100%",
        }}
      >
        <div className="flex justify-end gap-4 text-right ">
          <TierListButton
            onClick={() => setColorMode(!colorMode)}
            descText="Change colors"
          >
            <MdColorLens />
          </TierListButton>
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
              copyCardAsImage(`${season} Tier List`);
            }}
            descText="Copy as image"
          >
            <RiFileCopyLine />
          </TierListButton>
          <TierListButton onClick={() => setSeasonGraphOpen(false)}>
            <MdClose />
          </TierListButton>
        </div>

        <div
          className="relative bg-zinc-800"
          style={{ width: `max(1000px, ${maxRowSize * 65 + 100}px)` }}
        >
          <div id={`${season} Tier List`} className=" w-full  bg-zinc-800">
            <TierListHeader season={season} loaded={loaded} />
            <div className="flex">
              <div
                className="flex w-20 flex-col"
                style={{ width: `${getMaxRatingTextLength() * 14 + 30}px` }}
              >
                {Object.keys(tiers)
                  .map(Number)
                  .sort((a, b) => b - a)
                  .map((tier) => (
                    <TierListRating
                      key={tier}
                      color={tiers[tier]["color"]}
                      initialScore={tier.toString()}
                      ratingText={tiers[tier]["text"]}
                      deleteRow={() => deleteTierListRow(tier)}
                      deleteMode={deleteMode}
                      setRatingText={(text) =>
                        setTiers((prev) => {
                          return {
                            ...prev,
                            [tier]: { ...prev[tier], text: text },
                          };
                        })
                      }
                    />
                  ))}
              </div>
              {!colorMode ? (
                <div className="flex w-full flex-col ">
                  {Object.entries(tiers)
                    .sort((a, b) => Number(b[0]) - Number(a[0]))
                    .map(([score, images], index) => (
                      <div key={index} className=" bg-zinc-800 ">
                        <TierListRow
                          key={index}
                          score={score}
                          images={images["imageData"]}
                          showText={showText}
                          deleteMode={deleteMode}
                          deleteShow={deleteShowFromTierList}
                          onDropImage={(showData: ImageData2) =>
                            handleDrop(+score, showData)
                          }
                        />
                      </div>
                    ))}
                </div>
              ) : (
                <TierListColorPicker
                  currentTierColors={Object.fromEntries(
                    Object.entries(tiers).map(([tier, tierData]) => [
                      Number(tier),
                      tierData["color"],
                    ]),
                  )}
                  setCurrentTiers={setTiers}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
