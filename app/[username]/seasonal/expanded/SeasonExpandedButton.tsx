import HoverPopup from "@/components/general/HoverPopup";
import React, { useContext } from "react";
import { SingleSeasonContext } from "../reducer/SeasonalContext";

export default function SeasonExpandedButton({
  onClick,
  Icon,
  hoverText,
  hovered,
  setHovered,
  open,
}: {
  onClick: () => void;
  Icon: React.ReactElement;
  hoverText: string;
  hovered: boolean;
  setHovered: React.Dispatch<React.SetStateAction<boolean>>;
  open?: boolean;
}) {
  const { altBackgroundColor } = useContext(SingleSeasonContext)!;
  const iconWithHandlers = React.cloneElement(Icon, {
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    className: `${Icon.props.className} text-center rounded-sm 
    ${open && "bg-zinc-700 ring-4 ring-zinc-700"} `,
    style: {
      color: altBackgroundColor,
    },
  });

  return (
    <button
      className={`${hoverText.startsWith("E") ? "bg-zinc-500" : "bg-zinc-700"} relative flex
       items-center justify-center  bg-opacity-0 text-2xl `}
      onClick={onClick}
    >
      {iconWithHandlers}
      <HoverPopup
        hovered={hovered}
        setHovered={setHovered}
        text={hoverText}
        backgroundColor={altBackgroundColor}
      />
    </button>
  );
}
