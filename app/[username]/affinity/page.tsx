import { assertUsernameInCache, startTask } from "@/app/home/api";
import { AffinitiesData } from "@/app/interfaces";
import { retrieveTaskData } from "@/app/actions/retrieveTaskData";
import React, { Suspense } from "react";
import { Nav } from "@/components/general/Nav";
import AffTable from "./AffTable";
import GenericError from "@/components/general/GenericError";
import styles from "./Affinity.module.css";
import { getSiteCookie, getPathCookie } from "@/utils/CookieUtils";
import { revalidatePath } from "next/cache";
import AffWelcome from "./AffWelcome";
import { isValidNumber } from "@/utils/checkValidValues";
import { URLSearchParams } from "url";
import Padoru from "@/components/general/Padoru";
import AffDisplay from "./AffDisplay";

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

function filterAffs(affs: AffinitiesData, minShared: number) {
  let filteredAffs = {} as AffinitiesData;
  for (const [username, aff] of Object.entries(affs)) {
    if (aff.CommonShows >= minShared) {
      filteredAffs[username] = aff;
    }
  }
  return filteredAffs;
}

export default async function page({
  params,
  searchParams,
}: {
  params: { username: string };
  searchParams: URLSearchParams;
}) {
  // let error = null;
  // let data = [];
  // console.log(searchParams);
  searchParams = new URLSearchParams(searchParams);
  console.log(searchParams.get("minShared"));
  let minSharedSearchParam =
    (searchParams.get && searchParams.get("minShared")) || "20";
  console.log(
    "is minSharedSearchParam valid?",
    isValidNumber(minSharedSearchParam),
  );
  console.log("parsed minSharedSearchParam", parseInt(minSharedSearchParam));
  let minShared =
    isValidNumber(minSharedSearchParam) && parseInt(minSharedSearchParam) > 20
      ? parseInt(minSharedSearchParam)
      : 20;
  // console.log("minShared", minShared);
  // // const siteCookie = getSiteCookie();
  // // const affinityCookie = getPathCookie("affinity");
  // // console.log("affinityCookie is", affinityCookie);
  // // if (!affinityCookie) {
  // //   console.log("revalidating...");
  // //   revalidatePath(`${params.username}/affinity`);
  // // }

  // let userFound = false;
  // try {
  //   userFound = await assertUsernameInCache(params.username);
  // } catch (err) {
  //   console.log("Error is now : ", err);
  // }

  // if (!userFound) {
  //   return (
  //     <GenericError
  //       errorMessage={
  //         "Unauthorized user - please submit your username through the home page."
  //       }
  //     />
  //   );
  // }

  // try {
  //   const taskId = await startTask(params.username, "affinity", "MAL");
  //   console.log("Task response in page : ", taskId);
  //   if (taskId === undefined) {
  //     throw new Error("Task ID is undefined");
  //   }
  //   data = await retrieveTaskData(taskId, params.username);
  // } catch (err) {
  //   error = (err as Error).message;
  // }
  // let posAffs: AffinitiesData = filterAffs(data["PosAffs"], minShared),
  //   negAffs: AffinitiesData = filterAffs(data["NegAffs"], minShared);

  return (
    <>
      <Nav />

      <>
        <div className="flex flex-col">
          <AffWelcome minShared={minShared} />
        </div>
        <Suspense fallback={<Padoru />} key={minShared}>
          <AffDisplay params={params} minShared={minShared} />
        </Suspense>
      </>
    </>
  );
}
