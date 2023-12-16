import React from "react";
import padoru from "../../../utils/padoru.gif";
import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-full">
      <Image src={padoru} alt="Loading..." />
    </div>
  );
}
