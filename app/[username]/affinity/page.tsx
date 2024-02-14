import { getUserData } from "@/app/home/api";
import { AffTableType, AffinitiesData } from "@/app/interfaces";
import React from "react";
import { Nav } from "@/components/general/Nav";
import AffTable from "./AffTable";
import useToast from "@/hooks/useToast";

export default async function page({
  params,
}: {
  params: { username: AffTableType };
}) {
  try {
    const [pos_affs, neg_affs]: [AffinitiesData, AffinitiesData] =
      await getUserData(params.username, "affinity");
    return (
      <>
        <Nav />
        <div className="flex flex-col items-center justify-center gap-48 border-sky-550 text-center text-lg text-white lg:flex-row">
          <AffTable aff_data={pos_affs} type="Positive" />
          <AffTable aff_data={neg_affs} type="Negative" />
        </div>
      </>
    );
  } catch (error) {
    const { notifyError } = useToast();
    const err = error as Error;
    notifyError(err.message);
  }
}
