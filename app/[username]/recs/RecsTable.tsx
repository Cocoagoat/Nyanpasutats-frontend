import React from "react";
import Rec from "./Rec";
import { RecommendationType } from "@/app/interfaces";

const showColumns = [
  "Image",
  "Show Name",
  "Predicted Score",
  "User Score",
  "MAL Score",
  "Score Difference",
];

export default function RecsTable({
  displayedRecs,
  imageUrls,
}: {
  displayedRecs: RecommendationType[];
  imageUrls: string[];
}) {
  return (
    // <div className="overflow-y-scroll">
    <table>
      <thead>
        <tr className="bg-gradient-to-tr from-lime-800">
          {showColumns.map((col) => (
            <th key={col} className="px-4 py-2 ">
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {displayedRecs.slice(0, 50).map((rec, index) => (
          <Rec
            rec={rec}
            index={index}
            imageUrl={imageUrls[index]}
            key={rec["ShowName"]}
          />
        ))}
      </tbody>
    </table>
    // </div>
  );
}
