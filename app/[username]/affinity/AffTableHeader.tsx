import { AffTableType } from "@/app/interfaces";
import React from "react";

export default function AffTableHeader({ type }: { type: AffTableType }) {
  return (
    <h1
      className={`text-3xl ${
        type === "Positive"
          ? "text-sky-550 text-3xl font-semibold "
          : "text-red-500 text-xl"
      }  bg-zinc-800 p-4 rounded-3xl`}
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
