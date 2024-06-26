import { cookies } from "next/headers";
import React from "react";
import { retrieveQueuePosition } from "@/app/home/api";
import UserQueueDisplay from "@/components/general/UserQueueDisplay";
import Image from "next/image";
import padoru from "@/public/padoru.gif";
import Padoru from "@/components/general/Padoru";

export default async function loading() {
  let seasonalCookie = cookies().get("seasonal");
  console.log("Fuck you", seasonalCookie);
  if (seasonalCookie) {
    return <Padoru />;
  } else {
    console.log("Fuck you piece of shit");
    let data = await retrieveQueuePosition();
    console.log("Return of queuePosition", data);
    let queuePosition = data["queuePosition"];

    return <UserQueueDisplay queuePosition={queuePosition} />;
  }
}
