"use client";

import { useState, useEffect } from "react";
import RedirectBox from "@/app/home/RedirectBox";
import { redirectBoxContent } from "@/app/home/RedirectBoxContent";
import { useRouter } from "next/navigation";
import ResetUsername from "./ResetUsername";

export default function Home() {
  const [userName, setUserName] = useState(
    sessionStorage.getItem("username") || "",
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

  return (
    <>
      <div className="mt-20 flex min-h-[80%] flex-col justify-between gap-10 ">
        <h1 className="bg-gradient-to-bl from-sky-400 via-blue-300 to-sky-400 bg-clip-text text-center text-5xl font-bold text-transparent">
          Welcome to Animisc
        </h1>

        <ResetUsername
          userInputField={userInputField}
          setUserInputField={setUserInputField}
          userName={userName}
          handleResetUsername={() => {}}
        />

        {/* <div className="flex justify-center justify-items-center">
          <input
            type="text"
            value={userInputField}
            placeholder={userName}
            disabled
            onChange={(e) => setUserInputField(e.target.value)}
            // onChange={handleEnterUsername}
            className="max-w-md rounded-l-lg p-2.5 text-clampsm outline-none"
            required
          ></input>

          <button
            className="rounded-r-lg bg-red-500 px-5 py-2.5 text-center font-bold text-white hover:bg-red-700"
            onClick={handleResetUsername}
          >
            Reset Username
          </button>
        </div> */}

        <div //className="flex justify-center flex-wrap mt-[14rem]"
          className="mx-auto grid max-w-3xl grid-cols-1 
         justify-items-center gap-10 sm:grid-cols-2 lg:mb-28 lg:min-h-[250px] lg:max-w-7xl lg:grid-cols-4"
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
