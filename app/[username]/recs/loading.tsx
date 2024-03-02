import React from "react";
import { retrieveQueuePosition } from "@/app/home/api";
import UserQueueDisplay from "@/components/general/UserQueueDisplay";

export default async function loading() {
  let data = await retrieveQueuePosition();
  let queuePosition = data["queuePosition"];
  return <UserQueueDisplay queuePosition={queuePosition} />;
}
