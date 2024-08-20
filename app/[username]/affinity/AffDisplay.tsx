import { retrieveTaskData } from "@/app/actions/retrieveTaskData";
import { startTask } from "@/app/actions/startTask";
import { AffinitiesData } from "@/app/interfaces";
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

  // Start Celery task to get affinities, then ping server in intervals
  // until data is ready
  const taskId = await startTask(params.username, "affinity", "MAL");
  if (taskId === undefined) {
    throw new Error("Unknown error. Please try again.");
  }
  data = await retrieveTaskData(taskId, params.username);

  let minShared = getMinShared(searchParams);
  let posAffs: AffinitiesData = filterAffs(data["PosAffs"], minShared),
    negAffs: AffinitiesData = filterAffs(data["NegAffs"], minShared);

  if (!searchParams.size) {
    // Redirect for the initial load of the tables (not the whole page!)
    redirect(`/${params.username}/affinity?minShared=${minShared}`);
  }

  return (
    <div className="flex flex-row items-center justify-center gap-48 overflow-y-scroll text-center text-white">
      <AffTable aff_data={posAffs} type="Positive" />
      <AffTable aff_data={negAffs} type="Negative" />
    </div>
  );
}
