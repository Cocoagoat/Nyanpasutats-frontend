import { useParams } from "next/navigation";
import React, { useContext, useState } from "react";
import { MdSunny, MdNightsStay } from "react-icons/md";
import {
  RiDownload2Fill,
  RiUpload2Fill,
  RiBarChart2Fill,
} from "react-icons/ri";
import { downloadCardAsImage } from "@/utils/downloadCardAsImage";
import {
  SeasonalContext,
  SingleSeasonContext,
} from "../reducer/SeasonalContext";
import SeasonExpandedButton from "./SeasonExpandedButton";

export default function SeasonExpandedToolbar({
  handleDayNightChange,
  setUploadModalOpen,
  setSeasonGraphOpen,
}: {
  handleDayNightChange: () => void;

  setUploadModalOpen: React.Dispatch<React.SetStateAction<boolean>>;

  setSeasonGraphOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const params = useParams<{ username: string }>();
  const [downloadHovered, setDownloadHovered] = useState(false);
  const [uploadHovered, setUploadHovered] = useState(false);
  const [nightDayHovered, setNightDayHovered] = useState(false);
  const [seasonGraphHovered, setSeasonGraphHovered] = useState(false);
  const { noSequels } = useContext(SeasonalContext)!;
  const { season, nightImage } = useContext(SingleSeasonContext)!;

  return (
    <div className="absolute right-5 top-1/3 z-40 flex flex-col justify-center gap-10">
      <SeasonExpandedButton
        onClick={() => setUploadModalOpen(true)}
        Icon={<RiUpload2Fill />}
        hoverText="Upload your own image"
        hovered={uploadHovered}
        setHovered={setUploadHovered}
      />
      <SeasonExpandedButton
        onClick={handleDayNightChange}
        Icon={nightImage ? <MdSunny /> : <MdNightsStay />}
        hoverText={`Switch card to ${nightImage ? "day" : "night"} mode`}
        hovered={nightDayHovered}
        setHovered={setNightDayHovered}
      />
      <SeasonExpandedButton
        onClick={() => {
          setTimeout(() => {}, 2000);
          downloadCardAsImage(
            season,
            `${params.username} ${season}${noSequels ? " (No Sequels)" : ""}`,
          );
        }}
        Icon={<RiDownload2Fill />}
        hoverText="Download this card as an image"
        hovered={downloadHovered}
        setHovered={setDownloadHovered}
      />
      <SeasonExpandedButton
        onClick={() => setSeasonGraphOpen(true)}
        Icon={<RiBarChart2Fill />}
        hoverText="View season graph"
        hovered={seasonGraphHovered}
        setHovered={setSeasonGraphHovered}
      />
    </div>
  );
}
