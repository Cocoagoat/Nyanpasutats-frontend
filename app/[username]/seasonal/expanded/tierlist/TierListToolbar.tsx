import useToast from "@/hooks/useToast";
import {
  copyCardAsImage,
  downloadCardAsImage,
} from "@/utils/downloadCardAsImage";
import { useParams } from "next/navigation";
import React, { useContext } from "react";
import { FaCompressArrowsAlt, FaExpandArrowsAlt } from "react-icons/fa";
import { MdClose, MdColorLens } from "react-icons/md";
import { PiImageBold, PiTextTBold } from "react-icons/pi";
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
  const { notifyError } = useToast();
  const params = useParams<{ username: string }>();
  const modeSetters = [setColorMode, setDeleteMode, setAddImageMode];

  function handleDownload() {
    if (!colorMode && !deleteMode && !addImageMode) {
      downloadCardAsImage(
        `${season} Tier List`,
        `${params.username} ${season} Tier List${
          noSequels ? " (No Sequels)" : ""
        }`,
      );
    } else {
      notifyError("Please exit the current mode before downloading.");
    }
  }

  function handleCopy() {
    if (!colorMode && !deleteMode && !addImageMode) {
      copyCardAsImage(`${season} Tier List`);
    } else {
      notifyError("Please exit the current mode before copying.");
    }
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
    <div className="flex justify-end gap-4 text-right ">
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
        onClick={() => handleDownload()}
        descText="Download as image"
      >
        <RiDownload2Fill />
      </TierListToolbarButton>
      <TierListToolbarButton
        onClick={() => {
          handleCopy();
        }}
        descText="Copy as image"
      >
        <RiFileCopyLine />
      </TierListToolbarButton>
      <TierListToolbarButton onClick={closeTierList}>
        <MdClose />
      </TierListToolbarButton>
    </div>
  );
}
