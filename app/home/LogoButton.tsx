import Image, { StaticImageData } from "next/image";
import React, { useState } from "react";
import { SiteType, StatType } from "../interfaces";

export default function LogoButton({
  site,
  logo,
  currentSite,
  setSite,
  hidden,
  rounded,
}: {
  site: SiteType;
  logo: StaticImageData;
  currentSite: SiteType;
  setSite: React.Dispatch<React.SetStateAction<SiteType>>;
  hidden: boolean;
  rounded?: boolean;
}) {
  const [logoHovered, setLogoHovered] = useState(false);
  //   console.log("Test border", currentSite);
  //   console.log(hideBorder);
  return (
    (!hidden || site === currentSite) && (
      <button
        className={`${rounded && "rounded-r-lg"}  ${logoHovered && "shadow-lg shadow-lime-600"} 
         border-l border-blue-990 bg-lime-600 px-2 py-2.5 `}
        onMouseEnter={() => setLogoHovered(true)}
        onMouseLeave={() => setLogoHovered(false)}
      >
        <Image
          src={logo}
          width={25}
          height={25}
          alt={`${site} logo`}
          onClick={() => setSite(site)}
          className="rounded-lg"
        />
      </button>
    )
  );
}
