"use client";

import { SeasonData } from "@/app/interfaces";
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
import summerBackground from "@/public/SummerBackground.png";
import fallBackground from "@/public/FallBackground.png";
import UploadImageModal from "./expanded/UploadImageModal";
import HoverPopup from "@/components/general/HoverPopup";

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
  const [uploadModelOpen, setUploadModelOpen] = useState(false);
  const [imageChanged, setImageChanged] = useState(false);
  const [downloadHovered, setDownloadHovered] = useState(false);
  const [uploadHovered, setUploadHovered] = useState(false);
  const { noSequels } = useContext(SeasonalContext)!;
  const [expanded, setExpanded] = useState(false);
  const params = useParams<{ username: string }>();

  const seasonName = season.split(" ")[0];
  let backgroundImg = winterBackground.src;
  let backgroundColor = "";
  switch (seasonName) {
    case "Winter":
      backgroundColor = "125,211,252";
      break;
    case "Spring":
      backgroundImg = springBackground.src;
      backgroundColor = "54,197,94";
      break;
    case "Summer":
      backgroundImg = summerBackground.src;
      backgroundColor = "235,191,77";
      break;
    case "Fall":
      backgroundImg = fallBackground.src;
      backgroundColor = "205,87,34";
      break;
    default:
      break;
  }

  const [backgroundImage, setBackgroundImage] = useState(backgroundImg);

  function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const validTypes = ["image/jpg", "image/png", "image/jpeg"];
      if (!validTypes.includes(file.type)) {
        alert(
          "Unsupported file type. Please upload an image (JPG, PNG, JPEG)."
        );
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setBackgroundImage(reader.result);
          setUploadModelOpen(false);
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
      }}
    >
      {expanded ? (
        <div className="relative">
          <SeasonExpanded brightness={brightness} />
          <button
            className="bg-zinc-700 text-zinc-500 text-2xl top-1/4 absolute right-4 z-40 flex justify-center bg-opacity-0 items-center"
            onClick={() => setUploadModelOpen(true)}
          >
            <RiUpload2Fill
              className="text-center"
              onMouseEnter={() => setUploadHovered(true)}
              onMouseLeave={() => setUploadHovered(false)}
            />
            <HoverPopup
              hovered={uploadHovered}
              setHovered={setUploadHovered}
              text="Upload your own image"
            />
          </button>

          {uploadModelOpen && (
            <UploadImageModal
              onUpload={handleImageUpload}
              closeModal={() => setUploadModelOpen(false)}
            />
          )}
          <button
            className="bg-zinc-700 text-zinc-500 text-2xl top-1/2 absolute right-4 z-40 flex justify-center bg-opacity-0 items-center"
            onClick={() => {
              setTimeout(() => {}, 2000);
              downloadCardAsImage(
                season,
                `${params.username} ${season}${
                  noSequels ? " (No Sequels)" : ""
                }`
              );
            }}
          >
            <RiDownload2Fill
              className="text-center"
              onMouseEnter={() => setDownloadHovered(true)}
              onMouseLeave={() => setDownloadHovered(false)}
            />
            <HoverPopup
              hovered={downloadHovered}
              setHovered={setDownloadHovered}
              text="Download this card as an image"
            />
          </button>
        </div>
      ) : (
        <SeasonCollapsed />
      )}
    </SingleSeasonContext.Provider>
  );
}
