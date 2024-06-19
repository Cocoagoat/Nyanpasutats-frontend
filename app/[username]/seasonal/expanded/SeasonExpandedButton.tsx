import HoverPopup from "@/components/general/HoverPopup";
import React from "react";

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
  const iconWithHandlers = React.cloneElement(Icon, {
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    className: `${Icon.props.className} text-center rounded-sm ${open && "ring-lime-900  ring-4 bg-lime-900"}  text-lime-600`, // Ensure existing classes are not overwritten
  });
  return (
    <button
      className={`${hoverText.startsWith("E") ? "bg-zinc-500" : "bg-zinc-700"} relative flex
       items-center justify-center  bg-opacity-0 text-2xl text-zinc-500`}
      onClick={onClick}
    >
      {iconWithHandlers}
      <HoverPopup hovered={hovered} setHovered={setHovered} text={hoverText} />
    </button>
  );
}
