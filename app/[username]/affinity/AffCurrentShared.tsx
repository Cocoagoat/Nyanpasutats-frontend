"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { MdArrowLeft, MdArrowRight } from "react-icons/md";
import { getMinShared } from "./getMinShared";

export default function AffCurrentShared({
  initialSearchParams,
}: {
  initialSearchParams: URLSearchParams;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  function handleFilter(newShared: number) {
    // Filter redirects to new URL with updated minShared value,
    // allowing for server-side filtering instead of working with client-side state.
    const params = new URLSearchParams(searchParams);
    params.set("minShared", String(newShared));
    router.replace(`${pathname}?${params.toString()}`);
  }

  let minShared = getMinShared(searchParams);

  return (
    <div className="mx-auto flex w-full justify-center gap-2">
      {minShared > 20 && (
        // Buttons will not appear if below min/above max minShared
        // and will not do anything on initial load (before tables loaded).
        <button
          onClick={
            Object.keys(initialSearchParams).length
              ? // Why in Aidios' name does .size work in Server Components but not in Client Components???
                () => handleFilter(minShared - 10)
              : () => {}
          }
        >
          <MdArrowLeft size={28} className="font-semibold text-lime-600" />
        </button>
      )}

      <p className="font-semibold text-lime-600 shadow-lime-600 text-shadow">
        {minShared}
      </p>

      {minShared < 200 && (
        <button
          onClick={
            Object.keys(initialSearchParams).length
              ? () => handleFilter(minShared + 10)
              : () => {}
          }
        >
          <MdArrowRight size={28} className="font-semibold text-lime-600" />
        </button>
      )}
    </div>
  );
}
