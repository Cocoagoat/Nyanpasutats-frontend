"use client";

import { useState, useEffect } from "react";
import RedirectBox from "@/app/home/RedirectBox";
import { redirectBoxContent } from "@/app/home/RedirectBoxContent";
import { useRouter } from "next/navigation";

export default function Home() {
  const [userName, setUserName] = useState(
    sessionStorage.getItem("username") || ""
  );
  const [userInputField, setUserInputField] = useState("");
  // const [error, setError] = useState(false);
  // const [recs, setRecs] = useState<RecommendationType[]>([]);
  // const [listFetched, setListFetched] = useState(false);
  // const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!userName) {
      router.push(`/home`);
    }
  }, [userName]);

  async function handleResetUsername(e: React.MouseEvent<HTMLButtonElement>) {
    setUserName("");
    sessionStorage.removeItem("username");
  }

  return (
    <>
      <div className="flex flex-col gap-10 justify-between mt-20 min-h-[80%] ">
        <h1 className="text-5xl bg-gradient-to-bl text-center from-sky-400 via-blue-300 to-sky-400 bg-clip-text text-transparent font-bold">
          Welcome to Animisc
        </h1>

        <div className="flex justify-items-center justify-center">
          <input
            type="text"
            value={userInputField}
            placeholder={userName}
            disabled
            onChange={(e) => setUserInputField(e.target.value)}
            // onChange={handleEnterUsername}
            className="rounded-l-lg p-2.5 outline-none max-w-md text-clampsm"
            required
          ></input>

          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold rounded-r-lg px-5 py-2.5 text-center"
            onClick={handleResetUsername}
          >
            Reset Username
          </button>
        </div>

        <div //className="flex justify-center flex-wrap mt-[14rem]"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 
         lg:min-h-[250px] mx-auto max-w-3xl lg:max-w-7xl gap-10 justify-items-center lg:mb-28"
        >
          {redirectBoxContent.map((content, index) => (
            <RedirectBox
              key={index}
              title={content.title}
              description={content.description}
              disabled={false}
              link={`${
                index === redirectBoxContent.length - 1 ? "" : `/${userName}`
              }${content.link}`}
            />
          ))}
        </div>
      </div>
    </>
  );
}
