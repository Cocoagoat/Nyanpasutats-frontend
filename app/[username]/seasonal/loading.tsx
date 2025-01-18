import { retrieveQueuePosition } from "@/app/home/api";
import Loading from "@/components/general/Loading";
import UserQueueDisplay from "@/components/general/UserQueueDisplay";
import { cookies } from "next/headers";

export default async function loading() {
  let seasonalCookie = cookies().get("seasonal");
  if (seasonalCookie) {
    return <Loading spinnerType="Absolute" />;
  } else {
    let data = await retrieveQueuePosition("seasonal");
    let queuePosition = data["queuePosition"];
    return <UserQueueDisplay queuePosition={queuePosition} />;
  }
}
