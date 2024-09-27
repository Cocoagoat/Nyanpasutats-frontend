"use client";
import Link from "next/link";
import React, { useState } from "react";
import Loading from "./Loading";
import { usePathname } from "next/navigation";

export default function NavItem({
  link,
  text,
}: {
  link: string;
  text: string;
}) {
  const [clicked, setClicked] = useState(false);
  const currentPath = usePathname();

  return (
    <li
      className={`
      z-50 w-36 cursor-pointer py-2 text-center 
      transition-colors duration-300 hover:bg-lime-600 2xl:py-4`}
      onClick={() => {
        if (link !== currentPath && !link.includes("nyanpass")) {
          setClicked(true);
        }
      }}
    >
      <Link
        className="relative px-8 py-4"
        href={link}
        target={link.startsWith("https") ? "_blank" : ""}
        rel="noopener noreferrer"
      >
        {!clicked ? text : <Loading width={25} absolute={true} />}
      </Link>
    </li>
  );
}
