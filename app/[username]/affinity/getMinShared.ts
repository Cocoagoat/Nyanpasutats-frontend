import { URLSearchParams } from "url";

export function getMinShared(searchParams: URLSearchParams) {
  // Avoid too low/too high/troll values for searchParams
  let minSharedSearchParam =
    (searchParams.get && searchParams.get("minShared")) || "20";

  let minShared = parseInt(minSharedSearchParam);
  minShared =
    !isNaN(minShared) && minShared > 20
      ? minShared < 200
        ? minShared
        : 200
      : 20;

  return minShared;
}
