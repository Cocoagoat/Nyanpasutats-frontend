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
import nightBackground from "@/public/NightBackground.jpg";
import UploadImageModal from "./expanded/UploadImageModal";
import SeasonExpandedToolbar from "./expanded/SeasonExpandedToolbar";
import TierList from "./expanded/tierlist/TierList";
import useToast from "@/hooks/useToast";

function getBackgroundColor(seasonName: SeasonName) {
  switch (seasonName) {
    case "Winter":
      return "125,211,252";
    case "Spring":
      return "54,197,94";
    case "Summer":
      return "235,191,77";
    case "Fall":
      return "205,87,34";
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
  const [seasonGraphOpen, setSeasonGraphOpen] = useState(false);
  const [nightImage, setNightImage] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const isFirstRender = useRef(true);
  const seasonName = season.split(" ")[0] as SeasonName;

  let backgroundColor = getBackgroundColor(seasonName);
  let backgroundImg = getDayBackgroundImage(seasonName);

  const [backgroundImage, setBackgroundImage] = useState(backgroundImg);
  const { notifySuccess } = useToast();

  useEffect(() => {
    if (seasonGraphOpen && isFirstRender.current) {
      notifySuccess(
        `This is a customizable tier list automatically made from your ratings for the season.

      You can customize it by dragging and dropping the shows into different tiers, changing the tier names,
      as well as deleting tiers you don't need by hovering on them and clicking the small X.
      
      You can also download the tier list as an image.`,
        undefined,
        30000,
      );
      isFirstRender.current = false;
    }
  }, [notifySuccess, seasonGraphOpen]);

  function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const validTypes = ["image/jpg", "image/png", "image/jpeg"];
      if (!validTypes.includes(file.type)) {
        alert(
          "Unsupported file type. Please upload an image (JPG, PNG, JPEG).",
        );
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setBackgroundImage(reader.result);
          setUploadModalOpen(false);
          setImageChanged(true);
        }
      };

      reader.onerror = () => {
        console.error("There was an error reading the file:", reader.error);
        alert("Error reading file. Please try again.");
        reader.abort();
      };

      reader.readAsDataURL(file);
    }
  }

  function handleDayNightChange() {
    if (nightImage) {
      setNightImage(false);
      setBackgroundImage(backgroundImg);
    } else {
      setNightImage(true);
      setBackgroundImage(nightBackground.src);
    }
  }

  return (
    <SingleSeasonContext.Provider
      value={{
        season,
        seasonStats,
        backgroundImage,
        setExpanded,
        backgroundColor,
        seasonCount,
        imageChanged,
        nightImage,
      }}
    >
      {expanded ? (
        <div className="relative">
          <SeasonExpanded brightness={brightness} />
          <SeasonExpandedToolbar
            handleDayNightChange={handleDayNightChange}
            setUploadModalOpen={setUploadModalOpen}
            setSeasonGraphOpen={setSeasonGraphOpen}
          />
          {uploadModalOpen && (
            <UploadImageModal
              onUpload={(e) => {
                handleImageUpload(e);
                setUploadModalOpen(false);
              }}
              closeModal={() => setUploadModalOpen(false)}
            />
          )}
          {seasonGraphOpen && (
            <TierList setSeasonGraphOpen={setSeasonGraphOpen} />
          )}
        </div>
      ) : (
        <SeasonCollapsed />
      )}
    </SingleSeasonContext.Provider>
  );
}
