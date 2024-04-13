import React, { useState } from "react";
import { SiteType } from "../interfaces";
import Image from "next/image";
import AnilistLogo from "@/public/AniList_logo.png";
import MALLogo from "@/public/MALLogo.png";
import SiteToggleDropdown from "./SiteToggleDropdown";
import { siteOptions, siteLogos, siteLogosMap } from "../interfaces";
import LogoButton from "./LogoButton";
import { useCloseOnOutsideClick } from "@/hooks/useCloseOnOutsideClick";

export default function SiteToggle({
  currentSite,
  setCurrentSite,
}: {
  currentSite: SiteType;
  setCurrentSite: React.Dispatch<React.SetStateAction<SiteType>>;
}) {
  const [clicked, setClicked] = useState(false);

  const ref = useCloseOnOutsideClick<HTMLDivElement>(clicked, setClicked);
  //onclick setsite to mal and setclicked to true which will open all buttons?
  //   const [siteLogo, setSiteLogo] = useState(site === "MAL" ? MALLogo : AnilistLogo);
  return (
    <div
      className="relative"
      onClick={() => setClicked(!clicked)}
      ref={ref}
      //   onMouseEnter={() => setHovered(true)}
      //   onMouseLeave={() => setHovered(false)}
    >
      {/* <button className="rounded-r-lg border-l border-blue-990 bg-lime-600 px-2 py-2.5"> */}
      <LogoButton
        site={currentSite}
        currentSite={currentSite}
        logo={siteLogosMap[currentSite]}
        setSite={setCurrentSite}
        hidden={false}
        rounded={!clicked}
      />

      {siteOptions.map((site, index) => {
        //   const siteTyped = site as SiteType;
        if (site === currentSite) return null;
        const logo = siteLogos[index];
        return (
          <LogoButton
            key={site}
            site={site}
            currentSite={currentSite}
            logo={logo}
            setSite={setCurrentSite}
            hidden={!clicked}
            rounded={
              index === siteOptions.length - 1 ||
              (index === siteOptions.length - 2 &&
                currentSite === siteOptions[siteOptions.length - 1])
            }
          />
        );
      })}
      {/* {Object.entries(siteLogos).map(([site, logo]) => (
          <LogoButton site={site} logo={logo} setSite={setSite} />
        ))} */}
      {/* <Image
          src={AnilistLogo}
          width={25}
          height={25}
          alt="MAL logo"
          onClick={() => setHovered(!hovered)}
        />
      </button>
      <button className="rounded-r-lg border-l border-blue-990 bg-lime-600 px-2 py-2.5">
        <Image
          src={AnilistLogo}
          width={25}
          height={25}
          alt="MAL logo"
          onClick={() => setHovered(!hovered)}
        />
      </button> */}
      {/* {hovered && <SiteToggleDropdown setSite={setSite} />} */}
    </div>
  );
}
