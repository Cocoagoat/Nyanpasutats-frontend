import { AffinityData } from "@/app/interfaces";
import toast from "react-hot-toast";
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
    <tr
      className={` ${index % 2 !== 0 ? " bg-gradient-to-br from-blue-970" : " bg-opacity-10 bg-gradient-to-tr from-lime-800"}`}
    >
      <td className="p-4">{index}</td>
      <td>
        <AffUserLink affinity={aff["Affinity"]} username={username} />
      </td>
      <td>
        <AffBar affinity={aff["Affinity"]} />
      </td>
      <td>{aff["CommonShows"]}</td>
    </tr>
  );
}
