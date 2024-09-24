"use client";
import updateCookie from "@/app/actions/updateCookie";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";
import { MdArrowLeft, MdArrowRight } from "react-icons/md";
import { getMinShared } from "./getMinShared";
import { useUpdateRouteCookies } from "@/hooks/useUpdateRouteCookies";

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

  function handleFilter(newShared: number) {
    const params = new URLSearchParams(searchParams);
    updateCookie("affinity", "true", true);
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
          <MdArrowLeft size={28} className="font-semibold text-lime-600" />
        </button>
      )}

      <p className="font-semibold text-lime-600 shadow-lime-600 text-shadow">
        {minShared}
      </p>

      {minShared < 200 && (
        <button
          onClick={affCookie ? () => handleFilter(minShared + 10) : () => {}}
        >
          <MdArrowRight size={28} className="font-semibold text-lime-600" />
        </button>
      )}
    </div>
  );
}
