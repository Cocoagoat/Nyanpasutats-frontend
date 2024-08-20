import TooltipQuestionMark from "@/components/general/TooltipQuestionMark";
import { PiArrowLeftBold, PiArrowRightBold } from "react-icons/pi";
import { useSingleSeasonContext } from "../reducer/SeasonalContext";
import SeasonStat from "./SeasonStat";

export default function SeasonStatGridCell({
  name,
  value,
  cellIndex,
  handleChangeStat,
  tooltipText,
}: {
  name: string;
  value: string;
  cellIndex: number;
  handleChangeStat: (direction: "left" | "right", cellIndex: number) => void;
  tooltipText: string;
}) {
  const { editModeOpen } = useSingleSeasonContext()!;
  return (
    <div className="relative">
      {editModeOpen && <TooltipQuestionMark text={tooltipText} />}
      <SeasonStat statName={name} statValue={value} />
      {editModeOpen && (
        <>
          <button
            onClick={() => handleChangeStat("left", cellIndex)}
            className="absolute left-0 top-1/4 rounded-full bg-zinc-800 p-2"
            aria-label="Previous Stat"
          >
            <PiArrowLeftBold className="" />
          </button>
          <button
            onClick={() => handleChangeStat("right", cellIndex)}
            className="absolute right-0 top-1/4 rounded-full bg-zinc-800 p-2 "
            aria-label="Next Stat"
          >
            <PiArrowRightBold className="" />
          </button>
        </>
      )}
    </div>
  );
}
