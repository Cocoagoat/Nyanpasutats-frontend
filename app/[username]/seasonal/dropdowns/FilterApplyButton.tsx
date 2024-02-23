// import React, { useEffect, useRef } from "react";

// export default function FilterApplyButton({
//   handleRangeFilter,
//   min,
//   max,
// }: {
//   handleRangeFilter: (min: number, max: number) => void;
//   min: string;
//   max: string;
// }) {
//   const applyButtonRef = useRef<HTMLButtonElement>(null);

//   useEffect(() => {
//     // Focus the apply button when the component mounts

//     applyButtonRef.current?.focus();
//   }, []);

//   return (
//     <button
//       onClick={() => handleRangeFilter(Number(min), Number(max))}
//       onKeyDown={(event) => {
//         if (event.key === "enter") handleRangeFilter(Number(min), Number(max));
//       }}
//       className=" w-1/3 self-center rounded-md border border-zinc-600 p-1 text-white transition-colors duration-200 hover:bg-sky-550"
//     >
//       Apply
//     </button>
//   );
// }
