import HoverPopup from "@/components/general/HoverPopup";
import React, { useContext } from "react";
import { SingleSeasonContext } from "../../reducer/SeasonalContext";
import Loading from "@/components/general/Loading";

export default function TierListToolbarButton({
  children,
  onClick,
  descText,
  loading,
}: {
  children: React.ReactNode;
  onClick: () => void;
  descText?: string;
  loading?: boolean;
}) {
  const [hovered, setHovered] = React.useState(false);
  const { altBackgroundColor } = useContext(SingleSeasonContext)!;
  return (
    <>
      {!loading ? (
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
      ) : (
        <Loading
          width={30}
          height={30}
          backgroundColor={altBackgroundColor}
          spinnerType="Regular"
        />
      )}
    </>
  );
}
