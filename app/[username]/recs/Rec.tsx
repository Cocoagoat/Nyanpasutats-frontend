import { RecommendationType } from "@/app/interfaces";
import Image from "next/image";
import React from "react";

export default function Rec({
  rec,
  index,
  imageUrl,
  error,
  loading,
}: {
  rec: RecommendationType;
  index: number;
  imageUrl: string;
  error: boolean;
  loading: boolean;
}) {
  console.log(imageUrl);
  return (
    <tr
      className={` ${index % 2 == 0 ? " bg-gradient-to-br from-blue-970" : " bg-opacity-10 bg-gradient-to-tr from-lime-800"} h-[105px]`}
    >
      {!error && (
        <td>
          {!loading ? (
            <Image
              className="mx-auto rounded-3xl py-2"
              src={imageUrl}
              alt="Test image"
              width={75}
              height={105}
            />
          ) : (
            <div className="mx-auto h-[105px] w-[75px] animate-pulse rounded-3xl bg-zinc-800 py-2" />
          )}
        </td>
      )}
      <td className="w-[350px] text-center">{rec["ShowName"]}</td>

      <td className="text-center">{rec.PredictedScore}</td>
      <td className="text-center">{rec.UserScore}</td>
      <td className="text-center">{rec.MALScore}</td>
      <td className="text-center">
        {parseFloat((rec.PredictedScore - rec.MALScore).toFixed(2))}
      </td>
    </tr>
  );
}
