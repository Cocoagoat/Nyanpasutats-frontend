import { retrieveQueuePosition } from "@/app/home/api";
import { Nav } from "@/components/general/Nav";
import Padoru from "@/components/general/Padoru";
import { Suspense } from "react";
import { URLSearchParams } from "url";
import AffDisplay from "./AffDisplay";
import AffQueueDisplay from "./AffQueueDisplay";
import AffWelcome from "./AffWelcome";
import { getMinShared } from "./getMinShared";
import { cookies } from "next/headers";
import GenericError from "@/components/general/GenericError";

export async function generateMetadata({
  params,
}: {
  params: { username: string };
}) {
  return {
    title: `${params.username} / Affinity Finder`,
    description: `${params.username}'s highest and lowest
     affinities with other MAL users.`,
  };
}

export default async function page({
  params,
  searchParams,
}: {
  params: { username: string };
  searchParams: URLSearchParams;
}) {
  // In case someone got past the middleware that redirects people who change the URL
  const usernameCookie = cookies().get("username")?.["value"] as string;
  if (!usernameCookie || usernameCookie != params.username) {
    return (
      <GenericError
        errorMessage={
          "Unauthorized user - please submit your username through the home page."
        }
      />
    );
  }

  searchParams = new URLSearchParams(searchParams);
  let minShared = getMinShared(searchParams);
  let queuePosition = (await retrieveQueuePosition()).queuePosition;

  return (
    <>
      <Nav />
      <>
        <div className="flex flex-col">
          <AffWelcome searchParams={searchParams} />
        </div>
        <Suspense
          fallback={
            searchParams.size ? (
              <Padoru />
            ) : (
              <AffQueueDisplay queuePosition={queuePosition} />
            )
          }
          key={minShared}
        >
          <AffDisplay params={params} searchParams={searchParams} />
        </Suspense>
      </>
    </>
  );
}
