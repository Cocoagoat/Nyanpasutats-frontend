import { retrieveQueuePosition } from "@/app/home/api";
import React from "react";

export default function UserQueueDisplay({
  queuePosition,
}: {
  queuePosition: number;
}) {
  return (
    <div
      className=" mx-auto mt-36 flex max-w-front-n-center-65 flex-col items-center
     justify-start  px-10 text-center text-3xl font-semibold text-lime-600
      shadow-black text-shadow"
    >
      <h2>
        Your request has been received. Your current position in the queue is :
      </h2>
      <p className="mt-8 text-5xl shadow-lime-600 text-shadow-lg">
        {queuePosition}
      </p>
      <p className="mt-16">
        This page will refresh automatically once your statistics are gathered.
      </p>
    </div>
  );
}
