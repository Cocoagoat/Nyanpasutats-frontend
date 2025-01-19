import useToast from "@/hooks/useToast";
import {
  copyCardAsImage,
  downloadCardAsImage,
  getImageShareUrl,
} from "@/utils/downloadCardAsImage";
import { useParams } from "next/navigation";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import { MdClose, MdEdit } from "react-icons/md";
import { PiImageBold, PiShareFatFill } from "react-icons/pi";
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
  const { noSequels } = useContext(SeasonalContext)!;
  const [copyLoading, setCopyLoading] = useState(false);
  const [downloadLoading, setDownloadLoading] = useState(false);
  const [shareLoading, setShareLoading] = useState(false);
  const { notifyError, notifySuccess } = useToast();
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

  async function handleTask({
    condition,
    setLoading,
    asyncTask,
    successMessage,
    errorMessage,
  }: {
    condition: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
    asyncTask: () => Promise<boolean>;
    successMessage: string;
    errorMessage: string;
  }) {
    if (condition) {
      setLoading(true);
      const success = await asyncTask();
      if (success) {
        if (successMessage) {
          notifySuccess(successMessage);
        } else {
        }
      } else {
        notifyError(errorMessage);
      }
    } else {
      notifyError(
        "Please exit the current mode before performing this action.",
      );
    }
    setLoading(false);
  }

  async function handleDownload() {
    await handleTask({
      condition: !editModeOpen && !uploadModalOpen,
      setLoading: setDownloadLoading,
      asyncTask: () =>
        downloadCardAsImage(
          season,
          `${params.username} ${season}${noSequels ? " (No Sequels)" : ""}`,
        ),
      successMessage: "",
      errorMessage: "Error downloading image.",
    });
  }

  async function handleCopy() {
    await handleTask({
      condition: !editModeOpen && !uploadModalOpen,
      setLoading: setCopyLoading,
      asyncTask: () => copyCardAsImage(season),
      successMessage: "Image copied to clipboard.",
      errorMessage: "Error copying image.",
    });
  }

  async function handleShare() {
    await handleTask({
      condition: !editModeOpen && !uploadModalOpen,
      setLoading: setShareLoading,
      asyncTask: () =>
        getImageShareUrl(
          season,
          `${params.username}_${season}_seasonalCard`,
          "seasonalCard",
        ),
      successMessage: "Link copied to clipboard.",
      errorMessage: "Error generating image link.",
    });
  }

  return (
    <div
      className="absolute -right-11 top-1/2  z-40 flex 
    -translate-y-1/2 flex-col justify-center gap-10"
    >
      <SeasonExpandedButton
        onClick={() => setEditModeOpen(!editModeOpen)}
        Icon={<MdEdit />}
        hoverText={`${editModeOpen ? "Close edit mode" : "Edit mode"}`}
        open={editModeOpen}
      />

      <SeasonExpandedButton
        onClick={() => setDragModeOpen(!dragModeOpen)}
        Icon={<RiDragDropFill />}
        hoverText={`${dragModeOpen ? "Close drag mode" : "Drag mode"}`}
        open={dragModeOpen}
      />
      <SeasonExpandedButton
        onClick={() => setUploadModalOpen(!uploadModalOpen)}
        Icon={<PiImageBold />}
        hoverText="Upload image"
        open={uploadModalOpen}
      />
      <SeasonExpandedButton
        onClick={handleShare}
        Icon={<PiShareFatFill />}
        hoverText="Get a link to share this card"
        loading={shareLoading}
      />
      <SeasonExpandedButton
        onClick={handleDownload}
        Icon={<RiDownload2Fill />}
        hoverText="Download this card as an image"
        loading={downloadLoading}
      />
      {/* {!isFirefox() && ( */}
      <SeasonExpandedButton
        onClick={handleCopy}
        Icon={<RiFileCopyLine />}
        hoverText="Copy this card as an image"
        loading={copyLoading}
      />
      {/* )} */}
      <SeasonExpandedButton
        onClick={() => setTierListOpen(true)}
        Icon={<RiBarChart2Fill />}
        hoverText="View tier list"
      />
      <SeasonExpandedButton
        onClick={() => setExpanded(false)}
        Icon={<MdClose />}
        hoverText="Close card"
      />
    </div>
  );
}
