import React, { MouseEventHandler } from "react";

export default function LargeButton({
  children,
  onClick,
  onKeyDown,
  fill,
  extraStyles,
  color,
}: {
  children: any;
  onClick: MouseEventHandler<HTMLButtonElement>;
  onKeyDown?: (e: React.KeyboardEvent<HTMLButtonElement>) => void;
  fill?: boolean;
  extraStyles?: string;
  color?: string;
}) {
  const [hovered, setHovered] = React.useState(false);
  return (
    <button
      onClick={onClick}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ backgroundColor: hovered ? (color ? color : "#65A30D") : "" }}
      className={`mx-auto max-w-3/4 self-center rounded-md 
      border border-zinc-600 px-1 py-1.5 text-center text-xs text-white transition-colors duration-200 
      lg:max-w-1/2 lg:px-4 lg:text-base  ${extraStyles}`}
    >
      {children}
    </button>
  );
}
