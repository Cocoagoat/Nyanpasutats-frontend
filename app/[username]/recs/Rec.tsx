import { getShowData } from "@/app/home/api";
import { RecommendationType } from "@/app/interfaces";
import Image from "next/image";
import React from "react";

const temp_img_url = "https://cdn.myanimelist.net/images/anime/1447/114282.jpg";

export default async function Rec({ rec }: { rec: RecommendationType }) {
  // const img_url = await getShowData(rec["ShowName"], "img_url");
  return (
    <tr>
      <td>
        <Image src={temp_img_url} alt="Test image" width={75} height={105} />
      </td>
      <td className="w-[350px]">{rec["ShowName"]}</td>

      <td>{rec.PredictedScore}</td>
      <td>{rec.UserScore}</td>
      <td>{rec.MALScore}</td>
      <td>{parseFloat((rec.PredictedScore - rec.MALScore).toFixed(2))}</td>
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
