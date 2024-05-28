import { useState } from "react";
import SeasonStat from "./SeasonStat";
import { ChartData, StatType } from "@/app/interfaces";
import TooltipQuestionMark from "@/components/general/TooltipQuestionMark";
import { tooltipsContent } from "@/utils/TooltipsContent";
import { useSingleSeasonContext } from "../reducer/SeasonalContext";

export default function SeasonStatGridCell({
  frontStat,
  backStat,
  toggle,
}: {
  frontStat: StatType;
  backStat?: StatType;
  toggle?: boolean;
}) {
  const [backOpen, setBackOpen] = useState(false);
  const [graphOpen, setGraphOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const { editModeOpen } = useSingleSeasonContext()!;
  return (
    <div
      className="relative  hover:opacity-90 "
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {editModeOpen && (
        <TooltipQuestionMark
          text={
            backOpen && backStat
              ? tooltipsContent[backStat.name]
              : tooltipsContent[frontStat.name]
          }
        />
      )}
      <SeasonStat
        statName={backOpen && backStat ? backStat.name : frontStat.name}
        statValue={backOpen && backStat ? backStat.value : frontStat.value}
      />
      <div className="absolute flex w-full justify-center gap-4 text-xs">
        {toggle && editModeOpen && (
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
      </div>
    </div>
  );
}
