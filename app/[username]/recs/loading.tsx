import { retrieveQueuePosition } from "@/app/home/api";
import Loading from "@/components/general/Loading";
import UserQueueDisplay from "@/components/general/UserQueueDisplay";
import { cookies } from "next/headers";

export default async function loading() {
  let recsCookie = cookies().get("recs");
  if (recsCookie) {
    return <Loading spinnerType="Absolute" />;
  } else {
    let data = await retrieveQueuePosition("recs");
    let queuePosition = data["queuePosition"];
    return <UserQueueDisplay queuePosition={Math.max(queuePosition, 1)} />;
  }
}
