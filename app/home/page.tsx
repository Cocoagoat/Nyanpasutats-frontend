import React from "react";
import RedirectBox from "@/components/home/RedirectBox";
import { redirectBoxContent } from "@/components/home/RedirectBoxContent";

export default function Home() {
  return (
    <div className="mt-60">
      <h1 className="text-5xl bg-gradient-to-bl text-center from-sky-400 via-blue-300 to-sky-400 bg-clip-text text-transparent font-bold">
        Welcome to Animisc
      </h1>
      <div //className="flex justify-center flex-wrap mt-[14rem]"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-[14rem]
         lg:min-h-[250px] mx-auto max-w-3xl lg:max-w-7xl gap-10 justify-items-center "
      >
        {redirectBoxContent.map((content, index) => (
          <RedirectBox
            key={index}
            title={content.title}
            description={content.description}
            link={content.link}
          />
        ))}
      </div>
    </div>
  );
}
