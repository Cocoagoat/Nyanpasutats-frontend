import React from "react";
import ColorPicker from "../../../../../components/general/ColorPicker"; // Import your ColorPickerComponent
import { TiersState } from "@/app/interfaces";

export default function TierListColorPicker({
  currentTierColors,
  setCurrentTiers,
}: {
  currentTierColors: Record<number, string>;
  setCurrentTiers: React.Dispatch<React.SetStateAction<TiersState>>;
}) {
  // A base function which createHandleSetColor uses to
  // create a handleSetColor function for a specific tier.
  // This is needed for the color picker itself, since we
  // want it to use a setter that only needs a color to work,
  // and not a tier as well.
  function handleSetColorBase(tier: number, color: string) {
    setCurrentTiers((prev) => ({
      ...prev,
      [tier]: { ...prev[tier], color },
    }));
  }

  type SetColorFunction = (color: string) => void;

  function createHandleSetColor(tier: number): SetColorFunction {
    return (color: string) => handleSetColorBase(tier, color);
  }

  const [clickedTier, setClickedTier] = React.useState(1);

  // The function that's in the state will always have the clicked tier in it,
  // and is the function we pass to ColorPicker to set the color of the clicked tier.
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
      <ColorPicker
        color={currentTierColors[clickedTier]}
        setColor={(color: string) => handleSetColor(color)}
      />
    </div>
  );
}
