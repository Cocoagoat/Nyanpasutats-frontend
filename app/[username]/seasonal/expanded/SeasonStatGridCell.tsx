import { useState } from "react";
import SeasonStat from "./SeasonStat";
import { ChartData, StatType } from "@/app/interfaces";
import TooltipQuestionMark from "@/components/general/TooltipQuestionMark";
import { tooltipsContent } from "@/utils/TooltipsContent";

export default function SeasonStatGridCell({
  frontStat,
  backStat,
  toggle,
  graphStats,
}: {
  frontStat: StatType;
  backStat?: StatType;
  toggle?: boolean;
  graphStats?: ChartData[];
}) {
  const [backOpen, setBackOpen] = useState(false);
  const [graphOpen, setGraphOpen] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative  hover:opacity-90 "
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {hovered && (
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
        {toggle && hovered && (
          <button
            className="rounded-xl border border-zinc-600 bg-zinc-700 px-1.5 py-0.5"
            onClick={() => setBackOpen(!backOpen)}
          >
            {toggle ? "Toggle" : ""}
          </button>
        )}
        {hovered && graphStats && (
          <button
            className="rounded-xl border border-zinc-600 bg-zinc-700 px-1.5 py-0.5"
            onClick={() => setGraphOpen(!graphOpen)}
          >
            Graph
          </button>
        )}
      </div>
    </div>
  );
}
