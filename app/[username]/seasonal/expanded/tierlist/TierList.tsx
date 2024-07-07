// Refactor this with Reducer + Context later
import { getShowData } from "@/app/actions/getShowData";
import styles from "@/app/globals.module.css";
import _ from "lodash";
import {
  ImageData2,
  TiersState,
  ImageData,
  ShowToDisplay,
} from "@/app/interfaces";
import useToast from "@/hooks/useToast";
import useWindowSize from "@/hooks/useWindowSize";
import {
  copyCardAsImage,
  downloadCardAsImage,
} from "@/utils/downloadCardAsImage";
import { useParams } from "next/navigation";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  MdClose,
  MdColorLens,
  MdCompress,
  MdDoubleArrow,
  MdExpandCircleDown,
  MdExpandMore,
  MdHorizontalRule,
} from "react-icons/md";
import {
  PiArrowsHorizontalBold,
  PiFadersHorizontalFill,
  PiSlidersHorizontal,
  PiTextTBold,
} from "react-icons/pi";
import {
  RiDownload2Fill,
  RiExpandLeftFill,
  RiExpandRightFill,
  RiFileCopyLine,
} from "react-icons/ri";
import {
  TbArrowsMoveHorizontal,
  TbCarouselHorizontalFilled,
  TbLayoutNavbarExpandFilled,
  TbTrash,
} from "react-icons/tb";
import { FaExpandArrowsAlt, FaCompressArrowsAlt } from "react-icons/fa";
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
import Image from "next/image";
import { initialTierColors } from "../SeasonExpanded";

type TierMode = "normal" | "collapsed" | "expanded";

