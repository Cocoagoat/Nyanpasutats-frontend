import React from "react";

export default function RecsColumn({ columnName }: { columnName: string }) {
  return <th className="border px-4">{columnName}</th>;
}
