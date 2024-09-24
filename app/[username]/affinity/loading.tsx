import { cookies } from "next/headers";
import React from "react";
import { retrieveQueuePosition } from "@/app/home/api";
import UserQueueDisplay from "@/components/general/UserQueueDisplay";
import Loading from "@/components/general/Loading";

export default async function loading() {
  let affCookie = cookies().get("affinity");
  if (affCookie) {
    return <Loading absolute={true} />;
  } else {
    let data = await retrieveQueuePosition("affs");
    let queuePosition = data["queuePosition"];
    return <UserQueueDisplay queuePosition={queuePosition} />;
  }
}
