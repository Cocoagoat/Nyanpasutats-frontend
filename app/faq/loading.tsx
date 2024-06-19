import Image from "next/image";
import React from "react";
import padoru from "@/public/padoru.gif";

export default function loading() {
  return (
    <Image
      src={padoru}
      alt="padoru"
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
    />
  );
}
