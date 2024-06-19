import { useParams } from "next/navigation";
import React, { useContext, useState } from "react";
import { Lato } from "next/font/google";
import { SeasonalContext } from "../../reducer/SeasonalContext";
const latoBold = Lato({ weight: "900", subsets: ["latin"] });

export default function TierListHeader({
  season,
  loaded,
}: {
  season: string;
  loaded: boolean;
}) {
  const params = useParams<{ username: string }>();
  const { noSequels } = useContext(SeasonalContext)!;
  const [headerText, setHeaderText] = useState(
    `${params.username}'s ${season} Tier List ${noSequels ? " (No Sequels)" : ""}`,
  );

  function getColor() {
    switch (season.split(" ")[0]) {
      case "Winter":
        return "28b7fa";
      case "Spring":
        return "28FA2B";
      case "Summer":
        return "FCD34D";
      case "Fall":
        return "F97316";
      default:
        return "000000";
    }
  }

  let seasonalColor = getColor();
  return (
    <input
      className={`w-full ${!loaded && "hidden"}  bg-zinc-800 pb-6 pt-6 font-bold ${latoBold.className}
       pt-2 text-center text-4xl text-white text-shadow-md`}
      value={headerText}
      style={{ textShadow: `1px 2px 4px #${seasonalColor}` }}
      onChange={(e) => setHeaderText(e.target.value)}
    />
  );
}
