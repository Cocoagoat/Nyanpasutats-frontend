import React from "react";

export default function Heading() {
  return (
    <div className="mt-0 flex flex-1 flex-col gap-6 pt-0 text-center xl:text-left">
      <p
        style={{ lineHeight: "0.7" }}
        className="text-wrap mt-0 pt-0 text-clampxl font-bold text-lime-600 shadow-lime-600 text-shadow-lg"
      >
        Nyanpasutats
      </p>
      <h3
        className="text-wrap mx-10 mt-10 text-clampmd 
      font-bold leading-snug text-zinc-400
       shadow-black text-shadow lg:mx-0"
      >
        Various anime statistics that may or may not be accurate.
      </h3>
    </div>
  );
}
