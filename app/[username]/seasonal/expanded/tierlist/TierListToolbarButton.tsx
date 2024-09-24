import HoverPopup from "@/components/general/HoverPopup";
import React, { useContext } from "react";
import { SingleSeasonContext } from "../../reducer/SeasonalContext";

export default function TierListToolbarButton({
  children,
  onClick,
  descText,
}: {
  children: React.ReactNode;
  onClick: () => void;
  descText?: string;
}) {
  const [hovered, setHovered] = React.useState(false);
  const { altBackgroundColor } = useContext(SingleSeasonContext)!;
  return (
    <button
      className="relative bg-zinc-800 p-1 text-3xl  hover:bg-zinc-700"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ color: altBackgroundColor }}
    >
      {children}
      {hovered && descText && (
        <HoverPopup
          hovered={hovered}
          setHovered={setHovered}
          text={descText}
          backgroundColor={altBackgroundColor}
        />
      )}
    </button>
  );
}
