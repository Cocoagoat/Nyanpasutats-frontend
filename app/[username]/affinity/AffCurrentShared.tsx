"use client";
import updateCookie from "@/app/actions/updateCookie";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { MdArrowLeft, MdArrowRight } from "react-icons/md";
import { getMinShared } from "./getMinShared";
import { useUpdateRouteCookies } from "@/hooks/useUpdateRouteCookies";
import { set } from "lodash";

export default function AffCurrentShared({
  initialSearchParams,
  affCookie,
}: {
  initialSearchParams: URLSearchParams;
  affCookie: string;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const paramsSize = Object.keys(initialSearchParams).length;

  const minShared = useMemo(() => getMinShared(searchParams), [searchParams]);
  const [minSharedState, setMinSharedState] = useState(minShared);

  function handleFilter(newShared: number) {
    const params = new URLSearchParams(searchParams);
    updateCookie("affinity", "true", true);
    setMinSharedState(newShared);
    if (newShared !== minShared) {
      params.set("minShared", String(newShared));
      router.replace(`${pathname}?${params.toString()}`);
    }
  }

  useEffect(() => {
    localStorage.setItem("affinity", "true");
  }, []);
  // no useUpdateRouteCookies here because for some reason updating
  // a server-side cookie causes the page to reload in affinity, but not
  // in the other routes.

  return (
    <div className="mx-auto flex w-full justify-center gap-2">
      {minShared > 20 && (
        // Buttons will not appear if below min/above max minShared
        // and will not do anything on initial load (before tables loaded).
        <button
          onClick={
            affCookie
              ? // Why in Aidios' name does .size work in Server Components but not in Client Components???
                () => handleFilter(minShared - 10)
              : () => {}
          }
        >
          <MdArrowLeft
            size={28}
            className="font-semibold text-lime-600
             transition-colors duration-200 hover:text-lime-800"
          />
        </button>
      )}

      <input
        value={minSharedState}
        onChange={(e) => setMinSharedState(Number(e.target.value))}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleFilter(minSharedState);
          }
        }}
        maxLength={3}
        className=" max-w-[30px] rounded-lg
       bg-transparent text-center font-semibold text-lime-600 shadow-lime-600
          outline-none text-shadow
           focus:ring-2 focus:ring-blue-970 focus:ring-offset-1 focus:ring-offset-blue-950  "
      />

      {minShared < 200 && (
        <button
          onClick={affCookie ? () => handleFilter(minShared + 10) : () => {}}
        >
          <MdArrowRight
            size={28}
            className="font-semibold text-lime-600
             transition-colors duration-200 hover:text-lime-800"
          />
        </button>
      )}
    </div>
  );
}
