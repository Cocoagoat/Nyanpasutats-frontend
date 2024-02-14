"use client";
import Link from "next/link";
import React, { useState } from "react";

export default function NavItem({
  link,
  text,
}: {
  link: string;
  text: string;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <li
      className={`${
        hovered && "bg-sky-550"
      } transition-colors duration-200 z-50 py-4 cursor-pointer`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link className="px-8" href={link}>
        {text}
      </Link>
    </li>
  );
}
