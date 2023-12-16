import React from "react";
import { redirectBoxContent } from "./RedirectBoxContent";
import Link from "next/link";

type RedirectBoxProps = {
  title: string;
  description: string;
  link: string;
};

export default function RedirectBox({
  title,
  description,
  link,
}: RedirectBoxProps) {
  return (
    <Link
      href={link}
      className="flex flex-col justify-between rounded-lg px-6 pt-6 mx-6 mt-6 w-64
    h-full transition-all duration-1000 bg-white
     hover:shadow-xl relative z-40 group container grow min-h-[232px]"
    >
      {/* <div
      // className="flex flex-col justify-between rounded-lg px-6 pt-6 mx-6 mt-6 w-64
      // h-full transition-all duration-1000 bg-white
      //  hover:shadow-xl relative z-40 group container grow"
      > */}
      <h2 className="text-2xl text-center group-hover:text-white font-semibold">
        {title}
      </h2>
      <p className="text-center text-md group-hover:text-white">
        {description}
      </p>
      <p></p>
      {/* </div> */}
    </Link>
  );
}
