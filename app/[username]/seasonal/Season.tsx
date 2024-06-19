"use client";

import { SeasonData, SeasonName } from "@/app/interfaces";
import React, { useEffect, useRef, useState } from "react";
import SeasonCollapsed from "./SeasonCollapsed";
import SeasonExpanded from "./expanded/SeasonExpanded";
import { SingleSeasonContext } from "./reducer/SeasonalContext";
import winterBackground from "@/public/WinterBackground.png";
import springBackground from "@/public/SpringBackground.png";
import summerBackground from "@/public/SummerBackground.png";
import fallBackground from "@/public/FallBackground.png";
import nightBackground from "@/public/NightBackground.png";
import UploadImageModal from "./expanded/UploadImageModal";
import SeasonExpandedToolbar from "./expanded/SeasonExpandedToolbar";
import TierList from "./expanded/tierlist/TierList";
import useToast from "@/hooks/useToast";
import { handleNewImageUrl2 } from "@/utils/general";
import ImageUrlUploadModal from "./expanded/ImageUrlUploadModal";
import ColorPickerComponent from "./expanded/ColorPicker";
import { display } from "html2canvas/dist/types/css/property-descriptors/display";
import BackgroundDesign from "./expanded/BackgroundDesign";

function getBackgroundColor(seasonName: SeasonName) {
  switch (seasonName) {
    case "Winter":
      return "#7DD3FC"; // RGB: 125, 211, 252
    case "Spring":
      return "#36C55E"; // RGB: 54, 197, 94
    case "Summer":
      return "#EBBF4D"; // RGB: 235, 191, 77
    case "Fall":
      return "#CD5722"; // RGB: 205, 87, 34
    default:
      throw Error("Invalid season name");
  }
}

function getDayBackgroundImage(seasonName: SeasonName) {
  switch (seasonName) {
    case "Winter":
      return winterBackground.src;
    case "Spring":
      return springBackground.src;
    case "Summer":
      return summerBackground.src;
    case "Fall":
      return fallBackground.src;
    default:
      throw Error("Invalid season name");
  }
}

type BackgroundImageType = "Day" | "Custom" | "None";

