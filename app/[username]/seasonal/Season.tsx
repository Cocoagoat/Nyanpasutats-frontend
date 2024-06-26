"use client";

import { SeasonData, SeasonName } from "@/app/interfaces";
import fallBackground from "@/public/FallBackground.png";
import springBackground from "@/public/SpringBackground.png";
import summerBackground from "@/public/SummerBackground.png";
import winterBackground from "@/public/WinterBackground.png";
import { useEffect, useState } from "react";
import SeasonCollapsed from "./SeasonCollapsed";
import SeasonExpanded from "./expanded/SeasonExpanded";
import TierList from "./expanded/tierlist/TierList";
import { SingleSeasonContext } from "./reducer/SeasonalContext";
import useFirstTimeOpenMessage from "@/hooks/useFirstTimeOpenMessage";

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
}: {
  season: string;
  seasonStats: SeasonData;
  seasonCount: number;
  brightness: number;
}) {
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [imageChanged, setImageChanged] = useState(false);
  const [backgroundImageType, setBackgroundImageType] =
    useState<BackgroundImageType>("Day");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [tierListOpen, setTierListOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [editModeOpen, setEditModeOpen] = useState(false);
  const [dragModeOpen, setDragModeOpen] = useState(false);
  // const [cardOpen, setCardOpen] = useState(false);
  const [displayGradient, setDisplayGradient] = useState(true);

  const seasonName = season.split(" ")[0] as SeasonName;

  let background_color = getBackgroundColor(seasonName);
  const [backgroundColor, setBackgroundColor] = useState(background_color);
  let backgroundImg = getDayBackgroundImage(seasonName);

  const [backgroundImage, setBackgroundImage] = useState(backgroundImg);

  useEffect(() => {
    // Effect for changing state when image is uploaded
    if (uploadedImage) {
      setBackgroundImage(uploadedImage);
      setBackgroundImageType("Custom");
      setImageChanged(true);
    }
  }, [uploadedImage]);

  const tierListOpenMessage = `This is a customizable tier list automatically made from your ratings for the season.

       You can customize it by dragging and dropping the shows into different tiers, changing the tier names and colors,
       as well as deleting shows/tiers you don't want in it.

       You can also download the tier list as an image.`;

  useFirstTimeOpenMessage(
    tierListOpen,
    "firstTierListOpen",
    tierListOpenMessage,
  );

  const editModeOpenMessage = `You are now in edit mode.

       You can add up to four "Best/Worst X" categories,
         change the amount of images in each category, and reorder the stats displayed
         in the card.

         Note : The site currently supports images only from Imgur, MyAnimeList and Anilist.
         If you want to upload an image from a different source, please upload it to Imgur first.`;

  useFirstTimeOpenMessage(
    editModeOpen,
    "firstEditModeOpen",
    editModeOpenMessage,
  );

  const dragModeOpenMessage = `You can now drag the background image horizontally to change its position. 

  To continue editing other parts of the card, first leave this mode. `;

  useFirstTimeOpenMessage(
    dragModeOpen,
    "firstDragModeOpen",
    dragModeOpenMessage,
  );

  const uploadModalOpenMessage = `Here you can upload a custom background image and change/remove the gradient color.
  
  Note : The site currently supports images only from Imgur, MyAnimeList and Anilist.
         If you want to upload an image from a different source, please upload it to Imgur first.`;

  useFirstTimeOpenMessage(
    uploadModalOpen,
    "firstUploadModalOpen",
    uploadModalOpenMessage,
  );

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
        uploadModalOpen,
        setUploadModalOpen,
        editModeOpen,
        setEditModeOpen,
        dragModeOpen,
        setDragModeOpen,
        setTierListOpen,
      }}
    >
      {expanded ? (
        <div>
          <div className="fixed inset-0 z-[200] bg-black opacity-80" />
          <SeasonExpanded brightness={brightness} setCardOpen={setExpanded} />

          {tierListOpen && <TierList setSeasonGraphOpen={setTierListOpen} />}
        </div>
      ) : (
        <SeasonCollapsed setCardOpen={setExpanded} />
      )}
    </SingleSeasonContext.Provider>
  );
}
