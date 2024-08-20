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

function TierListToolbarUnmemoized({
  tiersLength,
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
  setSeasonGraphOpen,
  resetTierList,
}: {
  tiersLength: number;
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
  setSeasonGraphOpen: React.Dispatch<React.SetStateAction<boolean>>;
  resetTierList: () => void;
}) {
  const { season } = useContext(SingleSeasonContext)!;
  const { noSequels } = useContext(SeasonalContext)!;
  const params = useParams<{ username: string }>();
  const modeSetters = [setColorMode, setDeleteMode, setAddImageMode];

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
        onClick={tiersLength < 20 ? expandTierList : () => {}}
        descText="Expand tier list"
      >
        <FaExpandArrowsAlt />
      </TierListToolbarButton>
      <TierListToolbarButton
        onClick={tiersLength > 5 ? contractTierList : () => {}}
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
        onClick={() => {
          downloadCardAsImage(
            `${season} Tier List`,
            `${params.username} ${season} Tier List${
              noSequels ? " (No Sequels)" : ""
            }`,
          );
        }}
        descText="Download as image"
      >
        <RiDownload2Fill />
      </TierListToolbarButton>
      <TierListToolbarButton
        onClick={() => {
          copyCardAsImage(`${season} Tier List`);
        }}
        descText="Copy as image"
      >
        <RiFileCopyLine />
      </TierListToolbarButton>
      <TierListToolbarButton onClick={() => setSeasonGraphOpen(false)}>
        <MdClose />
      </TierListToolbarButton>
    </div>
  );
}

const TierListToolbar = React.memo(TierListToolbarUnmemoized);

export default TierListToolbar;
