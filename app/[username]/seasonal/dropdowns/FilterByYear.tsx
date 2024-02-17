import React, { use, useState } from "react";
import { useHandlers } from "../reducer/useHandlers";
import { DropdownType } from "@/app/interfaces";
import { SeasonalDispatchContext } from "../reducer/SeasonalContext";
import { Action } from "../reducer/actions";

export default function FilterByYear({
  type,
  customDispatch,
}: {
  type: DropdownType;
  customDispatch?: React.Dispatch<Action>;
}) {
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");
  //   const [isOpen, setIsOpen] = useState(false);
  const dispatch = React.useContext(SeasonalDispatchContext)!;
  const dispatchToUse =
    type === "Full" || !customDispatch ? dispatch : customDispatch;
  // let handleFilterByYear = ""

  // const useHandlersType = type === "Recs" ? "recs" : "seasonal";
  // TypeScript is dumb so above line doesn't work
  // if (type === "Recs") {
  //   let { handleFilterByYear } = useHandlers(dispatchToUse, "recs");
  // } else {
  //   let { handleFilterByYear } = useHandlers(dispatchToUse, "seasonal");
  // }

  let handleFilterByYear: (startYear: number, endYear: number) => void;
  let handleResetFilter: () => void;
  if (type === "Recs") {
    ({ handleFilterByYear, handleResetFilter } = useHandlers(
      dispatchToUse,
      "recs",
    ));
  } else {
    // Assuming RecHandlers has the same type of handlers
    ({ handleFilterByYear, handleResetFilter } = useHandlers(
      dispatchToUse,
      "seasonal",
    ));
  }

  return (
    <div className="absolute left-0 z-50 mt-2 rounded-lg bg-zinc-700 p-4 shadow-lg">
      <div className="flex flex-col space-y-4">
        <input
          type="number"
          placeholder="Start Year"
          value={startYear}
          onChange={(e) => setStartYear(e.target.value)}
          className="border border-zinc-600 bg-zinc-700 text-white focus:border-sky-550"
        />
        <input
          type="number"
          placeholder="End Year"
          value={endYear}
          onChange={(e) => setEndYear(e.target.value)}
          className="border border-zinc-600 bg-zinc-700 text-white focus:border-sky-550"
        />
        <div className="flex justify-center gap-10">
          <button
            onClick={() =>
              handleFilterByYear(Number(startYear), Number(endYear))
            }
            className=" w-1/3 self-center rounded-md border border-zinc-600 p-1 text-white transition-colors duration-200 hover:bg-sky-550"
          >
            Apply
          </button>
          <button
            onClick={handleResetFilter}
            className=" w-1/3 self-center rounded-md border border-zinc-600 p-1 text-white transition-colors duration-200 hover:bg-sky-550"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
