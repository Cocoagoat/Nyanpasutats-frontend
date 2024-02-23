import { getShowData } from "@/app/home/api";
import { RecommendationType } from "@/app/interfaces";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const temp_img_url = "https://cdn.myanimelist.net/images/anime/1447/114282.jpg";

export default function Rec({
  rec,
  index,
  imageUrl,
  error,
}: {
  rec: RecommendationType;
  index: number;
  imageUrl: string;
  error: boolean;
}) {
  console.log(imageUrl);
  return (
    <tr
      className={` ${index % 2 == 0 ? " bg-gradient-to-br from-blue-970" : " bg-opacity-10 bg-gradient-to-tr from-lime-800"} h-[105px]`}
    >
      {!error && (
        <td>
          <Image
            className="mx-auto rounded-3xl py-2"
            src={imageUrl}
            alt="Test image"
            width={75}
            height={105}
          />
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

// export type RecDropdownProps = {
//   rec: RecommendationType;

// };

// export function Recommendation({ rec }: { rec: RecommendationType }) {
//   title,
//   subtitle,
//   highScore,
//   backgroundImage,
//   imageSrc,
// }) => {
//   return (
//     <div
//       className="relative overflow-hidden rounded-lg shadow-md text-white"
//       style={{
//         backgroundImage: `url(${backgroundImage})`,
//         backgroundSize: 'cover',
//         filter: 'blur(8px)', // You can adjust the blur level here
//       }}
//     >
//       <div className="bg-black bg-opacity-50 backdrop-filter backdrop-blur-lg">
//         <div className="flex justify-between items-center p-4">
//           <div>
//             <h3 className="text-lg font-bold">{title}</h3>
//             <p className="text-sm">{subtitle}</p>
//             <p className="text-sm">High Score: {highScore}</p>
//           </div>
//           <img src={imageSrc} alt="" className="w-16 h-16" />
//         </div>
//         <div className="bg-black bg-opacity-75 text-center py-2 cursor-pointer">
//           Expand
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DropdownComponent;
