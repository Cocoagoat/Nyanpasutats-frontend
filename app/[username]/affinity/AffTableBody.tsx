import { AffinitiesData } from "@/app/interfaces";
import React from "react";
import AffRow from "./AffRow";

export default function AffTableBody({
  aff_data,
}: {
  aff_data: AffinitiesData;
}) {
  return (
    <tbody>
      {Object.entries(aff_data).map(([username, aff], index) => (
        <AffRow username={username} index={index + 1} aff={aff} key={index} />
      ))}
    </tbody>
  );
}
