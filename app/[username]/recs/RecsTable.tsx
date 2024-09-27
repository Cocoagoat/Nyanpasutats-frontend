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
}: {
  displayedRecs: RecommendationType[];
}) {
  function constructImageUrl(rec: RecommendationType) {
    try {
      var image_url = `https://cdn.myanimelist.net/images/anime/${rec["ImageUrlSuffix1"]}/${rec["ImageUrlSuffix2"]}.jpg`;
    } catch (e) {
      var image_url = "";
    }
    return image_url;
  }
  return (
    <table>
      <TableHead
        // Remove the image column if there was an error loading images
        columnNames={showColumns}
        extraStyles="bg-gradient-to-tr from-lime-800"
      />
      <tbody>
        {displayedRecs.slice(0, 50).map((rec, index) => (
          <Rec
            rec={rec}
            index={index}
            imageUrl={constructImageUrl(rec)}
            key={rec["ShowName"]}
            error={false}
          />
        ))}
      </tbody>
    </table>
  );
}
