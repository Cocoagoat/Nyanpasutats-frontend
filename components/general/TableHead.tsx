import React from "react";

export default function TableHead({ columnNames }: { columnNames: string[] }) {
  return (
    <thead>
      <tr>
        {columnNames.map((col) => (
          <th key={col} className="py-2  bg-zinc-800 px-4 ">
            {col}
          </th>
        ))}
      </tr>
    </thead>
  );
}
