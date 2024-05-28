import HoverPopup from "@/components/general/HoverPopup";
import React from "react";

export default function TierListButton({
  children,
  onClick,
  descText,
}: {
  children: React.ReactNode;
  onClick: () => void;
  descText?: string;
}) {
  const [hovered, setHovered] = React.useState(false);
  return (
    <button
      className="relative bg-zinc-800 p-1 text-3xl text-lime-600 hover:bg-zinc-700"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
      {hovered && descText && (
        <HoverPopup hovered={hovered} setHovered={setHovered} text={descText} />
      )}
    </button>
  );
}
