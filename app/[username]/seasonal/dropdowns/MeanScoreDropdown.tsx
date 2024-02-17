// import SettingsButton from "@/components/general/SettingsButton";
// import React, { useContext, useState } from "react";
// import { displayedMeanOptions } from "@/app/interfaces";
// import {
//   SeasonalContext,
//   SeasonalDispatchContext,
// } from "../reducer/SeasonalContext";

// export default function MeanScoreDropdown() {
//   const [isOpen, setIsOpen] = useState(false);
//   const toggleDropdown = () => setIsOpen(!isOpen);

//   const dispatch = useContext(SeasonalDispatchContext)!;
//   const { displayedMean } = useContext(SeasonalContext)!;

//   function handleChangeDisplayedMean({
//     displayMean,
//   }: {
//     displayMean: displayedMeanOptions;
//   }): void {
//     dispatch({
//       type: "CHANGE_DISPLAYED_MEAN",
//       payload: displayMean,
//     });
//     setIsOpen(false);
//   }

//   return (
//     <div className="relative inline-block mx-16 z-50">
//       <SettingsButton onClick={toggleDropdown}>
//         Mean Score Method
//       </SettingsButton>
//       {isOpen && (
//         <div className="bg-zinc-700 w-24 md:w-44 shadow-md text-xs md:text-sm text-center text-white rounded-md py-2">
//           <div
//             onClick={() =>
//               handleChangeDisplayedMean({ displayMean: "AvgScore" })
//             }
//             className="cursor-pointer transition-colors duration-200  hover:bg-sky-550  mb-1"
//           >
//             All Shows
//           </div>
//           <div
//             onClick={() =>
//               handleChangeDisplayedMean({ displayMean: "FavoritesAvgScore" })
//             }
//             className="cursor-pointer transition-colors duration-200  hover:bg-sky-550  mb-1"
//           >
//             Top 10
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
