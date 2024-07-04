"use client";
import updateCookie from "@/app/actions/updateCookie";
import { isValidNumber } from "@/utils/checkValidValues";
import { revalidatePath } from "next/cache";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { MdArrowLeft, MdArrowRight } from "react-icons/md";

export default function AffCurrentShared({
  initialSearchParams,
}: {
  initialSearchParams: URLSearchParams;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [cookieSet, setCookieSet] = React.useState(false);

  function handleFilter(newShared: number) {
    const params = new URLSearchParams(searchParams);
    params.set("minShared", String(newShared));
    router.replace(`${pathname}?${params.toString()}`);
  }
  console.log(
    "initialSearchParams",
    initialSearchParams,
    initialSearchParams.size,
  );

  //   initialSearchParams = new URLSearchParams(searchParams);
  //   console.log("Initial search params are", searchParams);
  console.log(searchParams.get("minShared"));

  let minSharedSearchParam =
    (searchParams.get && searchParams.get("minShared")) || "20";
  console.log(
    "is minSharedSearchParam valid?",
    isValidNumber(minSharedSearchParam),
  );
  let minShared = parseInt(minSharedSearchParam);
  minShared =
    !isNaN(minShared) && minShared > 20
      ? minShared < 200
        ? minShared
        : 200
      : 20;

  return (
    <div className="mx-auto flex w-full justify-center gap-2">
      {minShared > 20 && (
        <button
          onClick={
            Object.keys(initialSearchParams).length // Why in the seven hells does .size work in Server Components but not in Client Components???
              ? () => handleFilter(minShared - 10)
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
