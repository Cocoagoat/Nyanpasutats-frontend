"use client";
import Link from "next/link";
import NavItem from "./NavItem";
import { useParams } from "next/navigation";

const gap = "px-8 py-4";
export function Nav() {
  const params = useParams();
  return (
    <nav className="bg-zinc-600 z-50 text-white w-full text-lg">
      <ul
        className="flex w-full"
        style={{ justifyContent: "end" }} // justify-end is dumb in tailwind
      >
        <NavItem link="/home" text="Home" />
        <NavItem link={`/${params.username}/affinity`} text="Affinity" />
        <NavItem link={`/${params.username}/recs`} text="Recommendations" />
        <NavItem link={`/${params.username}/seasonal`} text="Seasonal" />
        <NavItem link="/history" text="History" />
        <NavItem link="/faq" text="FAQ" />
      </ul>
    </nav>
  );
}
