import React, { Dispatch, SetStateAction, useState } from "react";
import { IconType } from "react-icons";
import { RiArrowUpDoubleFill } from "react-icons/ri";

export default function CollapseToggle({
  onClick,
  IconComponent,
  text,
  alwaysVisible,
}: {
  onClick: () => void;
  IconComponent: IconType;
  text: string;
  alwaysVisible?: boolean;
}) {
  const [collapseHovered, setCollapseHovered] = useState(false);
  return (
    <div
      onClick={onClick}
      className={`col-span-3 w-full bg-black text-center transition-all duration-500 ${
        collapseHovered || alwaysVisible
          ? "bg-opacity-50 py-2"
          : "bg-opacity-0 text-[16px]"
      } flex cursor-pointer items-center justify-center`}
      onMouseEnter={() => setCollapseHovered(true)}
      onMouseLeave={() => setCollapseHovered(false)}
    >
      <span
        style={{
          opacity: collapseHovered || alwaysVisible ? 1 : 0,
          transition: "opacity 200ms ease-in-out",
        }}
      >
        {text}
        <IconComponent className="inline-block" />
      </span>
    </div>
  );
}
