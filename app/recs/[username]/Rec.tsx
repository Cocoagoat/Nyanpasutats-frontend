import { RecommendationType } from "@/app/interfaces";
import Image from "next/image";
import React from "react";

const temp_img_url = "https://cdn.myanimelist.net/images/anime/1447/114282.jpg";
export default function Recommendation({ rec }: { rec: RecommendationType }) {
  return (
    <tr>
      <td>
        <Image src={temp_img_url} alt="Test image" width={75} height={105} />
      </td>
      <td>{rec["ShowName"]}</td>

      <td>{rec.PredictedScore}</td>
      <td>{rec.UserScore}</td>
      <td>{rec.MALScore}</td>
      <td>{parseFloat((rec.PredictedScore - rec.MALScore).toFixed(2))}</td>
    </tr>
  );
}
