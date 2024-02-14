import React from "react";

import { AffTableType, AffinitiesData } from "@/app/interfaces";
import AffTableHeader from "./AffTableHeader";
import TableHead from "@/components/general/TableHead";
import AffTableBody from "./AffTableBody";

export default function AffTable({
  aff_data,
  type,
}: {
  aff_data: AffinitiesData;
  type: AffTableType;
}) {
  const columnNames = ["", "Username", "Affinity", "Shared Anime"];
  return (
    <div className="flex flex-col my-10 gap-10">
      <AffTableHeader type={type} />
      <table>
        <TableHead columnNames={columnNames} />
        <AffTableBody aff_data={aff_data} />
      </table>
    </div>
  );
}
