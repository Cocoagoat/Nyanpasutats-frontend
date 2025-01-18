import { sendRequestToView } from "@/app/actions/sendRequestToView";
import { AffinityData } from "@/app/interfaces";
import AffCookieUpdateDummyComponent from "./AffCookieUpdateDummyComponent";
import AffTable from "./AffTable";
import { getMinShared } from "./getMinShared";

function filterAffs(affs: AffinityData[], minShared: number) {
  let filteredAffs = [] as AffinityData[];
  for (const aff of affs) {
    if (aff.CommonShows >= minShared) {
      filteredAffs.push(aff);
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

  data = await sendRequestToView(params.username, "affinity", "MAL");
  let minShared = getMinShared(searchParams);

  let posAffs: AffinityData[] = filterAffs(data["PosAffs"], minShared),
    negAffs: AffinityData[] = filterAffs(data["NegAffs"], minShared);

  return (
    <>
      <div
        className="flex flex-col items-center justify-center gap-[232px]
      text-center text-white xl:flex-row"
      >
        <AffTable aff_data={posAffs.slice(0, 50)} type="Positive" />
        <AffTable aff_data={negAffs.slice(0, 50)} type="Negative" />
      </div>
      {posAffs.length == 0 && negAffs.length == 0 && (
        <>
          <div
            className="mx-24 text-center text-xl font-bold
           text-lime-600 lg:text-3xl"
          >
            <p className="mt-10">
              Looks like there aren't any users you have {minShared} shared
              shows with.{" "}
            </p>{" "}
            <p> Try lowering the threshold or watching more anime.</p>
          </div>
        </>
      )}
      <AffCookieUpdateDummyComponent />
    </>
  );
}
