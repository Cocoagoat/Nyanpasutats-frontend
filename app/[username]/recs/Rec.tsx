import { getShowData } from "@/app/home/api";
import { RecommendationType } from "@/app/interfaces";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const temp_img_url = "https://cdn.myanimelist.net/images/anime/1447/114282.jpg";

export default function Rec({
  rec,
  index,
  imageUrl,
}: {
  rec: RecommendationType;
  index: number;
  imageUrl: string;
}) {
  // const [imgUrl, setImgUrl] = useState<string>(temp_img_url);
  // useEffect(() => {
  //   // Define the async function inside the effect
  //   async function fetchImgUrl() {
  //     try {
  //       const url = await getShowData(rec["ShowName"], "img_url");
  //       setImgUrl(url); // Update state with the URL
  //     } catch (error) {
  //       // Handle any errors here, such as setting a default image or logging the error
  //       console.error(error);
  //     }
  //   }

  //   // Call the async function
  //   fetchImgUrl();
  // }, [rec]);
  // const img_url = await getShowData(rec["ShowName"], "img_url");
  return (
    <tr
      className={` ${index % 2 == 0 ? " from-blue-970 bg-gradient-to-br" : " bg-opacity-10 bg-gradient-to-tr from-lime-800"}`}
    >
      <td>
        <Image
          className="mx-auto rounded-3xl py-2"
          src={imageUrl}
          alt="Test image"
          width={75}
          height={105}
        />
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
