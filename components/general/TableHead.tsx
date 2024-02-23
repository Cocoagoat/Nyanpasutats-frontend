import React from "react";

export default function TableHead({
  columnNames,
  extraStyles,
}: {
  columnNames: string[];
  extraStyles?: string;
}) {
  return (
    <thead>
      <tr className={extraStyles}>
        {columnNames.map((col) => (
          <th key={col} className={`px-4 py-2`}>
            {col}
          </th>
        ))}
      </tr>
    </thead>
  );
}
