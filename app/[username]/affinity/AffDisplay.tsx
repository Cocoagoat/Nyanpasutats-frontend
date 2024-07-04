import { retrieveTaskData } from "@/app/actions/retrieveTaskData";
import { startTask } from "@/app/actions/startTask";
import { assertUsernameInCache } from "@/app/home/api";
import { AffinitiesData } from "@/app/interfaces";
import GenericError from "@/components/general/GenericError";
import { redirect } from "next/navigation";
import AffTable from "./AffTable";
import { getMinShared } from "./getMinShared";

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
  searchParams,
}: {
  params: { username: string };
  searchParams: URLSearchParams;
}) {
  let data = [];

  let userFound = await assertUsernameInCache(params.username);

  //   try {
  //     userFound = await assertUsernameInCache(params.username);
  //   } catch (err) {
  //     console.log("Error is now : ", err);
  //   }

  if (!userFound) {
    return (
      <GenericError
        errorMessage={
          "Unauthorized user - please submit your username through the home page."
        }
      />
    );
  }

  const taskId = await startTask(params.username, "affinity", "MAL");
  console.log("Task response in page : ", taskId);
  if (taskId === undefined) {
    throw new Error("Task ID is undefined");
  }
  data = await retrieveTaskData(taskId, params.username);

  //   try {
  //     const taskId = await startTask(params.username, "affinity", "MAL");
  //     console.log("Task response in page : ", taskId);
  //     if (taskId === undefined) {
  //       throw new Error("Task ID is undefined");
  //     }
  //     data = await retrieveTaskData(taskId, params.username);
  //   } catch (err) {
  //     let error = (err as Error).message;
  //   }

  let minShared = getMinShared(searchParams);
  let posAffs: AffinitiesData = filterAffs(data["PosAffs"], minShared),
    negAffs: AffinitiesData = filterAffs(data["NegAffs"], minShared);

  if (!searchParams.size) {
    redirect(`/${params.username}/affinity?minShared=${minShared}`);
  }

  return (
    <div className="flex flex-row items-center justify-center gap-48 overflow-y-scroll text-center text-white">
      <AffTable aff_data={posAffs} type="Positive" />

      <AffTable aff_data={negAffs} type="Negative" />
    </div>
  );
}
