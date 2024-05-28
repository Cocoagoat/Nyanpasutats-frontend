import React from "react";

export default function TierListDeleteButton({
  onClick,
}: {
  onClick: () => void;
}) {
  return (
    <div
      className="absolute right-0 top-0 z-[100] flex h-5 w-5
        cursor-pointer items-center justify-center rounded-full bg-zinc-800
         text-center text-sm font-semibold text-red-500"
      onClick={onClick}
    >
      <p>x</p>
    </div>
  );
}
