import React from "react";
import AffTable from "./AffTable";
import AffWelcome from "./AffWelcome";
import { AffinitiesData } from "@/app/interfaces";
import { isValidNumber } from "@/utils/checkValidValues";
import { assertUsernameInCache } from "@/app/home/api";
import GenericError from "@/components/general/GenericError";
import { startTask } from "@/app/actions/startTask";
import { retrieveTaskData } from "@/app/actions/retrieveTaskData";

function filterAffs(affs: AffinitiesData, minShared: number) {
  let filteredAffs = {} as AffinitiesData;
  for (const [username, aff] of Object.entries(affs)) {
    if (aff.CommonShows >= minShared) {
      filteredAffs[username] = aff;
    }
  }
  return filteredAffs;
}

export default async function AffDisplay({
  params,
  minShared,
}: {
  params: { username: string };
  minShared: number;
}) {
  let error = null;
  let data = [];
  //   console.log(searchParams);
  //   searchParams = new URLSearchParams(searchParams);
  //   console.log(searchParams.get("minShared"));
  //   let minSharedSearchParam =
  //     (searchParams.get && searchParams.get("minShared")) || "20";
  //   console.log(
  //     "is minSharedSearchParam valid?",
  //     isValidNumber(minSharedSearchParam),
  //   );
  //   console.log("parsed minSharedSearchParam", parseInt(minSharedSearchParam));
  //   let minShared =
  //     isValidNumber(minSharedSearchParam) && parseInt(minSharedSearchParam) > 20
  //       ? parseInt(minSharedSearchParam)
  //       : 20;
  //   console.log("minShared", minShared);
  // const siteCookie = getSiteCookie();
  // const affinityCookie = getPathCookie("affinity");
  // console.log("affinityCookie is", affinityCookie);
  // if (!affinityCookie) {
  //   console.log("revalidating...");
  //   revalidatePath(`${params.username}/affinity`);
  // }

  let userFound = false;
  try {
    userFound = await assertUsernameInCache(params.username);
  } catch (err) {
    console.log("Error is now : ", err);
  }

  if (!userFound) {
    return (
      <GenericError
        errorMessage={
          "Unauthorized user - please submit your username through the home page."
        }
      />
    );
  }

  try {
    const taskId = await startTask(params.username, "affinity", "MAL");
    console.log("Task response in page : ", taskId);
    if (taskId === undefined) {
      throw new Error("Task ID is undefined");
    }
    data = await retrieveTaskData(taskId, params.username);
  } catch (err) {
    error = (err as Error).message;
  }
  let posAffs: AffinitiesData = filterAffs(data["PosAffs"], minShared),
    negAffs: AffinitiesData = filterAffs(data["NegAffs"], minShared);
  return (
    <div className="flex flex-row items-center justify-center gap-48 overflow-y-scroll text-center text-white">
      <AffTable aff_data={posAffs} type="Positive" />

      <AffTable aff_data={negAffs} type="Negative" />
    </div>
  );
}
