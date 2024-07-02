"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { MdArrowLeft, MdArrowRight } from "react-icons/md";

export default function AffCurrentShared({ minShared }: { minShared: number }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  function handleFilter(newShared: number) {
    const params = new URLSearchParams(searchParams);
    params.set("minShared", String(newShared));
    router.replace(`${pathname}?${params.toString()}`);
  }
  return (
    <div className="mx-auto flex w-full justify-center gap-2">
      {minShared > 20 && (
        <button onClick={() => handleFilter(minShared - 10)}>
          <MdArrowLeft size={28} className="font-semibold text-lime-600" />
        </button>
      )}

      <p className="font-semibold text-lime-600 shadow-lime-600 text-shadow">
        {minShared}
      </p>

      {minShared < 200 && (
        <button onClick={() => handleFilter(minShared + 10)}>
          <MdArrowRight size={28} className="font-semibold text-lime-600" />
        </button>
      )}
    </div>
  );
}
