"use client";
import NavItem from "./NavItem";
import { useParams } from "next/navigation";
import { useState } from "react";
import { RiMenuFill } from "react-icons/ri";

const gap = "px-8 py-4";
export function Nav() {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const params = useParams();

  return (
    <nav
      className="z-50 flex w-full justify-end bg-gradient-to-tl from-blue-970 text-lg  text-white
     "
    >
      <div className={`z-[170] flex flex-col`}>
        <button
          className={`flex justify-end bg-blue-990 px-8 py-4 transition-colors duration-500
              md:hidden
           ${isAccordionOpen ? "text-right" : "text-left"}`}
          onClick={() => setIsAccordionOpen(!isAccordionOpen)}
        >
          <RiMenuFill />
        </button>

        <ul
          className={`bg-blue-990 ${!isAccordionOpen ? "hidden" : "flex"} 
         flex-col md:flex md:w-full md:flex-row`}
          style={{ justifyContent: "end" }} // justify-end is dumb in tailwind
        >
          <NavItem link={`/home`} text="Home" />
          <NavItem link={`/${params.username}/affinity`} text="Affinity" />
          <NavItem link={`/${params.username}/recs`} text="Recommendations" />
          <NavItem link={`/${params.username}/seasonal`} text="Seasonal" />
          <NavItem link="/faq" text="FAQ" />
          <NavItem link="https://nyanpass.com" text="Nyanpasu?" />
        </ul>
      </div>
    </nav>
  );
}
