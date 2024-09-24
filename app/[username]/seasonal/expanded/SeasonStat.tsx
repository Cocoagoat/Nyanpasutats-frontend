import Image from "next/image";
import React from "react";
import { MdOutlineStar } from "react-icons/md";
import { Lato } from "next/font/google";

const lato = Lato({ weight: "700", subsets: ["latin"] });

export default function SeasonStat({
  statValue,
  statName,
}: {
  statValue?: string;
  statName: string;
}) {
  return (
    <div className=" bg-opacity-30 p-1 text-center shadow-black text-shadow">
      <div className="mx-auto flex  justify-center text-4xl font-semibold">
        <p className={`${lato.className}`}>{statValue}</p>

        {statName.startsWith("Mean Score") && (
          <MdOutlineStar
            className="inline-block translate-y-[10%]"
            style={{
              color: "gold",
              fontSize: "36px",
            }}
          />
        )}
      </div>
      <p className={`text-lg ${lato.className} `}>{statName}</p>
    </div>
  );
}
