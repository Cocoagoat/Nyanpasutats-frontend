import HoverPopup from "@/components/general/HoverPopup";
import React, { useContext, useState } from "react";
import { SingleSeasonContext } from "../reducer/SeasonalContext";
import Loading from "@/components/general/Loading";

export default function SeasonExpandedButton({
  onClick,
  Icon,
  hoverText,
  open,
  loading,
}: {
  onClick: () => void;
  Icon: React.ReactElement;
  hoverText: string;
  open?: boolean;
  loading?: boolean;
}) {
  const [hovered, setHovered] = useState(false);
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
    <>
      {!loading ? (
        <button
          className={`${hoverText.startsWith("E") ? "bg-zinc-500" : "bg-zinc-700"}
       relative flex items-center justify-center  bg-opacity-0 text-2xl `}
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
      ) : (
        <Loading width={30} backgroundColor={altBackgroundColor} />
      )}
    </>
  );
}
