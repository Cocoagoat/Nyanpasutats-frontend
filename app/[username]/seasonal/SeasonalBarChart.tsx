import { ChartData } from "@/app/interfaces";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import { displayedMeanOptions } from "@/app/interfaces";

function getFill(season: string): string {
  const baseSeason = season.split(" ")[0];
  switch (baseSeason) {
    case "Winter":
      return "gradientWinter";
    case "Spring":
      return "gradientSpring";
    case "Summer":
      return "gradientSummer";
    case "Fall":
      return "gradientFall";
    default:
      return "gradientDefault";
  }
}

const renderYearLabel = (props: any) => {
  const { x, y, width, height, value } = props;
  const year = value.split(" ")[1];
  const season = value.split(" ")[0];

  return (
    <text
      x={x}
      y={y}
      fill="#fff"
      textAnchor="start"
      dominantBaseline="middle"
      dy={10}
      dx={5}
      style={{ textShadow: "1px 1px 2px #000", fontSize: "12px" }}
    >
      {`${season} ${year}`}
    </text>
  );
};

const renderValueLabel = (props: any) => {
  const { x, y, width, value } = props;

  return (
    <text
      x={x + width}
      y={y}
      fill="#fff"
      textAnchor="middle"
      dominantBaseline="middle"
      dy={15}
      dx={20}
      style={{ textShadow: "1px 1px 2px #000", fontSize: "max(0.6vw,8px)" }}
    >
      {value}
    </text>
  );
};

export default function SeasonalBarChart({
  data,
  displayedMean,
}: {
  data: ChartData[];
  displayedMean: displayedMeanOptions;
}) {
  const new_data = data.map((season) => {
    return { ...season, fill: `url(#${getFill(season.Season)})` };
  });
  return (
    <>
      <div
        id="seasonal-bar-chart"
        className=" mx-auto mb-10 mt-3 flex h-full w-full  justify-center overflow-y-scroll text-xs text-black"
      >
        <ResponsiveContainer
          width="50%"
          height={35 * new_data.length}
          minWidth={500}
        >
          <BarChart
            layout="vertical"
            data={new_data}
            margin={{ top: 5, right: 1 / 2, left: 1 / 2, bottom: 5 }}
          >
            <XAxis
              type="number"
              domain={[
                (dataMin: any) => Math.floor(dataMin - 0.2),
                (dataMax: any) =>
                  displayedMean !== "Shows"
                    ? Math.ceil(2 * dataMax + 0.2) / 2
                    : dataMax + 1,
              ]}
            />
            <YAxis dataKey="Season" type="category" tick={false} />

            <defs>
              <linearGradient id="gradientWinter" x1="0" y1="0" x2="0" y2="1">
                <stop offset="25%" stopColor="#41bcff" stopOpacity={0.3} />
                <stop offset="90%" stopColor="#41bcff" stopOpacity={1} />
              </linearGradient>
              <linearGradient id="gradientSpring" x1="0" y1="0" x2="0" y2="1">
                <stop offset="25%" stopColor="#22c55e" stopOpacity={0.3} />
                <stop offset="90%" stopColor="#22c55e" stopOpacity={1} />
              </linearGradient>
              <linearGradient id="gradientSummer" x1="0" y1="0" x2="0" y2="1">
                <stop offset="25%" stopColor="#ebbf39" stopOpacity={0.3} />
                <stop offset="90%" stopColor="#ebbf39" stopOpacity={1} />
              </linearGradient>
              <linearGradient id="gradientFall" x1="0" y1="0" x2="0" y2="1">
                <stop offset="25%" stopColor="#cd5722" stopOpacity={0.3} />
                <stop offset="90%" stopColor="#cd5722" stopOpacity={1} />
              </linearGradient>
              <linearGradient id="gradientDefault" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#cd5722" stopOpacity={1} />
                <stop offset="95%" stopColor="#e8a088" stopOpacity={0} />
              </linearGradient>
            </defs>

            <Bar
              dataKey={displayedMean}
              fill="#8884d8"
              barSize={35}
              direction="horizontal"
              className="shadow-lg shadow-black"
            >
              <LabelList
                dataKey="Season"
                content={renderYearLabel}
                position="centerBottom"
              />
              <LabelList
                dataKey={displayedMean}
                content={renderValueLabel}
                position="center"
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}
