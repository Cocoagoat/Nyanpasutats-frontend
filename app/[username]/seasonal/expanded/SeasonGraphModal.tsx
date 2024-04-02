import React, { useContext } from "react";
import { SingleSeasonContext } from "../reducer/SeasonalContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
  Cell,
} from "recharts";

function transformScoresForGraph(scores: { [key: string]: number }) {
  const scoreCounts = Array(10).fill(0); // Initialize an array for scores 1-10

  // Increment the count for each score
  Object.values(scores).forEach((score) => {
    if (score >= 1 && score <= 10) {
      scoreCounts[score - 1] += 1;
    }
  });

  // Transform into array of objects for Recharts
  return scoreCounts.map((count, index) => ({
    Score: index + 1,
    Shows: count,
  }));
}

const scoreColors: Record<number, string> = {
  1: "#440404",
  2: "#d84315",
  3: "#b71c1c",
  4: "#ef6c00",
  5: "#ffea00",
  6: "#eeff41",
  7: "#b3ff00",
  8: "#56ff03",
  9: "#00ff99",
  10: "#00b0ff",
};

function getMaxShowsCount(data: { Score: number; Shows: number }[]) {
  return Math.max(...data.map((d) => d.Shows));
}

export default function SeasonGraphModal({
  closeModal,
}: {
  closeModal: () => void;
}) {
  const { seasonStats } = useContext(SingleSeasonContext)!;
  const scoreCounts = transformScoresForGraph(seasonStats.ShowList);
  const maxShows = getMaxShowsCount(scoreCounts);

  return (
    <div className="absolute top-0 z-50 flex h-full w-full flex-col items-center justify-center gap-20 rounded-3xl bg-zinc-700 text-white">
      <ResponsiveContainer width="95%" height="90%">
        <BarChart data={scoreCounts}>
          <XAxis dataKey="Score" tick={{ fill: "#74ceff" }} />
          <YAxis
            domain={[0, "dataMax"]}
            tick={{ fill: "#74ceff" }}
            tickCount={maxShows}
            tickFormatter={(value) => value.toFixed(1)}
          />
          <Tooltip />
          <Legend />

          <Bar dataKey="Shows" fill="#74ceff" name="Shows">
            {scoreCounts.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={scoreColors[entry.Score]} />
            ))}
            <LabelList dataKey="Shows" fill="#000000" position="insideTop" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
