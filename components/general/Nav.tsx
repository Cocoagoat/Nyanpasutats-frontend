"use client";
import { useEffect, useState } from "react";
import { RiMenuFill } from "react-icons/ri";
import NavItem from "./NavItem";

export function Nav() {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [site, setSite] = useState("MAL");

  useEffect(() => {
    let username = localStorage.getItem("username") || "";
    setUsername(username);
    let site = localStorage.getItem("currentSite") || "MAL";
    setSite(site);
  });

  return (
    <nav
      className="z-50 flex 
      w-full justify-end bg-gradient-to-tl from-blue-970 text-lg text-white
     "
    >
      <div className={`z-[170] flex w-full flex-col`}>
        <button
          className={`flex justify-end bg-blue-990 px-8 
             transition-colors duration-500 md:hidden
           ${isAccordionOpen ? "text-right" : "text-left"}`}
          onClick={() => setIsAccordionOpen(!isAccordionOpen)}
        >
          <RiMenuFill />
        </button>

        <ul
          className={` bg-blue-990 ${!isAccordionOpen ? "hidden" : "flex"} 
         flex-col md:flex md:w-full md:flex-row`}
          style={{ justifyContent: "end" }} // justify-end is dumb in tailwind
        >
          <NavItem link={`/home`} text="Home" />
          {username && (
            <>
              {site === "MAL" && (
                <NavItem link={`/${username}/affinity`} text="Affinity" />
              )}
              <NavItem
                link={username ? `/${username}/recs` : `/home`}
                text="Recs"
              />
              <NavItem link={`/${username}/seasonal`} text="Seasonal" />
            </>
          )}
          <NavItem link="/faq" text="FAQ" />
          <NavItem link="https://nyanpass.com" text="Nyanpasu?" />
        </ul>
      </div>
    </nav>
  );
}