export default function Season({
  season,
  seasonStats,
  seasonCount,
  brightness,
  cardOpen,
  setCardOpen,
}: {
  season: string;
  seasonStats: SeasonData;
  seasonCount: number;
  brightness: number;
  cardOpen: boolean;
  setCardOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [imageChanged, setImageChanged] = useState(false);
  const [backgroundImageType, setBackgroundImageType] =
    useState<BackgroundImageType>("Day");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [seasonGraphOpen, setSeasonGraphOpen] = useState(false);
  // const [nightImage, setNightImage] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [editModeOpen, setEditModeOpen] = useState(false);
  const [dragModeOpen, setDragModeOpen] = useState(false);
  const [displayGradient, setDisplayGradient] = useState(true);

  const seasonName = season.split(" ")[0] as SeasonName;

  let background_color = getBackgroundColor(seasonName);
  const [backgroundColor, setBackgroundColor] = useState(background_color);
  let backgroundImg = getDayBackgroundImage(seasonName);

  const [backgroundImage, setBackgroundImage] = useState(backgroundImg);
  const { notifySuccess } = useToast();

  // const isFirstTierListRender = useRef(true);
  // const isFirstEditModeEntry = useRef(true);

  useEffect(() => {
    // Effect for changing state when image is uploaded
    if (uploadedImage) {
      setBackgroundImage(uploadedImage);
      setBackgroundImageType("Custom");
      setImageChanged(true);
    }
  }, [uploadedImage]);

  useEffect(() => {
    // Effect for making tier list message appear
    if (
      seasonGraphOpen &&
      sessionStorage.getItem("firstTierListOpen") === null
    ) {
      notifySuccess(
        `This is a customizable tier list automatically made from your ratings for the season.

      You can customize it by dragging and dropping the shows into different tiers, changing the tier names,
      as well as deleting shows/tiers you don't want in it.
      
      You can also download the tier list as an image.`,
        undefined,
        30000,
      );
      sessionStorage.setItem("firstTierListOpen", "true");
    }
  }, [notifySuccess, seasonGraphOpen]);

  useEffect(() => {
    // Effect for making edit mode message appear
    if (editModeOpen && sessionStorage.getItem("firstEditModeOpen") === null) {
      notifySuccess(
        `You are now in edit mode. 
        
        You can add up to four "Best/Worst X" categories,
        change the amount of images in each category, and reorder the stats displayed
        in the card.
        
        Note : The site currently supports images only from Imgur, MyAnimeList and Anilist.
        If you want to upload an image from a different source, please upload it to Imgur first.`,
        undefined,
        20000,
      );
      sessionStorage.setItem("firstEditModeOpen", "true");
    }
  }, [editModeOpen]);

  // function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
  //   const file = event.target.files && event.target.files[0];
  //   if (file) {
  //     const validTypes = ["image/jpg", "image/png", "image/jpeg"];
  //     if (!validTypes.includes(file.type)) {
  //       alert(
  //         "Unsupported file type. Please upload an image (JPG, PNG, JPEG).",
  //       );
  //       return;
  //     }

  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       if (typeof reader.result === "string") {
  //         setBackgroundImage(reader.result);
  //         setUploadModalOpen(false);
  //         setImageChanged(true);
  //       }
  //     };

  //     reader.onerror = () => {
  //       console.error("There was an error reading the file:", reader.error);
  //       alert("Error reading file. Please try again.");
  //       reader.abort();
  //     };

  //     reader.readAsDataURL(file);
  //   }
  // }

  // function handleDayNightChange() {
  //   if (nightImage) {
  //     setNightImage(false);
  //     setBackgroundImage(backgroundImg);
  //   } else {
  //     setNightImage(true);
  //     setBackgroundImage(nightBackground.src);
  //   }
  // }

  // function onUrlUpload(url: string) {
  //   setBackgroundImage(url);
  //   setUploadModalOpen(false);
  //   setImageChanged(true);
  // }

  return (
    <SingleSeasonContext.Provider
      value={{
        season,
        seasonStats,
        backgroundImage,
        setExpanded,
        backgroundColor,
        setBackgroundColor,
        displayGradient,
        setDisplayGradient,
        uploadedImage,
        setUploadedImage,
        seasonCount,
        imageChanged,
        // nightImage,
        uploadModalOpen,
        setUploadModalOpen,
        editModeOpen,
        setEditModeOpen,
        dragModeOpen,
        setDragModeOpen,
        setSeasonGraphOpen,
        // handleDayNightChange,
      }}
    >
      {expanded ? (
        <div className="relative">
          <div className="fixed inset-0 z-40 bg-black opacity-80" />
          <SeasonExpanded
            brightness={brightness}
            cardOpen={cardOpen}
            setCardOpen={setCardOpen}
          />
          {/* <SeasonExpandedToolbar
            handleDayNightChange={handleDayNightChange}
            setUploadModalOpen={setUploadModalOpen}
            setSeasonGraphOpen={setSeasonGraphOpen}
            setEditModeOpen={setEditModeOpen}
          /> */}
          {/* {uploadModalOpen && (
            
            // <BackgroundDesign />)}
            // <>
            //   <ImageUrlUploadModal
            //     currentImageUrl={uploadedImage ? uploadedImage : ""}
            //     onUpload={(newImageUrl: string) =>
            //       setUploadedImage(newImageUrl)
            //     }
            //     closeModal={() => setUploadModalOpen(false)}
            //     verticalPlacement={25}
            //   />
            //   <div
            //     className="absolute   left-1/2
            //   top-[70%] z-[60] flex -translate-x-1/2 -translate-y-1/2"
            //   >
            //     <div className="flex items-center justify-center gap-4 text-sm text-white">
            //       <p className="min-w-[80px]">
            //         Or pick a solid color (also affects gradient) :{" "}
            //       </p>
            //       <ColorPickerComponent
            //         color={backgroundColor}
            //         setColor={setBackgroundColor}
            //       />
            //       <button
            //         onClick={() => setDisplayGradient(!displayGradient)}
            //         className="flex max-h-[50px] items-center rounded-3xl
            //        bg-zinc-800 p-6 font-semibold text-lime-600 hover:bg-zinc-600"
            //       >
            //         {displayGradient ? "Remove Gradient" : "Add Gradient"}
            //       </button>
            //     </div>
            //   </div>
            // </>
          )} */}

          {seasonGraphOpen && (
            <TierList setSeasonGraphOpen={setSeasonGraphOpen} />
          )}
        </div>
      ) : (
        <SeasonCollapsed cardOpen={cardOpen} setCardOpen={setCardOpen} />
      )}
    </SingleSeasonContext.Provider>
  );
}
