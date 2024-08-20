import { cookies } from "next/headers";
import React from "react";
import { retrieveQueuePosition } from "@/app/home/api";
import UserQueueDisplay from "@/components/general/UserQueueDisplay";
import Padoru from "@/components/general/Padoru";

export default async function loading() {
  let affCookie = cookies().get("affinity");
  if (affCookie) {
    return <Padoru />;
  } else {
    let data = await retrieveQueuePosition();
    let queuePosition = data["queuePosition"];
    return <UserQueueDisplay queuePosition={queuePosition} />;
  }
}
