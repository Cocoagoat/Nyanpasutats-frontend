import { retrieveQueuePosition } from "@/app/home/api";
import Padoru from "@/components/general/Padoru";
import UserQueueDisplay from "@/components/general/UserQueueDisplay";
import { cookies } from "next/headers";

export default async function loading() {
  let seasonalCookie = cookies().get("seasonal");
  if (seasonalCookie) {
    return <Padoru />;
  } else {
    let data = await retrieveQueuePosition();
    let queuePosition = data["queuePosition"];
    return <UserQueueDisplay queuePosition={queuePosition} />;
  }
}
