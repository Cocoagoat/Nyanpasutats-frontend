import TooltipQuestionMark from "@/components/general/TooltipQuestionMark";
import { PiArrowLeftBold, PiArrowRightBold } from "react-icons/pi";
import { useSingleSeasonContext } from "../reducer/SeasonalContext";
import SeasonStat from "./SeasonStat";
import SeasonStatArrowButton from "./SeasonStatArrowButton";

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
  const { editModeOpen, altBackgroundColor } = useSingleSeasonContext()!;
  return (
    <div className="relative">
      {editModeOpen && (
        <TooltipQuestionMark text={tooltipText} color={altBackgroundColor} />
      )}
      <SeasonStat statName={name} statValue={value} />
      {editModeOpen && (
        <>
          <SeasonStatArrowButton onClick={() => handleChangeStat("left", cellIndex)} type="left" />
          <SeasonStatArrowButton onClick={() => handleChangeStat("right", cellIndex)} type="right"/>
        </>
      )}
    </div>
  );
}
