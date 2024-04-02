"use client";

import { SeasonData, SeasonName } from "@/app/interfaces";
import React, { useContext, useState } from "react";
import SeasonCollapsed from "./SeasonCollapsed";
import SeasonExpanded from "./expanded/SeasonExpanded";
import {
  SeasonalContext,
  SingleSeasonContext,
} from "./reducer/SeasonalContext";
import { downloadCardAsImage } from "@/utils/downloadCardAsImage";
import { RiDownload2Fill, RiUpload2Fill } from "react-icons/ri";
import { useParams } from "next/navigation";
import winterBackground from "@/public/WinterBackground.png";
import springBackground from "@/public/SpringBackground.png";
import summerBackground from "@/public/SummerBackground3.png";
import fallBackground from "@/public/FallBackground.png";
import nightBackground from "@/public/NightBackground.jpg";
import UploadImageModal from "./expanded/UploadImageModal";
import HoverPopup from "@/components/general/HoverPopup";
import { MdSunny, MdNightsStay } from "react-icons/md";
import SeasonExpandedToolbar from "./expanded/SeasonExpandedToolbar";
import SeasonGraphModal from "./expanded/SeasonGraphModal";
import TierList from "./expanded/tierlist/TierList";

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
  const [downloadHovered, setDownloadHovered] = useState(false);
  const [nightDayHovered, setNightDayHovered] = useState(false);
  const [nightImage, setNightImage] = useState(false);
  const [uploadHovered, setUploadHovered] = useState(false);
  const { noSequels } = useContext(SeasonalContext)!;
  const [expanded, setExpanded] = useState(false);
  const params = useParams<{ username: string }>();

  const seasonName = season.split(" ")[0] as SeasonName;

  let backgroundColor = getBackgroundColor(seasonName);
  let backgroundImg = getDayBackgroundImage(seasonName);

  const [backgroundImage, setBackgroundImage] = useState(backgroundImg);

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
            handleImageUpload={handleImageUpload}
            uploadModalOpen={uploadModalOpen}
            setUploadModalOpen={setUploadModalOpen}
            seasonGraphOpen={seasonGraphOpen}
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
            // <SeasonGraphModal closeModal={() => setSeasonGraphOpen(false)} />
            <TierList setSeasonGraphOpen={setSeasonGraphOpen} />
          )}
        </div>
      ) : (
        <SeasonCollapsed />
      )}
    </SingleSeasonContext.Provider>
  );
}
