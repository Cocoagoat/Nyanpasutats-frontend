import { useParams } from "next/navigation";
import React, { useContext, useState } from "react";
import { Lato } from "next/font/google";
import { SeasonalContext } from "../../reducer/SeasonalContext";
const latoBold = Lato({ weight: "900", subsets: ["latin"] });

export default function TierListHeader({ season }: { season: string }) {
  const params = useParams<{ username: string }>();
  const { noSequels } = useContext(SeasonalContext)!;
  const [headerText, setHeaderText] = useState(
    `${params.username}'s ${season} Tier List ${noSequels ? " (No Sequels)" : ""}`,
  );

  function getColor() {
    switch (season.split(" ")[0]) {
      case "Winter":
        return "sky-550";
      case "Spring":
        return "green-400";
      case "Summer":
        return "yellow-300";
      case "Fall":
        return "orange-500";
      default:
        return "black";
    }
  }

  let seasonalColor = getColor();
  return (
    <input
      className={`w-full  bg-zinc-800 pb-6 pt-6 font-bold ${latoBold.className}
       pt-2 text-center text-4xl text-white shadow-${seasonalColor} text-shadow-md`}
      value={headerText}
      onChange={(e) => setHeaderText(e.target.value)}
    />
  );
}
