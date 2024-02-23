import React, { useEffect, useRef, useState } from "react";
import { useHandlers } from "../reducer/useHandlers";
import { Paths, RangeFilterType } from "@/app/interfaces";
import { SeasonalDispatchContext } from "../reducer/SeasonalContext";
import { Action } from "../reducer/actions";

export default function FilterByYear({
  type,
  path,
  dispatch,
}: {
  type: RangeFilterType;
  path: Paths;
  dispatch?: React.Dispatch<Action>;
}) {
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  //   const [isOpen, setIsOpen] = useState(false);
  if (!dispatch) {
    dispatch = React.useContext(SeasonalDispatchContext)!;
  }

  let handleRangeFilter: (min: number, max: number) => void;
  let handleResetFilter: () => void;
  let placeholderText = "";
  const handlers = useHandlers(dispatch, path)!;

  switch (type) {
    case "Year":
      if ("handleFilterByYear" in handlers) {
        ({
          handleFilterByYear: handleRangeFilter,
          handleResetFilter: handleResetFilter,
        } = handlers);
      } else throw Error("Filter function not found for type Year");
      placeholderText = "Year";
      break;

    case "MALScore":
      if ("handleFilterByMALScore" in handlers) {
        ({
          handleFilterByMALScore: handleRangeFilter,
          handleResetFilter: handleResetFilter,
        } = handlers);
      } else throw Error("Filter function not found for type MALScore");
      placeholderText = "MAL Score";
      break;

    case "ShowCount":
      if ("handleFilterByShowCount" in handlers) {
        ({
          handleFilterByShowCount: handleRangeFilter,
          handleResetFilter: handleResetFilter,
        } = handlers);
      } else throw Error("Filter function not found for type ShowCount");
      placeholderText = "Shows";
      break;

    default:
      throw Error("Invalid range filter type");
  }

  return (
    <div
      className="bg-blue-970  absolute left-0 z-50
     mt-2 rounded-lg p-4 "
    >
      <div className="flex flex-col space-y-4">
        <input
          type="number"
          placeholder={`Min ${placeholderText}`}
          value={min}
          onChange={(e) => setMin(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              console.log(5);
              console.log(min, max);
              handleRangeFilter(Number(min), Number(max));
            }
          }}
          className=" border-none bg-zinc-700
           text-white outline-none focus:outline-none focus:ring-2
            focus:ring-lime-600"
        />
        <input
          type="number"
          placeholder={`Max ${placeholderText}`}
          value={max}
          onChange={(e) => setMax(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              console.log(6);
              handleRangeFilter(Number(min), Number(max));
            }
          }}
          className="border-none bg-zinc-700
           text-white focus:ring-2 focus:ring-lime-600"
        />
        <div className="flex justify-center gap-10">
          <button
            onClick={() => handleRangeFilter(Number(min), Number(max))}
            className=" w-1/3 self-center rounded-md border
             border-zinc-600 p-1 text-white transition-colors 
             duration-200 hover:bg-lime-600"
          >
            Apply
          </button>
          <button
            onClick={handleResetFilter}
            className=" w-1/3 self-center rounded-md border
             border-zinc-600 p-1 text-white transition-colors duration-200
              hover:bg-lime-600"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
