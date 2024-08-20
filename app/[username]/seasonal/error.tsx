"use client";
import Link from "next/link";
import React from "react";

export default function error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className=" mx-auto mt-52 flex max-w-front-n-center-65 flex-col items-center justify-start gap-20">
      <h2 className=" text-center text-5xl font-semibold text-lime-600">
        An unknown error occurred on our side. Please try again later.
      </h2>
      <div className="flex flex-col gap-5 md:flex-row md:gap-20">
        <Link
          href={"/home"}
          className="rounded-3xl bg-blue-990 p-4 text-white shadow-lg shadow-lime-600"
        >
          Go back
        </Link>
        <button
          className="rounded-3xl bg-blue-990 p-4 text-white shadow-lg shadow-lime-600"
          onClick={() => reset()}
        >
          Try again
        </button>
      </div>
    </div>
  );
}
