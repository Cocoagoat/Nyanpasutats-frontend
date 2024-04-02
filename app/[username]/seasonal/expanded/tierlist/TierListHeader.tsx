import { useParams } from "next/navigation";
import React, { useContext } from "react";
import { Lato } from "next/font/google";
import { SeasonalContext } from "../../reducer/SeasonalContext";
const latoBold = Lato({ weight: "900", subsets: ["latin"] });

export default function TierListHeader({ season }: { season: string }) {
  const params = useParams<{ username: string }>();
  const { noSequels } = useContext(SeasonalContext)!;
  return (
    <div
      className={`w-full bg-zinc-800 font-bold ${latoBold.className} pt-2 text-center text-4xl text-white shadow-black text-shadow`}
    >
      {params.username}'s {season} Tier List {noSequels ? " (No Sequels)" : ""}
    </div>
  );
}
