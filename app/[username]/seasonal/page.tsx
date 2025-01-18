import { Nav } from "@/components/general/Nav";
import { Suspense } from "react";
import SeasonalStatsFetcher from "./SeasonalStatsFetcher";
import Loading from "@/components/general/Loading";

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
      <Suspense fallback={<Loading spinnerType="Absolute" />}>
        <SeasonalStatsFetcher username={params.username} />
      </Suspense>
    </>
  );
}
