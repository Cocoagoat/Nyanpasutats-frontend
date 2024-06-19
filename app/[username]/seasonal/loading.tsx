import { cookies } from "next/headers";
import React from "react";
import { retrieveQueuePosition } from "@/app/home/api";
import UserQueueDisplay from "@/components/general/UserQueueDisplay";
import Image from "next/image";
import padoru from "@/public/padoru.gif";

export default async function loading() {
  let seasonalCookie = cookies().get("seasonal");
  console.log("Fuck you", seasonalCookie);
  if (seasonalCookie) {
    return (
      <Image
        src={padoru}
        alt="padoru"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      />
    );
  } else {
    console.log("Fuck you piece of shit");
    let data = await retrieveQueuePosition();
    console.log("Return of queuePosition", data);
    let queuePosition = data["queuePosition"];

    return <UserQueueDisplay queuePosition={queuePosition} />;
  }
}
