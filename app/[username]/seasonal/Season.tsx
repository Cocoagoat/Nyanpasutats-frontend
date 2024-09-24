"use client";

import { SeasonData, SeasonName } from "@/app/interfaces";
import useFirstTimeOpenMessage from "@/hooks/useFirstTimeOpenMessage";

import { useEffect, useState } from "react";
import SeasonCollapsed from "./SeasonCollapsed";
import SeasonExpanded from "./expanded/SeasonExpanded";
import { SingleSeasonContext } from "./reducer/SeasonalContext";
import {
  getAltBackgroundColor,
  getBackgroundColor,
  getDayBackgroundImage,
} from "./SeasonUtils";

export default function Season({
  season,
  seasonStats,
  seasonCount,
}: {
  season: string;
  seasonStats: SeasonData;
  seasonCount: number;
}) {
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [imageChanged, setImageChanged] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [tierListOpen, setTierListOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [editModeOpen, setEditModeOpen] = useState(false);
  const [dragModeOpen, setDragModeOpen] = useState(false);
  const [displayGradient, setDisplayGradient] = useState(true);

  const seasonName = season.split(" ")[0] as SeasonName;

  const [backgroundColor, setBackgroundColor] = useState(
    getBackgroundColor(seasonName),
  );
  const [altBackgroundColor, setAltBackgroundColor] = useState(
    getAltBackgroundColor(seasonName),
  );

  let backgroundImg = getDayBackgroundImage(seasonName);

  const [backgroundImage, setBackgroundImage] = useState(backgroundImg);

  useEffect(() => {
    // Effect for changing state when image is uploaded
    if (uploadedImage) {
      setBackgroundImage(uploadedImage);
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

         Note : The site currently supports images only from Imgur, Imgchest, MyAnimeList and Anilist.
         If you want to upload an image from a different source, please upload it to Imgur/Imgchest first.`;

  useFirstTimeOpenMessage(
    editModeOpen,
    "firstEditModeOpen",
    editModeOpenMessage,
  );

  const dragModeOpenMessage = `You can now drag the background image horizontally to change its position. 
 `;

  useFirstTimeOpenMessage(
    dragModeOpen,
    "firstDragModeOpen",
    dragModeOpenMessage,
  );

  const uploadModalOpenMessage = `Here you can upload a custom background image and change/remove the gradient color.
  
  Note : The site currently supports images only from Imgur, Imgchest, MyAnimeList and Anilist.
         If you want to upload an image from a different source, please upload it to Imgur/Imgchest first.`;

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
        altBackgroundColor,
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
        tierListOpen,
      }}
    >
      {expanded ? (
        <div>
          <div className="fixed inset-0 z-[200] bg-black opacity-80" />
          <SeasonExpanded setCardOpen={setExpanded} />
        </div>
      ) : (
        <SeasonCollapsed setCardOpen={setExpanded} />
      )}
    </SingleSeasonContext.Provider>
  );
}
