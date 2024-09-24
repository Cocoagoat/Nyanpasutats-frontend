// Refactor this with Reducer + Context later?
import styles from "@/app/globals.module.css";
import { ShowToDisplay, TierListMode, TiersState } from "@/app/interfaces";
import useToast from "@/hooks/useToast";
import useWindowSize from "@/hooks/useWindowSize";
import React, { useContext, useState } from "react";
import {
  SeasonalContext,
  SingleSeasonContext,
} from "../../reducer/SeasonalContext";
import ImageUrlUploadModal from "../ImageUrlUploadModal";
import { initialTierColors } from "../SeasonExpandedUtils";
import TierListColorPicker from "./TierListColorPicker";
import TierListHeader from "./TierListHeader";
import TierListLoader from "./TierListLoader";
import TierListRating from "./TierListRating";
import TierListRow from "./TierListRow";
import TierListToolbar from "./TierListToolbar";
import useSaveTierListIntoCookies from "./useSaveTierListIntoCookies";
import { useParams } from "next/navigation";

export default function TierList({
  tiersFromRef,
  imagesLoaded,
  setTierListOpen,
}: {
  tiersFromRef: TiersState;
  imagesLoaded: boolean;
  setTierListOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { season, altBackgroundColor } = useContext(SingleSeasonContext)!;
  const { noSequels } = useContext(SeasonalContext)!;
  const username = useParams<{ username: string }>().username;

  let savedTiers = JSON.parse(
    localStorage.getItem(
      `${username}_${season}_TierList_${noSequels ? "_NoSequels" : ""}`,
    ) as string,
  ) as TiersState;
  const [tiers, setTiers] = useState(savedTiers ?? tiersFromRef);

  let savedTierListMode = JSON.parse(
    localStorage.getItem(
      `${username}_${season}_TierListMode${noSequels ? "_NoSequels" : ""}`,
    ) as string,
  ) as TierListMode;
  const [tierListMode, setTierListMode] = useState<TierListMode>(
    savedTierListMode ?? "medium",
  );

  const tiersFromRefCopy = JSON.parse(JSON.stringify(tiersFromRef));
  // Deep copy to avoid reference issues in initialTiers
  const [initialTiers, setInitialTiers] = useState(tiersFromRefCopy);

  const [showText, setShowText] = useState(false);

  const [colorMode, setColorMode] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const [addImageMode, setAddImageMode] = useState(false);

  const { width, height } = useWindowSize();
  const [objectWasDeleted, setObjectWasDeleted] = useState(false);
  const { notifyError } = useToast();
  const maxRowSize = getMaxRowSize();
  const maxRatingTextLength = getMaxRatingTextLength();

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
    const savedTiers = JSON.parse(
      localStorage.getItem(`${username}_${season}_TierList_Initial`) as string,
    );
    setTiers(savedTiers);
    setTierListMode("medium");
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

  function getCurrentTierListField(field: "color" | "text" | "imageData") {
    return Object.fromEntries(
      Object.entries(tiers).map(([tier, tierData]) => [
        Number(tier),
        tierData[field],
      ]),
    );
  }

  function saveTierListFieldIntoCookies(
    field: "color" | "text",
    currentSize?: number,
  ) {
    let size =
      currentSize ?? tierListMode == "small"
        ? 5
        : tierListMode == "medium"
          ? 10
          : 20;
    sessionStorage.setItem(
      `tierList${field.charAt(0).toUpperCase() + field.slice(1)}_${size}`,
      JSON.stringify(getCurrentTierListField(field)),
    );
  }

  function loadTierListFieldFromCookies(
    field: "color" | "text",
    sizeToFetch: number,
  ) {
    // This basically becomes tierListColor_5/10/20 or tierListText_5/10/20
    let previousField =
      JSON.parse(
        sessionStorage.getItem(
          `tierList${field.charAt(0).toUpperCase() + field.slice(1)}_${sizeToFetch}`,
        ) as string,
      ) ?? ({} as Record<number, string>);
    return previousField;
  }

  function expandTierList() {
    if (Object.keys(tiers).length === 20) return; // Already expanded
    const expandTo = tierListMode == "small" ? 10 : 20;

    saveTierListFieldIntoCookies("color");
    saveTierListFieldIntoCookies("text");

    if (expandTo === 10) {
      let originalTiers = { ...tiers };
      let newTiers = {} as TiersState;
      let previousColors = loadTierListFieldFromCookies("color", 10);
      let previousText = loadTierListFieldFromCookies("text", 10);

      for (let i = 1; i <= 10; i += 1) {
        if (i % 2 == 0 && originalTiers[i / 2]) {
          newTiers[i] = {
            imageData: originalTiers[i / 2]["imageData"],
            color: previousColors[i] ?? initialTierColors[i],
            text: previousText[i] ?? `${i}/10`,
          };
        } else {
          newTiers[i] = {
            imageData: [],
            color: previousColors[i] ?? initialTierColors[i],
            text: previousText[i] ?? `${i}/10`,
          };
        }
      }

      setTiers(newTiers);
      setTierListMode("medium");
    } else {
      for (let i = 0.5; i <= 10; i += 0.5) {
        let previousColors = loadTierListFieldFromCookies("color", 20);
        let previousText = loadTierListFieldFromCookies("text", 20);
        setTiers((prev) => {
          // If the tier already exists (full numbers like 7/10 in case
          // they haven't been deleted by the user), just update the text and color.
          if (prev[i]) {
            return {
              ...prev,
              [i]: {
                ...prev[i],
                color: previousColors[i] ?? initialTierColors[i],
                text: previousText[i] ?? `${i}/10`,
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
                color: previousColors[i] ?? initialTierColors[i],
                text: previousText[i] ?? `${i}/10`,
              },
            };
        });
      }
      setTierListMode("large");
    }
    sortTiers();
  }

  function contractTierList() {
    const contractTo = tierListMode == "medium" ? 5 : 10;
    let newTiers = {} as TiersState;

    saveTierListFieldIntoCookies("color");
    saveTierListFieldIntoCookies("text");

    let previousColors = loadTierListFieldFromCookies("color", contractTo);
    let previousText = loadTierListFieldFromCookies("text", contractTo);

    for (let i = 1; i <= contractTo; i++) {
      // Loop from 1 to 10 or from 0.5 to 10
      const index = (i * 10) / contractTo;
      let newColor = previousColors[i]
        ? previousColors[i]
        : initialTierColors[index];
      let newText = previousText[i] ? previousText[i] : `${i}/${contractTo}`;

      if (tiers[index]) {
        let oldImageData = tiers[index]["imageData"].map((imageData) => {
          return { ...imageData, score: i };
        });
        let lowerImageData = [] as ShowToDisplay[];
        // If the tier below exists (half-tier for large list, odd tier for medium),
        // merge it with the above tier in the smaller list
        if (tiers[index - (0.5 * 10) / contractTo]) {
          lowerImageData = tiers[index - (0.5 * 10) / contractTo][
            "imageData"
          ].map((imageData) => {
            return { ...imageData, score: i };
          });
        }

        newTiers[i] = {
          ...newTiers[index],
          imageData: [...oldImageData, ...lowerImageData],
          color: newColor,
          text: newText,
        };
      } else {
        delete newTiers[index];
        newTiers[i] = {
          imageData: [],
          color: newColor,
          text: newText,
        };
      }
    }

    setTiers(newTiers);
    sortTiers();
    setTierListMode(tierListMode == "medium" ? "small" : "medium");
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

  function closeTierList() {
    let size = tierListMode == "small" ? 5 : tierListMode == "medium" ? 10 : 20;
    sessionStorage.setItem(
      `tierListColors_${size}`,
      JSON.stringify(getCurrentTierListField("color")),
    );
    sessionStorage.setItem(
      `tierListText_${size}`,
      JSON.stringify(getCurrentTierListField("text")),
    );
    setTierListOpen(false);
  }

  useSaveTierListIntoCookies(tiers, season, tierListMode);
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
            width > 1000
              ? `max(1000px, ${maxRowSize * 65 + maxRatingTextLength * 10 + 100}px)`
              : "100%",
        }}
      >
        <TierListToolbar
          tierListMode={tierListMode}
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
          closeTierList={closeTierList}
          resetTierList={resetTierList}
        />
        <div
          className="relative bg-zinc-800"
          style={{
            width: `max(1000px, ${maxRowSize * 65 + maxRatingTextLength * 10 + 100}px)`,
          }}
        >
          <div id={`${season} Tier List`} className=" w-full  bg-zinc-800">
            <TierListHeader season={season} loaded={true} />
            <div className="flex">
              <div
                className="flex w-20 flex-col"
                style={{
                  width: `max(90px, ${maxRatingTextLength * 10 + 50}px)`,
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
                  closeColorMode={() => setColorMode(false)}
                />
              ) : addImageMode ? (
                <ImageUrlUploadModal
                  currentImageUrl=""
                  onUpload={addImageToTierList}
                  closeModal={() => setAddImageMode(false)}
                  includeTitle={true}
                  color={altBackgroundColor}
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
