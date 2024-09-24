import { TierListMode, TiersState } from "@/app/interfaces";
import useSetCookie from "@/hooks/useSetCookie";
import { useParams } from "next/navigation";
import { useContext } from "react";
import { SeasonalContext } from "../../reducer/SeasonalContext";

export default function useSaveTierListIntoCookies(
  tiers: TiersState,
  season: string,
  tierListMode: TierListMode,
) {
  if (!tiers) return;
  const username = useParams<{ username: string }>().username;
  const { noSequels } = useContext(SeasonalContext)!;
  useSetCookie(
    `${username}_${season}_TierList${noSequels ? "_NoSequels" : ""}`,
    JSON.stringify(tiers),
    [tiers],
  );
  useSetCookie(
    `${username}_${season}_TierListMode`,
    JSON.stringify(tierListMode),
    [tierListMode],
  );
}
