import React from "react";
import padoru from "@/public/padoru.gif";
import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex h-full items-center justify-center">
      <Image src={padoru} alt="Loading..." />
    </div>
  );
}
