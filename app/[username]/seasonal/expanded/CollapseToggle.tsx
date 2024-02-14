import React, { Dispatch, SetStateAction, useState } from "react";
import { RiArrowUpDoubleFill } from "react-icons/ri";

export default function CollapseToggle({
  setExpanded,
}: {
  setExpanded: Dispatch<SetStateAction<boolean>>;
}) {
  const [collapseHovered, setCollapseHovered] = useState(false);
  return (
    <div
      onClick={() => setExpanded(false)}
      className={`bg-black text-center transition-all duration-500 ${
        collapseHovered ? "py-2 bg-opacity-50" : "text-[16px] bg-opacity-0"
      } cursor-pointer flex justify-center items-center`}
      onMouseEnter={() => setCollapseHovered(true)}
      onMouseLeave={() => setCollapseHovered(false)}
    >
      <span
        style={{
          opacity: collapseHovered ? 1 : 0,
          transition: "opacity 200ms ease-in-out",
        }}
      >
        Collapse
        <RiArrowUpDoubleFill className="inline-block" />
      </span>
    </div>
  );
}
