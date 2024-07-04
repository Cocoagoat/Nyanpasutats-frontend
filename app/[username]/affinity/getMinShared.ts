import { isValidNumber } from "@/utils/checkValidValues";
import { URLSearchParams } from "url";

export function getMinShared(searchParams: URLSearchParams) {
  let minSharedSearchParam =
    (searchParams.get && searchParams.get("minShared")) || "20";
  console.log(
    "is minSharedSearchParam valid?",
    isValidNumber(minSharedSearchParam),
  );
  let minShared = parseInt(minSharedSearchParam);
  minShared =
    !isNaN(minShared) && minShared > 20
      ? minShared < 200
        ? minShared
        : 200
      : 20;

  return minShared;
}
