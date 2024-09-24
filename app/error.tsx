"use client";
import GenericError from "@/components/general/GenericError";
import React from "react";

export default function error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const allowedErrors = [
    "User does not exist.",
    "This user's list is private.",
  ];
  const errorMessage = allowedErrors.includes(error.message)
    ? `Error - ${error.message}`
    : `An unknown error
   occurred on our side. Please try again later.`;
  return (
    <div className=" mx-auto mt-52 flex max-w-front-n-center-65 flex-col items-center justify-start gap-20">
      <GenericError errorMessage={errorMessage} />
    </div>
  );
}
