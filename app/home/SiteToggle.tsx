import React, { useState } from "react";
import { SiteType } from "../interfaces";
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
  return (
    <div className="relative" onClick={() => setClicked(!clicked)} ref={ref}>
      <LogoButton
        site={currentSite}
        currentSite={currentSite}
        logo={siteLogosMap[currentSite]}
        setSite={setCurrentSite}
        hidden={false}
        rounded={!clicked}
      />

      {siteOptions.map((site, index) => {
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
    </div>
  );
}
