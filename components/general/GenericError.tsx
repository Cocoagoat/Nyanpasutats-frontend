import Link from "next/link";
import React from "react";

export default function GenericError({
  errorMessage,
}: {
  errorMessage: string;
}) {
  return (
    <div className=" mx-auto mt-52 flex max-w-front-n-center-65 flex-col items-center justify-start gap-20">
      <h2 className=" text-center text-5xl font-semibold text-lime-600">
        {errorMessage}
      </h2>
      <Link
        href={"/home"}
        className="rounded-3xl bg-blue-990
         p-4 text-white shadow-lg shadow-lime-600 hover:bg-blue-970"
      >
        Go back
      </Link>
    </div>
  );
}
