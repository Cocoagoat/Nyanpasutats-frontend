"use client";

import { useState, useEffect, useRef, use } from "react";
import { SiteType } from "@/app/interfaces";
import RedirectBox from "./RedirectBox";
import { redirectBoxContent } from "./RedirectBoxContent";
import { startTask } from "../actions/startTask";
import { retrieveQueuePosition } from "./api";
import { retrieveTaskData } from "../actions/retrieveTaskData";
import useOutsideClick from "@/hooks/useOutsideClick";

import img1 from "@/public/Test-card.png";
import img2 from "@/public/Test-edited-card.png";
import img3 from "@/public/Test-tierlist.png";
import img4 from "@/public/Affinity.png";
import img5 from "@/public/Recs.png";

import ImageCarousel from "@/components/general/ImageCarousel";
import ToasterWithX from "@/components/general/ToasterWithX";
import useToast from "@/hooks/useToast";
import UsernameInput from "./UsernameInput";
import ResetUsername from "./ResetUsername";
import startGlobalInterval, {
  startGlobalIntervalServerSide,
} from "./ResetIntervalRegulator.js";
import UserQueueDisplay from "@/components/general/UserQueueDisplay";
import resetAllServerCookies from "../actions/resetAllServerCookies";
import Heading from "./Heading";
import useSetFromCookie from "@/hooks/useSetFromCookie";
import { useNotify } from "@/hooks/useNotify";
import getCookie from "../actions/getCookie";
import updateCookie from "../actions/updateCookie";

// export async function generateMetadata() {
//   return {
//     title: `Nyanpasutats`,
//     description: `Get your detailed seasonal anime statistics, anime recommendations and more here.`,
//   };
// }

export default function Home() {
  const backgrounds = [img1.src, img2.src, img3.src, img4.src, img5.src];

  const backgroundsText = [
    "Automatically get summaries for every season",
    "Customize the cards to your liking",
    "Automatically get tier lists for every season",
    "Find your soulmates and archenemies",
    "Get AI* anime recommendations",
  ];

  const [userName, setUserName] = useState("");
  const [userInputField, setUserInputField] = useState("");
  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);
  const [redirectBoxClicked, setRedirectBoxClicked] = useState(false);
  const [queuePosition, setQueuePosition] = useState(0);
  const [currentSite, setCurrentSite] = useState<SiteType>("MAL");
  const { notifyError, notifySuccess } = useToast();

  const boxesDisabled = [
    !Boolean(userName) || currentSite !== "MAL",
    !Boolean(userName),
    !Boolean(userName),
    false,
  ];
  const homeRedirectBoxContent = redirectBoxContent.map((item, index) => ({
    ...item,
    disabled: boxesDisabled[index],
  }));
  const ref = useRef(null);

  function onOutsideClick() {
    setError("");
  }

  useOutsideClick(ref, onOutsideClick);

  useSetFromCookie(setUserName, "username");
  useSetFromCookie(setCurrentSite, "currentSite");

  useNotify(notifyError, error, [error], Boolean(error));
  const successMessage = `Successfully fetched your list and seasonal stats. 
        
         You may now proceed to the seasonal section 
         or fetch your recommendations and/or affinity stats separately, but do note that they take significantly longer
         to fetch than the seasonal stats.`;
  useNotify(
    notifySuccess,
    successMessage,
    [loading, queuePosition],
    !loading && !error && queuePosition !== 0,
  );

  // Reduces the count for the number of times the user has reset their username
  // every 2 minutes
  useEffect(() => {
    startGlobalIntervalServerSide();
  }, []);

  async function handleResetUsername(e: React.MouseEvent<HTMLButtonElement>) {
    setUserName("");
    localStorage.removeItem("username");
    resetAllServerCookies(); // except for resetCount
    let resetCount = await getCookie("resetCount");

    // let resetCount = localStorage.getItem("resetCount");
    if (!resetCount) {
      // localStorage.setItem("resetCount", "1");
      updateCookie("resetCount", "1");
    } else {
      // let count = parseInt(localStorage.getItem("resetCount") as string);
      // count++;
      updateCookie("resetCount", (parseInt(resetCount) + 1).toString());
      // localStorage.setItem("resetCount", count.toString());
    }
  }

  async function handleConfirmUsername(e: React.MouseEvent<HTMLButtonElement>) {
    if (userInputField === "") {
      setError("Please enter a username.");
      return;
    }
    let resetCount = await getCookie("resetCount");
    // let resetCount = localStorage.getItem("resetCount");
    if (resetCount && parseInt(resetCount) >= 3) {
      setError(
        "You've been doing that too much lately. Please try again later.",
      );
      return;
    }

    try {
      let data = await retrieveQueuePosition();
      setQueuePosition(data.queuePosition);
      setLoading(true);

      let taskId = await startTask(userInputField, "seasonal", currentSite);
      let seasonalData = await retrieveTaskData(
        taskId,
        userInputField,
        "seasonal",
      );

      localStorage.setItem("username", userInputField);
      setUserName(userInputField);
      localStorage.setItem("currentSite", currentSite);
    } catch (error) {
      const err = error as Error;
      let errorMessage = err.message;
      if (errorMessage === "Failed to fetch")
        errorMessage = "Unable to reach the server. Please try again later.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  return !loading ? (
    <>
      <div className=" mx-auto mt-24 flex min-h-[80%] flex-col justify-between gap-8 xl:max-w-front-n-center-80 fullhd:max-w-front-n-center-60 ">
        <div className="flex flex-col items-center justify-between gap-20 pt-0 xl:flex-row xl:items-start">
          <Heading />
          <div className="mt-10 flex flex-1 justify-end object-cover xl:mt-0">
            <ImageCarousel images={backgrounds} imagesText={backgroundsText} />
          </div>
        </div>

        {userName ? (
          <ResetUsername
            userInputField={userInputField}
            setUserInputField={setUserInputField}
            handleResetUsername={handleResetUsername}
            userName={userName}
          />
        ) : (
          <UsernameInput
            userInputField={userInputField}
            setUserInputField={setUserInputField}
            handleConfirmUsername={handleConfirmUsername}
            redirectBoxClicked={redirectBoxClicked}
            currentSite={currentSite}
            setCurrentSite={setCurrentSite}
          />
        )}

        <div ref={ref} className="text-center">
          {loading && <UserQueueDisplay queuePosition={queuePosition} />}
        </div>

        <div
          className="grid grid-cols-1 justify-items-center pt-20 sm:grid-cols-2 
         lg:mb-28  lg:flex lg:min-h-[250px] lg:justify-between"
        >
          {homeRedirectBoxContent.map((content, index) => (
            <RedirectBox
              key={index}
              title={content.title}
              MAL={!userName || !currentSite || currentSite === "MAL"}
              description={content.description}
              link={`${
                index === redirectBoxContent.length - 1 ? "" : `/${userName}`
              }${content.link}`}
              disabled={content.disabled}
              setRedirectBoxClicked={setRedirectBoxClicked}
            />
          ))}
        </div>
        <ToasterWithX />
      </div>
    </>
  ) : (
    <UserQueueDisplay queuePosition={queuePosition} />
  );
}
