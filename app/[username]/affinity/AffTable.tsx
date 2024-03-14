import React from "react";

import { AffTableType, AffinitiesData } from "@/app/interfaces";
import AffTableHeader from "./AffTableHeader";
import TableHead from "@/components/general/TableHead";
import styles from "./Affinity.module.css";
import AffRow from "./AffRow";

export default function AffTable({
  aff_data,
  type,
}: {
  aff_data: AffinitiesData;
  type: AffTableType;
}) {
  const columnNames = ["", "Username", "Affinity", "Shared Anime"];
  return (
    <div
      className={`relative mb-20 mt-20 h-3/4 overflow-y-scroll  lg:mt-0 
      ${styles.hiddenscrollbar} `}
    >
      <AffTableHeader type={type} />
      <table className="lg:mt-10">
        <TableHead columnNames={columnNames} />
        <tbody>
          {Object.entries(aff_data).map(([username, aff], index) => (
            <AffRow
              username={username}
              index={index + 1}
              aff={aff}
              key={index}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
