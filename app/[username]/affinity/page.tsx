import { retrieveQueuePosition } from "@/app/home/api";
import { Nav } from "@/components/general/Nav";
import { Suspense } from "react";
// import { URLSearchParams } from "url";
import AffDisplay from "./AffDisplay";
import AffQueueDisplay from "./AffQueueDisplay";
import AffWelcome from "./AffWelcome";
import { getMinShared } from "./getMinShared";
import { cookies } from "next/headers";
import GenericError from "@/components/general/GenericError";
import Loading from "@/components/general/Loading";
import { redirect } from "next/navigation";

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

  const siteCookie = cookies().get("currentSite")?.["value"] as string;
  if (siteCookie != "MAL") {
    return (
      <GenericError
        errorMessage={"Affinity is only available for MyAnimeList users."}
      />
    );
  }

  searchParams = new URLSearchParams(searchParams);
  let minShared = getMinShared(searchParams);
  let queuePosition = (await retrieveQueuePosition("affs")).queuePosition;

  const affCookie = cookies().get("affinity")?.["value"] as string;

  return (
    <>
      <Nav />
      <div
        className="hiddenscrollbar absolute inset-0
       mx-auto my-auto mt-20 max-h-front-n-center max-w-front-n-center-80 overflow-y-scroll"
      >
        <div className=" flex flex-col ">
          <AffWelcome searchParams={searchParams} affCookie={affCookie} />
        </div>
        <Suspense
          fallback={
            affCookie ? (
              <Loading spinnerType="Absolute" />
            ) : (
              <AffQueueDisplay queuePosition={queuePosition} />
            )
          }
          key={minShared}
        >
          <AffDisplay params={params} searchParams={searchParams} />
        </Suspense>
      </div>
    </>
  );
}
