import React, { Dispatch, SetStateAction } from "react";
import { SiteType } from "../interfaces";
import Image from "next/image";
import AnilistLogo from "@/public/AniList_logo.png";
import MALLogo from "@/public/MALLogo.png";

export default function SiteToggleDropdown({
  setSite,
}: {
  setSite: Dispatch<SetStateAction<SiteType>>;
}) {
  return (
    <div className="absolute">
      <button className=" border-l border-blue-990 bg-lime-800 px-2 py-2.5 shadow-lg shadow-lime-600">
        <Image
          src={MALLogo}
          width={25}
          height={25}
          alt="MAL logo"
          onClick={() => setSite("MAL")}
          className=""
        />
      </button>
      <button className=" border-l border-blue-990 bg-lime-800 px-2 py-2.5">
        <Image
          src={AnilistLogo}
          width={25}
          height={25}
          alt="Anilist logo"
          onClick={() => setSite("Anilist")}
          className=""
        />
      </button>
    </div>
  );
}
