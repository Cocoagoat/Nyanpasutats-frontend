import React from "react";

export default function TierListButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      className="bg-zinc-800 p-1 text-3xl text-lime-600 hover:bg-zinc-700"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
