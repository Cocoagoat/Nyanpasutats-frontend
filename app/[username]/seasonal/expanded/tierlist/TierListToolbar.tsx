import useToast from "@/hooks/useToast";
import {
  copyCardAsImage,
  downloadCardAsImage,
  getImageShareUrl,
} from "@/utils/downloadCardAsImage";
import { useParams } from "next/navigation";
import React, { Dispatch, SetStateAction, useContext, useState } from "react";
import { FaCompressArrowsAlt, FaExpandArrowsAlt } from "react-icons/fa";
import { MdClose, MdColorLens } from "react-icons/md";
import { PiImageBold, PiShareFatFill, PiTextTBold } from "react-icons/pi";
import { RiDownload2Fill, RiFileCopyLine } from "react-icons/ri";
import { TbRestore, TbTrash } from "react-icons/tb";
import {
  SeasonalContext,
  SingleSeasonContext,
} from "../../reducer/SeasonalContext";
import TierListToolbarButton from "./TierListToolbarButton";

export default function TierListToolbar({
  tierListMode,
  expandTierList,
  contractTierList,
  colorMode,
  setColorMode,
  deleteMode,
  setDeleteMode,
  addImageMode,
  setAddImageMode,
  showText,
  setShowText,
  closeTierList,
  resetTierList,
}: {
  tierListMode: string;
  expandTierList: () => void;
  contractTierList: () => void;
  colorMode: boolean;
  setColorMode: React.Dispatch<React.SetStateAction<boolean>>;
  deleteMode: boolean;
  setDeleteMode: React.Dispatch<React.SetStateAction<boolean>>;
  addImageMode: boolean;
  setAddImageMode: React.Dispatch<React.SetStateAction<boolean>>;
  showText: boolean;
  setShowText: (showText: boolean) => void;
  closeTierList: () => void;
  resetTierList: () => void;
}) {
  const { season } = useContext(SingleSeasonContext)!;
  const { noSequels } = useContext(SeasonalContext)!;
  const { notifySuccess, notifyError } = useToast();
  const [downloadLoading, setDownloadLoading] = useState(false);
  const [copyLoading, setCopyLoading] = useState(false);
  const [shareLoading, setShareLoading] = useState(false);
  const params = useParams<{ username: string }>();
  const modeSetters = [setColorMode, setDeleteMode, setAddImageMode];

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

  async function handleShare() {
    await handleTask({
      condition: !colorMode && !deleteMode && !addImageMode,
      setLoading: setShareLoading,
      asyncTask: () =>
        getImageShareUrl(
          `${season} Tier List`,
          `${params.username}_${season}_tierList`,
          "tierList",
        ),
      successMessage: "Link copied to clipboard.",
      errorMessage: "Error generating image link.",
    });
  }

  async function handleCopy() {
    await handleTask({
      condition: !colorMode && !deleteMode && !addImageMode,
      setLoading: setCopyLoading,
      asyncTask: () => copyCardAsImage(`${season} Tier List`),
      successMessage: "Image copied successfully.",
      errorMessage: "Error copying image.",
    });
  }

  async function handleDownload() {
    await handleTask({
      condition: !colorMode && !deleteMode && !addImageMode,
      setLoading: setDownloadLoading,
      asyncTask: () =>
        downloadCardAsImage(
          `${season} Tier List`,
          `${params.username} ${season} Tier List${
            noSequels ? " (No Sequels)" : ""
          }`,
        ),
      successMessage: "",
      errorMessage: "Error downloading image.",
    });
  }

  function toggleMode(
    open: boolean,
    openSetter: React.Dispatch<React.SetStateAction<boolean>>,
  ) {
    if (open) {
      openSetter(false);
      return;
    }
    openSetter(true);
    modeSetters.forEach((setter) => {
      if (setter !== openSetter) setter(false);
    });
  }
  return (
    <div className="relative flex justify-end gap-4 text-right ">
      <TierListToolbarButton onClick={resetTierList} descText="Reset tier list">
        <TbRestore />
      </TierListToolbarButton>
      <TierListToolbarButton
        onClick={tierListMode !== "large" ? expandTierList : () => {}}
        descText="Expand tier list"
      >
        <FaExpandArrowsAlt />
      </TierListToolbarButton>
      <TierListToolbarButton
        onClick={tierListMode !== "small" ? contractTierList : () => {}}
        descText="Contract tier list"
      >
        <FaCompressArrowsAlt />
      </TierListToolbarButton>
      <TierListToolbarButton
        onClick={() => toggleMode(addImageMode, setAddImageMode)}
        descText="Add image"
      >
        <PiImageBold />
      </TierListToolbarButton>
      <TierListToolbarButton
        onClick={() => toggleMode(colorMode, setColorMode)}
        descText="Change colors"
      >
        <MdColorLens />
      </TierListToolbarButton>
      <TierListToolbarButton
        onClick={() => toggleMode(deleteMode, setDeleteMode)}
        descText="Delete tiers/shows"
      >
        <TbTrash />
      </TierListToolbarButton>

      <TierListToolbarButton
        onClick={() => setShowText(!showText)}
        descText="Display text"
      >
        <PiTextTBold />
      </TierListToolbarButton>
      <TierListToolbarButton
        onClick={() => handleShare()}
        descText="Share tier list"
        loading={shareLoading}
      >
        <PiShareFatFill />
      </TierListToolbarButton>
      <TierListToolbarButton
        onClick={() => handleDownload()}
        descText="Download as image"
        loading={downloadLoading}
      >
        <RiDownload2Fill />
      </TierListToolbarButton>
      <TierListToolbarButton
        onClick={() => {
          handleCopy();
        }}
        descText="Copy as image"
        loading={copyLoading}
      >
        <RiFileCopyLine />
      </TierListToolbarButton>

      <TierListToolbarButton onClick={closeTierList}>
        <MdClose />
      </TierListToolbarButton>
    </div>
  );
}
