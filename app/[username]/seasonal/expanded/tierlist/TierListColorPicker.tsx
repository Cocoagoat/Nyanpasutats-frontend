import React from "react";
import ColorPickerComponent from "../ColorPicker"; // Import your ColorPickerComponent
import { TiersState } from "@/app/interfaces";

export default function TierListColorPicker({
  currentTierColors,
  setCurrentTiers,
}: {
  currentTierColors: Record<number, string>;
  setCurrentTiers: React.Dispatch<React.SetStateAction<TiersState>>;
}) {
  function handleSetColorBase(tier: number, color: string) {
    setCurrentTiers((prev) => ({
      ...prev,
      [tier]: { ...prev[tier], color },
    }));
    // console.log("handleSetColorBase", tier, color);
  }

  type SetColorFunction = (color: string) => void;

  function createHandleSetColor(tier: number): SetColorFunction {
    return (color: string) => handleSetColorBase(tier, color);
  }

  const [clickedTier, setClickedTier] = React.useState(1);
  const [handleSetColor, setHandleSetColor] = React.useState<SetColorFunction>(
    () => createHandleSetColor(1),
  );

  function handleClickedTier(tier: number) {
    setClickedTier(tier);
    setHandleSetColor(() => createHandleSetColor(tier));
  }

  return (
    <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col gap-2">
      <div className="flex flex-wrap gap-2">
        {Object.entries(currentTierColors).map(([tier, color]) => (
          <div
            key={tier}
            className="flex h-10 w-10 cursor-pointer items-center 
            justify-center text-xs font-semibold text-white"
            style={{
              backgroundColor: color,
            }}
            onClick={() => handleClickedTier(Number(tier))}
          >
            {tier}
          </div>
        ))}
      </div>
      <ColorPickerComponent
        color={currentTierColors[clickedTier]}
        setColor={(color: string) => handleSetColor(color)}
      />
    </div>
  );
}
