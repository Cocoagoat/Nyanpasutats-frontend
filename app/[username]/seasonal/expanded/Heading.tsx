import React, { useContext } from "react";
import {
  SeasonalContext,
  useSingleSeasonContext,
} from "../reducer/SeasonalContext";
import { useParams } from "next/navigation";
import { Lato } from "next/font/google";
const latoBold = Lato({ weight: "900", subsets: ["latin"] });

export default function Heading() {
  const { season } = useSingleSeasonContext();
  const params = useParams<{ username: string }>();

  const { noSequels } = useContext(SeasonalContext)!;

  return (
    <h2
      className={`text-3xl font-bold text-shadow ${
        season.startsWith("Summer") ? "shadow-black" : "shadow-slate-800"
      } ${latoBold.className}`}
    >
      {params.username}'{params.username.endsWith("s") ? " " : "s "}
      {season} Summary {noSequels ? "(No Sequels)" : ""}
    </h2>
  );
}
