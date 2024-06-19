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
      <div className="mx-auto flex content-center justify-center text-4xl font-semibold">
        {statValue && statValue.startsWith("https") ? (
          <div className="">
            <Image src={statValue} alt="Test image" width={75} height={105} />
          </div>
        ) : (
          <p className={`${lato.className}`}>{statValue}</p>
        )}

        {statName.startsWith("Mean Score") && (
          <MdOutlineStar
            className="inline-block"
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
