import { cookies } from "next/headers";
import React from "react";
import { retrieveQueuePosition } from "@/app/home/api";
import UserQueueDisplay from "@/components/general/UserQueueDisplay";
import { PacmanLoader } from "react-spinners";
import Image from "next/image";
import padoru from "@/public/padoru.gif";
import Padoru from "@/components/general/Padoru";

export default async function loading() {
  let recsCookie = cookies().get("recs");
  if (recsCookie) {
    return <Padoru />;
  } else {
    let data = await retrieveQueuePosition();
    let queuePosition = data["queuePosition"];
    return <UserQueueDisplay queuePosition={queuePosition} />;
  }
}
