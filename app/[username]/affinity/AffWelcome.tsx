import React from "react";
import AffCurrentShared from "./AffCurrentShared";
import { cookies } from "next/headers";

export default function AffWelcome({
  searchParams,
  affCookie,
}: {
  searchParams: URLSearchParams;
  affCookie: string;
}) {
  return (
    <div className=" mx-auto my-12 w-full max-w-front-n-center-70 bg-blue-990  p-4 text-center text-slate-200">
      <h1 className=" text-center text-4xl font-bold text-lime-600 shadow-lime-600 text-shadow-lg">
        Welcome to the Affinity section!
      </h1>
      <p className="mt-8">
        Here you can see some of the users with the highest/lowest affinity to
        you on MAL.
      </p>
      <p className="mx-auto mt-4 max-w-2xl">
        <b>Disclaimer</b> : The database is updated roughly once per season, so
        the affinities shown here may be a lot less extreme than they were when
        it was last updated - you can click on each username and check the
        affinity directly on MAL. You never know, maybe it got even higher/lower
        since then.
      </p>
      <p className="font-semibold text-lime-600">Shared anime threshold : </p>
      <AffCurrentShared initialSearchParams={searchParams} affCookie={affCookie}/>
    </div>
  );
}
