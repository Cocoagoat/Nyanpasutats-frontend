import { useState } from "react";
import SeasonStat from "./SeasonStat";
import { ChartData, StatType } from "@/app/interfaces";
import TooltipQuestionMark from "@/components/general/TooltipQuestionMark";
import { tooltipsContent } from "@/utils/TooltipsContent";
import { useSingleSeasonContext } from "../reducer/SeasonalContext";
import { PiArrowLeft, PiArrowLeftBold, PiArrowRightBold } from "react-icons/pi";

export default function SeasonStatGridCell({
  // frontStat,
  // backStat,
  // toggle,
  name,
  value,
  cellIndex,
  handleChangeStat,
  tooltipText,
}: {
  // frontStat: StatType;
  // backStat?: StatType;
  // toggle?: boolean;
  name: string;
  value: string;
  cellIndex: number;
  handleChangeStat: (direction: "left" | "right", cellIndex: number) => void;
  tooltipText: string;
}) {
  const [backOpen, setBackOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const { editModeOpen } = useSingleSeasonContext()!;
  return (
    <div
      className="relative  hover:opacity-90 "
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {editModeOpen && (
        <TooltipQuestionMark text={tooltipText} />
        // <TooltipQuestionMark
        //   text={
        //     backOpen && backStat
        //       ? tooltipsContent[backStat.name]
        //       : tooltipsContent[frontStat.name]
        //   }
        // />
      )}
      {/* <SeasonStat
        statName={backOpen && backStat ? backStat.name : frontStat.name}
        statValue={backOpen && backStat ? backStat.value : frontStat.value}
      /> */}
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
      {/* <div className="absolute flex w-full justify-center gap-4 text-xs">
        {editModeOpen && (
          <button
            className="rounded-xl border border-zinc-600 bg-zinc-700 px-1.5 py-0.5"
            onClick={() => setBackOpen(!backOpen)}
          >
            {toggle ? "Toggle" : ""}
          </button>
        )}
        {/* {editModeOpen && graphStats && (
          <button
            className="rounded-xl border border-zinc-600 bg-zinc-700 px-1.5 py-0.5"
            onClick={() => setGraphOpen(!graphOpen)}
          >
            Graph
          </button>
        )} */}
      {/* </div> */}
    </div>
  );
}
