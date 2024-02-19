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
        hovered && "bg-lime-600"
      } z-50 cursor-pointer py-4 transition-colors duration-200`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link className="px-8" href={link}>
        {text}
      </Link>
    </li>
  );
}
