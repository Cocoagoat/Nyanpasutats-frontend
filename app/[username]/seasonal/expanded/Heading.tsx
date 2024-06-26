import React, { useContext, useState } from "react";
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
  const [text, setText] =
    useState(`${params.username}${params.username.endsWith("s") ? "'" : "'s"}
  ${season} Summary ${noSequels ? "(No Sequels)" : ""}`);

  return (
    <input
      className={`w-full bg-transparent text-center text-3xl font-bold text-shadow ${
        season.startsWith("Summer") ? "shadow-black" : "shadow-slate-800"
      } ${latoBold.className}`}
      value={text}
      onChange={(e) => setText(e.target.value)}
    ></input>
  );
}
