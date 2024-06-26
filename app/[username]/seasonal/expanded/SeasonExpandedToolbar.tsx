import {
  copyCardAsImage,
  downloadCardAsImage,
} from "@/utils/downloadCardAsImage";
import { isFirefox } from "@/utils/general";
import { useParams } from "next/navigation";
import { useContext, useState } from "react";
import { MdClose, MdEdit } from "react-icons/md";
import { PiImageBold } from "react-icons/pi";
import {
  RiBarChart2Fill,
  RiDownload2Fill,
  RiDragDropFill,
  RiFileCopyLine,
} from "react-icons/ri";
import {
  SeasonalContext,
  SingleSeasonContext,
} from "../reducer/SeasonalContext";
import SeasonExpandedButton from "./SeasonExpandedButton";

export default function SeasonExpandedToolbar() {
  const params = useParams<{ username: string }>();
  const [downloadHovered, setDownloadHovered] = useState(false);
  const [uploadHovered, setUploadHovered] = useState(false);
  const [seasonGraphHovered, setSeasonGraphHovered] = useState(false);
  const [copyHovered, setCopyHovered] = useState(false);
  const [editModeHovered, setEditModeHovered] = useState(false);
  const [dragModeHovered, setDragModeHovered] = useState(false);
  const [closeHovered, setCloseHovered] = useState(false);
  const { noSequels } = useContext(SeasonalContext)!;
  const {
    season,
    editModeOpen,
    uploadModalOpen,
    setUploadModalOpen,
    setEditModeOpen,
    setTierListOpen,
    dragModeOpen,
    setDragModeOpen,
    setExpanded,
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
        Icon={<PiImageBold />}
        hoverText="Upload image"
        hovered={uploadHovered}
        setHovered={setUploadHovered}
        open={uploadModalOpen}
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
        onClick={() => setTierListOpen(true)}
        Icon={<RiBarChart2Fill />}
        hoverText="View tier list"
        hovered={seasonGraphHovered}
        setHovered={setSeasonGraphHovered}
      />
      <SeasonExpandedButton
        onClick={() => setExpanded(false)}
        Icon={<MdClose />}
        hoverText="Close card"
        hovered={closeHovered}
        setHovered={setCloseHovered}
      />
    </div>
  );
}
