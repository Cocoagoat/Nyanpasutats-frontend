import React from "react";
import Rec from "./Rec";
import { RecommendationType } from "@/app/interfaces";
import TableHead from "@/components/general/TableHead";

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
  imageError,
  imageLoading,
}: {
  displayedRecs: RecommendationType[];
  imageUrls: string[];
  imageError: boolean;
  imageLoading: boolean;
}) {
  return (
    <table>
      <TableHead
        columnNames={!imageError ? showColumns : showColumns.slice(1)}
        extraStyles="bg-gradient-to-tr from-lime-800"
      />
      <tbody>
        {displayedRecs.slice(0, 50).map((rec, index) => (
          <Rec
            rec={rec}
            index={index}
            imageUrl={imageUrls[index]}
            key={rec["ShowName"]}
            error={imageUrls[index] === undefined}
            loading={imageLoading}
          />
        ))}
      </tbody>
    </table>
  );
}
