import { AffTableType } from "@/app/interfaces";
import React from "react";

export default function AffTableHeader({ type }: { type: AffTableType }) {
  return (
    <h1
      className={`sticky top-0 z-30 text-3xl ${
        type === "Positive"
          ? "text-3xl font-semibold text-sky-550 "
          : "text-xl text-red-500"
      }   h-[4rem] bg-zinc-800 p-4`}
    >
      {type === "Positive" ? (
        "MY BESTO FRIENDOS"
      ) : (
        <>
          <span>I have no enemies...</span>
          <span className="font-semibold">but they are the exception.</span>
        </>
      )}
    </h1>
  );
}
