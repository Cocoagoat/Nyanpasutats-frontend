import React from "react";

export default function AffQueueDisplay({
  queuePosition,
}: {
  queuePosition: number;
}) {
  return (
    <div
      className=" mx-auto mt-4 flex max-w-2xl flex-col items-center
     justify-start  px-10 text-center text-3xl font-semibold text-lime-600
      shadow-black text-shadow "
    >
      <h2>
        The data will take several minutes to load. Your current position in the
        queue is :
      </h2>
      <p className="mt-8 text-5xl shadow-lime-600 text-shadow-lg">
        {queuePosition}
      </p>
      <p className="mt-16">
        This page will refresh automatically once your statistics are gathered.
        In the meantime, you're welcome to check out the seasonal section.
      </p>
    </div>
  );
}
