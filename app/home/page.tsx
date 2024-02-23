"use client";

import { useState, useEffect, useRef } from "react";
import { SeasonsData } from "@/app/interfaces";
import RedirectBox from "./RedirectBox";
import { redirectBoxContent } from "./RedirectBoxContent";
import { getUserData } from "./api";
import Loading from "../../components/general/loading";
import { useRouter } from "next/navigation";
import useOutsideClick from "@/hooks/useOutsideClick";
import Image from "next/image";
import winterBackground from "@/public/WinterBackground.png";
import summerBackground from "@/public/SummerBackground.png";
import springBackground from "@/public/SpringBackground.png";
import fallBackground from "@/public/FallBackground.png";
import img1 from "@/public/BaronBrixius Summer 2023.png";
import img2 from "@/public/BaronBrixius Winter 2020.png";
import img3 from "@/public/Affinity.png";
import img4 from "@/public/Recs.png";
import ImageCarousel from "@/components/general/ImageCarousel";
import ToasterWithX from "@/components/general/ToasterWithX";
import toast from "react-hot-toast";
import useToast from "@/hooks/useToast";
import test from "@/public/test.png";

export default function Home() {
  const backgrounds = [img1.src, img2.src, img3.src, img4.src];

  const backgroundsText = [
    "Automatically get summaries for every season",
    "Customize the cards to your liking",
    "Find your soulmates and archenemies",
    "Get AI* anime recommendations",
  ];

  const [userName, setUserName] = useState("");
  const [userInputField, setUserInputField] = useState("");
  const [error, setError] = useState("");
  // const [recs, setRecs] = useState<RecommendationType[]>([]);
  // const [listFetched, setListFetched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [redirectBoxClicked, setRedirectBoxClicked] = useState(false);
  const router = useRouter();

  const boxesDisabled = [true, true, true, false];
  const homeRedirectBoxContent = redirectBoxContent.map((item, index) => ({
    ...item,
    disabled: boxesDisabled[index],
  }));
  const ref = useRef(null);

  function onOutsideClick() {
    setError("");
  }

  const { notifyError, notifySuccess } = useToast();
  useOutsideClick(ref, onOutsideClick);

  useEffect(() => {
    if (userName) {
      router.push(`/${userName}`);
    }
  }, [userName]);

  useEffect(() => {
    const username = sessionStorage.getItem("username");
    if (username !== null) {
      setUserName(username);
    }
  }, []);

  useEffect(() => {
    if (error) {
      notifyError(error);
    }
  }, [error]);

  // async function handleClickRedirectBox(
  //   e: React.MouseEvent<HTMLButtonElement>
  // ) {
  //   setRedirectBoxClicked(true);
  // }

  async function handleConfirmUsername(e: React.MouseEvent<HTMLButtonElement>) {
    if (userInputField === "") {
      setError("Please enter a username.");
      return;
    }

    try {
      setLoading(true);
      let recs: SeasonsData[] = await getUserData(userInputField, "seasonal");
      // recs = recs.map((dict) => ({
      //   ...dict,
      //   PredictedScore: parseFloat(dict.PredictedScore.toFixed(2)),
      // }));
      // console.log(recs);
      setUserName(userInputField);
      // setRecs(recs);
      sessionStorage.setItem("username", userInputField);
    } catch (error) {
      // console.log(error);
      const err = error as Error;
      let errorMessage = err.message;
      if (errorMessage === "Failed to fetch")
        errorMessage = "Unable to reach the server. Please try again later.";
      // Client-side errors will propagate from getData, server-side errors will be handled here
      // console.log(errorMessage, 5, 6);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }
  // add a sub-heading to describe site like wotaku\
  // Get anime recommendations and stats you may or may not care about.
  return (
    <>
      <div className=" mx-auto mt-24 flex min-h-[80%] flex-col justify-between gap-8 xl:max-w-front-n-center-80 fullhd:max-w-front-n-center-60 ">
        <div className="flex flex-col items-center justify-between gap-20 pt-0 xl:flex-row xl:items-start">
          {/* <div className="flex justify-center w-1/2"> */}
          <div className="mt-0 flex flex-1 flex-col gap-6 pt-0 text-center xl:text-left">
            <p
              style={{ lineHeight: "0.7" }}
              className="text-wrap mt-0 pt-0 text-clampxl font-bold text-lime-600 shadow-lime-600 text-shadow-lg"
            >
              Nyanpasutats
            </p>
            <h3 className="text-wrap mx-10 mt-10 text-clampmd font-bold leading-snug text-zinc-400 shadow-black text-shadow lg:mx-0">
              Various anime-related statistics you never knew you needed...and
              probably still don't actually need.
            </h3>
          </div>
          {/* </div> */}
          <div className="mt-10 flex flex-1 justify-end object-cover xl:mt-0">
            <ImageCarousel images={backgrounds} imagesText={backgroundsText} />
          </div>
        </div>

        <div className="mt-10 flex justify-center transition-all duration-500">
          <input
            type="text"
            value={userInputField}
            placeholder="Enter your MAL username"
            onChange={(e) => setUserInputField(e.target.value)}
            // onChange={handleEnterUsername}
            className={`${
              redirectBoxClicked && `border-2 border-r-0 border-red-500`
            } opacity-175 w-64 max-w-md rounded-l-lg border-2 border-lime-600 bg-blue-990 p-2.5
             text-clampsm text-white outline-none focus:border-lime-600 focus:ring-1 focus:ring-lime-600`}
            required
          ></input>

          <button
            className={`${
              redirectBoxClicked && `border-2 border-l-0 border-red-500 `
            } rounded-r-lg bg-lime-600 
             px-5 py-2.5 text-center font-bold text-white shadow-lime-600 
              hover:shadow-lg hover:shadow-lime-600`}
            onClick={handleConfirmUsername}
          >
            Get List
          </button>
        </div>

        <div ref={ref} className="text-center">
          {/* {redirectBoxClicked && (
            <p className="text-red-600">Please get your list first.</p>
          )} */}
          {loading && <Loading />}
          {/* {error && <p className="text-red-600">{error}</p>} */}
          {userName && (
            <p className="text-green-400">Successfully fetched your list!</p>
          )}
        </div>

        <div //className="flex justify-center flex-wrap mt-[14rem]"
          className="grid grid-cols-1 justify-items-center pt-20 sm:grid-cols-2 
         lg:mb-28  lg:flex lg:min-h-[250px] lg:justify-between"
        >
          {homeRedirectBoxContent.map((content, index) => (
            <RedirectBox
              key={index}
              title={content.title}
              description={content.description}
              link={`${
                index === redirectBoxContent.length - 1 ? "" : `/${userName}`
              }${content.link}`}
              disabled={content.disabled}
              // redirectBoxClicked={redirectBoxClicked}
              setRedirectBoxClicked={setRedirectBoxClicked}
            />
          ))}
        </div>
        <ToasterWithX />
      </div>
    </>
  );
}

// export default function RecsPage() {
//   const [userName, setUserName] = useState(
//     sessionStorage.getItem("username") || ""
//   );

// function handleEnterUsername(e: React.ChangeEvent<HTMLInputElement>) {
//   setUserName(e.target.value);
//   sessionStorage.setItem("username", e.target.value);
// }

// return (
//   <div className="relative top-1/2 left-1/3">
//     <div className="flex gap-20">
//       <input
//         type="text"
//         value={userName}
//         placeholder="Enter your MAL username"
//         onChange={(e) => setUserName(e.target.value)}
//         // onChange={handleEnterUsername}
//         className="block grow rounded-l-lg p-2.5 outline-none max-w-md"
//         required
//       ></input>
//       <Link href={`/${userName}`}>
//         <UsernameButton>Get Recommendations</UsernameButton>
//       </Link>
//     </div>
//   </div>
// );
// }
