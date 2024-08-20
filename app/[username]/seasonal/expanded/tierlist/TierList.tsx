// Refactor this with Reducer + Context later?
import styles from "@/app/globals.module.css";
import { ShowToDisplay, TiersState } from "@/app/interfaces";
import { useNotify } from "@/hooks/useNotify";
import useToast from "@/hooks/useToast";
import useWindowSize from "@/hooks/useWindowSize";
import React, { useContext, useState } from "react";
import { SingleSeasonContext } from "../../reducer/SeasonalContext";
import ImageUrlUploadModal from "../ImageUrlUploadModal";
import { initialTierColors } from "../SeasonExpanded";
import TierListColorPicker from "./TierListColorPicker";
import TierListHeader from "./TierListHeader";
import TierListLoader from "./TierListLoader";
import TierListRating from "./TierListRating";
import TierListRow from "./TierListRow";
import TierListToolbar from "./TierListToolbar";
import useSaveTierListIntoCookies from "./useSaveTierListIntoCookies";

export default function TierList({
  tiersFromRef,
  imagesLoaded,
  setSeasonGraphOpen,
}: {
  tiersFromRef: TiersState;
  imagesLoaded: boolean;
  setSeasonGraphOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [tiers, setTiers] = useState(tiersFromRef);
  const tiersFromRefCopy = JSON.parse(JSON.stringify(tiersFromRef));
  // Deep copy to avoid reference issues
  const [initialTiers, setInitialTiers] = useState(tiersFromRefCopy);

  const { season } = useContext(SingleSeasonContext)!;

  const [showText, setShowText] = useState(false);
  const [colorMode, setColorMode] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const [addImageMode, setAddImageMode] = useState(false);

  const { width, height } = useWindowSize();
  const [objectWasDeleted, setObjectWasDeleted] = useState(false);
  const { notifyError, notifySuccess } = useToast();
  const maxRowSize = getMaxRowSize();

  // Used for setting the width of the rating text input
  function getMaxRatingTextLength() {
    let maxLength = 0;
    for (const tier of Object.values(tiers)) {
      if (tier["text"].length > maxLength) {
        maxLength = tier["text"].length;
      }
    }
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

  function resetTierList() {
    const deepCopiedInitialTiers = JSON.parse(JSON.stringify(initialTiers));
    setTiers(deepCopiedInitialTiers);
  }

  function addImageToTierList(imageUrl: string, showName: string) {
    const newTiers = { ...tiers };
    const newInitialTiers = { ...initialTiers };
    let keys = Object.keys(newTiers);
    let maxKeyValue = Math.max(...keys.map(Number));
    const newShow = {
      name: showName,
      imageUrl: imageUrl,
      score: maxKeyValue,
      displayed: false,
    };
    newTiers[maxKeyValue]["imageData"].push(newShow);
    newInitialTiers[maxKeyValue]["imageData"].push(newShow);
    setTiers(newTiers);
    setInitialTiers(newInitialTiers);
  }

  function expandTierList() {
    if (Object.keys(tiers).length === 20) return; // Already expanded
    const expandTo = Object.keys(tiers).length <= 5 ? 10 : 20;
    if (expandTo === 10) {
      let originalTiers = { ...tiers };
      let newTiers = {} as TiersState;
      for (let i = 1; i <= 5; i += 1) {
        let oldTier = originalTiers[i];
        oldTier["imageData"].forEach((imageData) => {
          imageData["score"] = 2 * i;
        });

        newTiers[2 * i - 1] = {
          imageData: [],
          color: initialTierColors[2 * i - 1],
          text: `${2 * i - 1}/10`,
        };
        newTiers[2 * i] = {
          imageData: oldTier["imageData"],
          color: initialTierColors[2 * i],
          text: `${2 * i}/10`,
        };
      }
      setTiers(newTiers);
    } else {
      for (let i = 0.5; i <= 10; i += 0.5) {
        // let index = (i * 20) / expandTo;
        setTiers((prev) => {
          // If the tier already exists (full numbers like 7/10 in case
          // they haven't been deleted by the user), just update the text and color.
          if (prev[i]) {
            return {
              ...prev,
              [i]: {
                ...prev[i],
                color: initialTierColors[i],
                text: `${i}/10`,
              },
            };
          }
          // If it's a tier that doesn't exist in the 10-tier version (5.5, 7.5 etc),
          // create an empty one with the correspoinding color and text.
          else
            return {
              ...prev,
              [i]: {
                ...prev[i],
                imageData: [],
                color: initialTierColors[i],
                text: `${i}/10`,
              },
            };
        });
      }
    }
    sortTiers();
  }

  function contractTierList() {
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
    sortTiers();
  }

  function sortTiers() {
    setTiers((prev) => {
      const sortedTiers = Object.entries(prev).sort(
        (a, b) => Number(b[0]) - Number(a[0]),
      );
      return Object.fromEntries(sortedTiers);
    });
  }

  // Function to handle dropping an image from one tier to another
  function handleDrop(newTier: number, showData: ShowToDisplay) {
    let oldTier = +showData["score"];
    const newTiers = { ...tiers };
    newTiers[oldTier]["imageData"] = newTiers[oldTier]["imageData"].filter(
      (image) => image["imageUrl"] !== showData["imageUrl"],
    );
    newTiers[newTier]["imageData"].push({
      name: showData["name"],
      imageUrl: showData["imageUrl"],
      score: newTier,
      displayed: showData["displayed"],
    });
    setTiers(newTiers);
  }

  function toggleShowDeleted(index: number, tier: number) {
    const newTiers = { ...tiers };
    newTiers[tier]["imageData"][index]["displayed"] =
      !newTiers[tier]["imageData"][index]["displayed"];
    setTiers(newTiers);
    if (!objectWasDeleted) {
      setObjectWasDeleted(true);
    }
  }

  function deleteTierListRow(tier: number) {
    if (tiers[tier]["imageData"].length === 0) {
      const { [tier]: _, ...newTiers } = tiers;
      setTiers(newTiers);
      if (!objectWasDeleted) {
        setObjectWasDeleted(true);
      }
    } else {
      notifyError("Please move all shows from this tier before deleting it.");
    }
  }

  const successMessage = `To add back the deleted tiers/shows,
   simply close and open the tier list again.`;
  useNotify(
    notifySuccess,
    successMessage,
    [objectWasDeleted],
    objectWasDeleted,
  );

  useSaveTierListIntoCookies(tiers, season);
  // Loading from cookies is done in SeasonExpanded
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
        <TierListToolbar
          tiersLength={Object.keys(tiers).length}
          expandTierList={expandTierList}
          contractTierList={contractTierList}
          colorMode={colorMode}
          setColorMode={setColorMode}
          deleteMode={deleteMode}
          setDeleteMode={setDeleteMode}
          addImageMode={addImageMode}
          setAddImageMode={setAddImageMode}
          showText={showText}
          setShowText={setShowText}
          setSeasonGraphOpen={setSeasonGraphOpen}
          resetTierList={resetTierList}
        />
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
              {colorMode ? (
                <TierListColorPicker
                  currentTierColors={Object.fromEntries(
                    Object.entries(tiers).map(([tier, tierData]) => [
                      Number(tier),
                      tierData["color"],
                    ]),
                  )}
                  setCurrentTiers={setTiers}
                />
              ) : addImageMode ? (
                <ImageUrlUploadModal
                  currentImageUrl=""
                  onUpload={addImageToTierList}
                  closeModal={() => setAddImageMode(false)}
                  includeTitle={true}
                />
              ) : (
                <div className="flex w-full flex-col">
                  {Object.entries(tiers)
                    .sort((a, b) => Number(b[0]) - Number(a[0]))
                    .map(([score, images], index) => (
                      <div key={index} className=" bg-zinc-800">
                        <TierListRow
                          key={index}
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
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