export default function TierList({
  tiers,
  setTiers,
  imagesLoaded,
  setSeasonGraphOpen,
}: {
  tiers: TiersState;
  setTiers: React.Dispatch<React.SetStateAction<TiersState>>;
  imagesLoaded: boolean;
  setSeasonGraphOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { season, seasonStats } = useContext(SingleSeasonContext)!;
  const { noSequels } = useContext(SeasonalContext)!;
  const initialTiers = useRef(tiers);
  const [showText, setShowText] = useState(false);
  // const [tiers, setTiers] = useState<TiersState>({});
  // const [deletedImages, setDeletedImages] = useState<ImageData[]>([]);
  const [colorMode, setColorMode] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const { width, height } = useWindowSize();
  const [tierMode, setTierMode] = useState<TierMode>("normal");

  const [objectWasDeleted, setObjectWasDeleted] = useState(false);
  const params = useParams<{ username: string }>();
  const { notifyError, notifySuccess } = useToast();
  const maxRowSize = getMaxRowSize();

  // Used for setting the width of the rating text input
  function getMaxRatingTextLength() {
    let maxLength = 0;
    for (const tier of Object.values(tiers)) {
      // console.log("Rating text is", tier["text"]);
      if (tier["text"].length > maxLength) {
        maxLength = tier["text"].length;
      }
    }
    // console.log("Max length is", maxLength);
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

  function toggleTiers(toggle: "expand" | "collapse") {
    if (toggle === "expand") {
      const expandTo = Object.keys(tiers).length <= 5 ? 10 : 20;
      if (expandTo === 10) {
        setTiers(initialTiers.current);
        return;
      } else {
        for (let i = 0.5; i <= expandTo / 2; i += 0.5) {
          let index = (i * 20) / expandTo;
          setTiers((prev) => {
            if (prev[index]) {
              return {
                ...prev,
                [index]: {
                  ...prev[index],
                  color: initialTierColors[index],
                  text: `${index}/10`,
                },
              };
            } else
              return {
                ...prev,
                [index]: {
                  ...prev[index],
                  imageData: [],
                  color: initialTierColors[index],
                  text: `${index}/10`,
                },
              };
          });
        }
      }
      // setTierMode(expandTo === 10 ? "normal" : "expanded");
    } else {
      const collapseTo = Object.keys(tiers).length <= 10 ? 5 : 10;
      let newTiers = {} as TiersState;

      for (let i = 1; i <= collapseTo; i++) {
        const index = (i * 10) / collapseTo;
        if (tiers[index]) {
          let oldImageData = tiers[index]["imageData"].map((imageData) => {
            return { ...imageData, score: i };
          });
          let lowerImageData = [] as ShowToDisplay[];
          if (tiers[index - (0.5 * 10) / collapseTo]) {
            lowerImageData = tiers[index - (0.5 * 10) / collapseTo][
              "imageData"
            ].map((imageData) => {
              return { ...imageData, score: i };
            });
          }

          newTiers[i] = {
            ...newTiers[index],
            imageData: [...oldImageData, ...lowerImageData],
            color: initialTierColors[index],
            text: `${i}/${collapseTo}`,
          };
          // delete newTiers[index - (0.5 * 10) / collapseTo];
        } else {
          delete newTiers[index];
          newTiers[i] = {
            imageData: [],
            color: initialTierColors[index],
            text: `${i}/${collapseTo}`,
          };
        }
      }

      setTiers(newTiers);
      setTierMode(collapseTo === 5 ? "collapsed" : "normal");
    }
    setTiers((prev) => {
      const sortedTiers = Object.entries(prev).sort(
        (a, b) => Number(b[0]) - Number(a[0]),
      );
      return Object.fromEntries(sortedTiers);
    });
  }
  console.log("Tiers are", tiers);

  // Function to handle dropping an image from one tier to another
  function handleDrop(newTier: number, showData: ShowToDisplay) {
    let oldTier = +showData["score"];
    console.log(showData);

    // if (tierMode === "collapsed") {
    //   console.log(
    //     "newTier, oldTier, tierMode before",
    //     newTier,
    //     oldTier,
    //     tierMode,
    //   );
    //   oldTier = Math.ceil(oldTier / 2);
    //   // newTier = Math.ceil(newTier / 2);
    //   console.log(
    //     "newTier, oldTier, tierMode after",
    //     newTier,
    //     oldTier,
    //     tierMode,
    //   );
    // }

    const newTiers = { ...tiers };

    newTiers[oldTier]["imageData"] = newTiers[oldTier]["imageData"].filter(
      (image) => image["name"] !== showData["name"],
    );

    // newTiers[newTier].push([showData[0], showData[1], newTier]);
    newTiers[newTier]["imageData"].push({
      name: showData["name"],
      imageUrl: showData["imageUrl"],
      score: newTier,
      displayed: showData["displayed"],
    });
    setTiers(newTiers);
  }

  function toggleShowDeleted(index: number, tier: number) {
    // const deletedImage = tiers[tier]["imageData"][index];
    // setDeletedImages((prev) => [...prev, deletedImage]);
    // console.log("Deleted show is", tiers[tier]["imageData"][index]);
    // console.log(
    //   "Test2",
    //   tiers[tier]["imageData"],
    //   index,
    //   tiers[tier]["imageData"][index],
    // );
    const newTiers = { ...tiers };
    // newTiers[tier]["imageData"] = newTiers[tier]["imageData"].filter(
    //   (_, i) => i !== index,
    // );
    newTiers[tier]["imageData"][index]["displayed"] =
      !newTiers[tier]["imageData"][index]["displayed"];

    // setDeletedImages((prev) => [...prev, tiers[tier]["imageData"][index]]);
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

  // useEffect(() => {
  //   async function getImageUrls() {
  //     const showList = seasonStats.ShowList;
  //     const showNames = Object.keys(showList);
  //     let imageUrls = await getShowData(showNames, "img_urls");
  //     // console.log(imageUrls);
  //     let initialTiers: TiersState = {};
  //     for (let i = 1; i <= 10; i++) {
  //       initialTiers[i] = {
  //         imageData: [],
  //         color: initialTierColors[i],
  //         text: initialRatingTexts[i],
  //       };
  //     }

  //     Object.entries(showList).forEach(([name, score], index) => {
  //       const tier = Math.max(1, Math.round(score)); // In case someone has scores below 0.5 on Anilist
  //       if (score) {
  //         // initialTiers[tier].push([showNames[index], imageUrls[index], tier]);
  //         initialTiers[tier]["imageData"].push({
  //           showName: showNames[index],
  //           imageUrl: imageUrls[index],
  //           tier: tier,
  //           deleted: false,
  //         });
  //       }
  //     });

  //     setTiers(initialTiers);
  //     setLoaded(true);
  //   }

  //   getImageUrls();
  // }, []);

  useEffect(() => {
    // We want the effect to run only the first time an object is deleted
    if (objectWasDeleted) {
      notifySuccess(`To add back the deleted tiers/shows,
       simply close and open the tier list again.`);
    }
  }, [objectWasDeleted]);

  return (
    <>
      {!imagesLoaded && (
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
            onClick={
              Object.keys(tiers).length < 20
                ? () => toggleTiers("expand")
                : () => {}
            }
            descText="Expand tier list"
          >
            <FaExpandArrowsAlt />
          </TierListButton>
          <TierListButton
            onClick={
              Object.keys(tiers).length > 5
                ? () => toggleTiers("collapse")
                : () => {}
            }
            descText="Collapse tier list"
          >
            <FaCompressArrowsAlt />
          </TierListButton>
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
            <TierListHeader season={season} loaded={true} />
            <div className="flex">
              <div
                className="flex w-20 flex-col"
                style={{
                  width: `max(90px, ${getMaxRatingTextLength() * 14 + 30}px)`,
                }}
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
                          deleteShow={toggleShowDeleted}
                          onDropImage={(showData: ShowToDisplay) =>
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
