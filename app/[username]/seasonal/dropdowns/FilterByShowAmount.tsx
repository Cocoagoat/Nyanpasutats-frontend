import React, { useState } from "react";
import { useHandlers } from "../reducer/useHandlers";
import { DropdownType } from "@/app/interfaces";
import { SeasonalDispatchContext } from "../reducer/SeasonalContext";
import { Action } from "../reducer/actions";

export default function FilterByShowAmount({
  type,
  customDispatch: customDispatch,
}: {
  type: DropdownType;
  customDispatch?: React.Dispatch<Action>;
}) {
  const [minShows, setMinShows] = useState("");
  const [maxShows, setMaxShows] = useState("");

  const dispatch = React.useContext(SeasonalDispatchContext)!;
  const dispatchToUse =
    type === "Full" || !customDispatch ? dispatch : customDispatch;

  // const handlers = useHandlers(dispatchToUse, "seasonal");
  // if ("handleFilterByShowCount" in handlers) {
  //   let { handleFilterByShowCount, handleResetFilter } = handlers;
  // } else throw Error("Invalid range filter type");

  let { handleFilterByShowCount, handleResetFilter } = useHandlers(
    dispatchToUse,
    "seasonal",
  );
  return (
    <div className="absolute left-0 z-50 mt-2 rounded-lg bg-zinc-700 p-4 shadow-lg">
      <div className="flex flex-col space-y-4">
        <input
          type="number"
          placeholder="Minimum Show Amount"
          value={minShows}
          onChange={(e) => setMinShows(e.target.value)}
          className="border border-zinc-600 bg-zinc-700 text-white focus:border-sky-550"
        />
        <input
          type="number"
          placeholder="Maximum Show Amount"
          value={maxShows}
          onChange={(e) => setMaxShows(e.target.value)}
          onKeyDown={() => {
            handleFilterByShowCount(Number(minShows), Number(maxShows));
          }}
          className="border border-zinc-600 bg-zinc-700 text-white focus:border-sky-550"
        />
        <div className="flex justify-center gap-10">
          <button
            onClick={() =>
              handleFilterByShowCount(Number(minShows), Number(maxShows))
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
