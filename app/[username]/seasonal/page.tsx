import { Nav } from "@/components/general/Nav";
import Padoru from "@/components/general/Padoru";
import { Suspense } from "react";
import SeasonalStatsFetcher from "./SeasonalStatsFetcher";

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
