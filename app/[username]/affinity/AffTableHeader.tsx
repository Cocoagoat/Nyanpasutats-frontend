import { AffTableType } from "@/app/interfaces";
import React from "react";

export default function AffTableHeader({ type }: { type: AffTableType }) {
  return (
    <h1
      className={`sticky top-0 z-30 text-3xl ${
        type === "Positive"
          ? "text-2xl font-semibold text-lime-600 "
          : "text-2xl font-semibold text-red-500"
      }   h-[4rem] bg-blue-990 p-4`}
    >
      {
        type === "Positive" ? "Exquisite Taste" : "Shit Taste Gallery"
        // <>
        //   <span>I have no enemies...</span>
        //   <span className="font-semibold">but they are the exception.</span>
        // </>
      }
    </h1>
  );
}
