import { AffinityData } from "@/app/interfaces";
import React from "react";
import AffBar from "./AffBar";
import AffUserLink from "./AffUserLink";

export default function AffRow({
  index,
  username,
  aff,
}: {
  index: number;
  username: string;
  aff: AffinityData;
}) {
  return (
    <tr className={` ${index % 2 !== 0 ? "bg-zinc-600" : "bg-zinc-800"}`}>
      <td className="p-4">{index}</td>
      <td>
        <AffUserLink affinity={aff["Affinity"]} username={username} />
      </td>
      <td>
        {/* <p className="text-sky-550 mb-1 hover:underline text-right text-sm">
          {aff["CommonShows"]} Shared
        </p> */}
        <AffBar affinity={aff["Affinity"]} />
      </td>
      <td>{aff["CommonShows"]}</td>
    </tr>
  );
}
