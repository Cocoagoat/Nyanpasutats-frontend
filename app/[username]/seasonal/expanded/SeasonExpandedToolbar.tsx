import { useParams } from "next/navigation";
import React, { useContext, useState } from "react";
import { MdSunny, MdNightsStay, MdEdit } from "react-icons/md";
import {
  RiDownload2Fill,
  RiUpload2Fill,
  RiBarChart2Fill,
  RiFileCopyLine,
  RiDragDropFill,
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
import { isFirefox } from "@/utils/general";

export default function SeasonExpandedToolbar(
  {
    // handleDayNightChange,
  }: {
    // handleDayNightChange: () => void;
  },
) {
  const params = useParams<{ username: string }>();
  const [downloadHovered, setDownloadHovered] = useState(false);
  const [uploadHovered, setUploadHovered] = useState(false);
  const [seasonGraphHovered, setSeasonGraphHovered] = useState(false);
  const [copyHovered, setCopyHovered] = useState(false);
  const [editModeHovered, setEditModeHovered] = useState(false);
  const [dragModeHovered, setDragModeHovered] = useState(false);
  const { noSequels } = useContext(SeasonalContext)!;
  const {
    season,
    // nightImage,
    editModeOpen,
    uploadModalOpen,
    setUploadModalOpen,
    setEditModeOpen,
    setSeasonGraphOpen,
    dragModeOpen,
    setDragModeOpen,
  } = useContext(SingleSeasonContext)!;

  return (
    <div className="absolute -right-11 top-1/2  z-40 flex -translate-y-1/2 flex-col justify-center gap-10">
      <SeasonExpandedButton
        onClick={() => setEditModeOpen(!editModeOpen)}
        Icon={<MdEdit />}
        hoverText={`${editModeOpen ? "Close edit mode" : "Edit mode"}`}
        hovered={editModeHovered}
        setHovered={setEditModeHovered}
        open={editModeOpen}
      />
      <SeasonExpandedButton
        onClick={() => setDragModeOpen(!dragModeOpen)}
        Icon={<RiDragDropFill />}
        hoverText={`${dragModeOpen ? "Close drag mode" : "Drag mode"}`}
        hovered={dragModeHovered}
        setHovered={setDragModeHovered}
        open={dragModeOpen}
      />
      <SeasonExpandedButton
        onClick={() => setUploadModalOpen(!uploadModalOpen)}
        Icon={<RiUpload2Fill />}
        hoverText="Upload your own image"
        hovered={uploadHovered}
        setHovered={setUploadHovered}
        open={uploadModalOpen}
      />
      {/* <SeasonExpandedButton
        onClick={handleDayNightChange}
        Icon={nightImage ? <MdSunny /> : <MdNightsStay />}
        hoverText={`Switch card to ${nightImage ? "day" : "night"} mode`}
        hovered={nightDayHovered}
        setHovered={setNightDayHovered}
      /> */}
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
      {!isFirefox() && (
        <SeasonExpandedButton
          onClick={() => {
            copyCardAsImage(season);
          }}
          Icon={<RiFileCopyLine />}
          hoverText="Copy this card as an image"
          hovered={copyHovered}
          setHovered={setCopyHovered}
        />
      )}
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
