import { assertUsernameInCache, startTask } from "@/app/home/api";
import { retrieveTaskData } from "@/app/actions/retrieveTaskData";
import React from "react";
import { SeasonsData } from "@/app/interfaces";
import SeasonalStatsBox from "./SeasonalStatsBox";
import { Nav } from "@/components/general/Nav";
import GenericError from "@/components/general/GenericError";
import { cookies } from "next/headers";
import { getSiteCookie } from "@/utils/CookieUtils";
import { Suspense } from "react";
import SeasonalStatsFetcher from "./SeasonalStatsFetcher";
import Padoru from "@/components/general/Padoru";

export async function generateMetadata({
  params,
}: {
  params: { username: string };
}) {
  return {
    title: `${params.username} / Seasonal`,
    description: `${params.username}'s seasonal stats`,
  };
}

export default async function page({
  params,
}: {
  params: { username: string };
}) {
  return (
    <>
      <Nav />
      <Suspense fallback={<Padoru />}>
        <SeasonalStatsFetcher username={params.username} />
      </Suspense>
    </>
  );
}
