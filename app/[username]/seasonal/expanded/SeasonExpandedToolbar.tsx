import { useParams } from "next/navigation";
import React, { useContext, useState } from "react";
import { MdSunny, MdNightsStay, MdEdit } from "react-icons/md";
import {
  RiDownload2Fill,
  RiUpload2Fill,
  RiBarChart2Fill,
  RiFileCopyLine,
} from "react-icons/ri";
import {
  copyCardAsImage,
  downloadCardAsImage,
} from "@/utils/downloadCardAsImage";
import {
  SeasonalContext,
  SingleSeasonContext,
} from "../reducer/SeasonalContext";
import SeasonExpandedButton from "./SeasonExpandedButton";

export default function SeasonExpandedToolbar({
  handleDayNightChange,
  setUploadModalOpen,
  setSeasonGraphOpen,
  setEditModeOpen,
}: {
  handleDayNightChange: () => void;

  setUploadModalOpen: React.Dispatch<React.SetStateAction<boolean>>;

  setSeasonGraphOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setEditModeOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const params = useParams<{ username: string }>();
  const [downloadHovered, setDownloadHovered] = useState(false);
  const [uploadHovered, setUploadHovered] = useState(false);
  const [nightDayHovered, setNightDayHovered] = useState(false);
  const [seasonGraphHovered, setSeasonGraphHovered] = useState(false);
  const [copyHovered, setCopyHovered] = useState(false);
  const [editModeHovered, setEditModeHovered] = useState(false);
  const { noSequels } = useContext(SeasonalContext)!;
  const { season, nightImage, editModeOpen } = useContext(SingleSeasonContext)!;

  return (
    <div className="absolute right-5 top-[29%] z-40 flex flex-col justify-center gap-10">
      <SeasonExpandedButton
        onClick={() => setEditModeOpen(!editModeOpen)}
        Icon={<MdEdit />}
        hoverText={`${editModeOpen ? "Close edit mode" : "Edit mode"}`}
        hovered={editModeHovered}
        setHovered={setEditModeHovered}
      />
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
        onClick={() => {
          copyCardAsImage(season);
        }}
        Icon={<RiFileCopyLine />}
        hoverText="Copy this card as an image"
        hovered={copyHovered}
        setHovered={setCopyHovered}
      />
      <SeasonExpandedButton
        onClick={() => setSeasonGraphOpen(true)}
        Icon={<RiBarChart2Fill />}
        hoverText="View tier list"
        hovered={seasonGraphHovered}
        setHovered={setSeasonGraphHovered}
      />
    </div>
  );
}
