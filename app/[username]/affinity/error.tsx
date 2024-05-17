"use client";
import GenericError from "@/components/general/GenericError";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <GenericError errorMessage="An unexpected error occurred on our end. Please try again." />
  );
}
