import React from "react";

export default function TableHead({ columnNames }: { columnNames: string[] }) {
  return (
    <thead>
      <tr>
        {columnNames.map((col) => (
          <th key={col} className="bg-zinc-800  px-4 py-2 ">
            {col}
          </th>
        ))}
      </tr>
    </thead>
  );
}
