import { RecommendationType } from "@/app/interfaces";
import React from "react";

export default function Recommendation({ rec }: { rec: RecommendationType }) {
  return (
    <tr>
      <td>{rec.ShowName}</td>
      <td>{rec.MALScore}</td>
      <td>{rec.PredictedScore}</td>
      <td>{rec.UserScore}</td>
    </tr>
  );
}
