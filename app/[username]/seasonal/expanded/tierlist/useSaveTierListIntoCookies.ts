import { TiersState } from "@/app/interfaces";
import useSetCookie from "@/hooks/useSetCookie";
import { useParams } from "next/navigation";

export default function useSaveTierListIntoCookies(
  tiers: TiersState,
  season: string,
) {
  const username = useParams<{ username: string }>().username;
  useSetCookie(`${username}_${season}_TierList`, JSON.stringify(tiers), [
    tiers,
  ]);
}
