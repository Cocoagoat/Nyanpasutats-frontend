import { ChartData } from "@/app/interfaces";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { displayedMeanOptions } from "@/app/interfaces";

function getFill(season: string) {
  switch (season.split(" ")[0]) {
    case "Winter":
      return "#7dd3fc";
    case "Spring":
      return "#22c55e";
    case "Summer":
      return "#ebbf39";
    case "Fall":
      return "#cd5722";
  }
  return "#cd5722";
}
export default function SeasonalBarChart({
  data,
  displayedMean,
}: {
  data: ChartData[];
  displayedMean: displayedMeanOptions;
}) {
  const new_data = data.map((season) => {
    return { ...season, fill: getFill(season.Season) };
  });
  return (
    <div className="text-black w-full h-full text-xs mt-3">
      <ResponsiveContainer width="95%" height="90%">
        <BarChart data={new_data}>
          <XAxis dataKey="Season" tick={{ fill: "#74ceff" }} />
          <YAxis
            domain={
              displayedMean !== "Shows"
                ? ["dataMin - 0.2", "dataMax + 0.2"]
                : [0, "dataMax"]
            }
            tick={{ fill: "#74ceff" }}
            tickCount={7}
            tickFormatter={(value) => value.toFixed(1)}
          />
          <Tooltip />
          <Legend />

          <Bar
            dataKey={displayedMean}
            fill="fff"
            name={displayedMean == "Shows" ? "Shows" : "Score"}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
