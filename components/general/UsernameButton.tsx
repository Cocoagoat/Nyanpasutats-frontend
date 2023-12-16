import React from "react";
import Link from "next/link";

export default function UsernameButton({ children }: { children: string }) {
  return (
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-r-lg px-5 border-r border-y py-2.5 text-center relative right-20">
      {children}
    </button>
  );
}
