"use client";

import { useState, useEffect, useRef } from "react";
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
// import img4 from "@/public/Test-edited-tierlist.png";
import img4 from "@/public/Affinity.png";
import img5 from "@/public/Recs.png";

import ImageCarousel from "@/components/general/ImageCarousel";
import ToasterWithX from "@/components/general/ToasterWithX";
import useToast from "@/hooks/useToast";
import UsernameInput from "./UsernameInput";
import ResetUsername from "./ResetUsername";
import startGlobalInterval from "./ResetIntervalRegulator.js";
import UserQueueDisplay from "@/components/general/UserQueueDisplay";
import resetAllServerCookies from "../actions/resetAllServerCookies";

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

  const { notifyError, notifySuccess } = useToast();
  useOutsideClick(ref, onOutsideClick);

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username !== null) {
      setUserName(username);
    }
  }, []);

  useEffect(() => {
    const currentSite = localStorage.getItem("currentSite") as SiteType;
    if (currentSite !== null) {
      setCurrentSite(currentSite);
    }
  }, []);

  useEffect(() => {
    if (!loading && !error && queuePosition !== 0) {
      if (queuePosition < 50) {
        notifySuccess(
          "Successfully fetched your stats. You may now proceed to any of the sections below.",
        );
      } else {
        notifySuccess(
          `Successfully fetched your list. Due to heavy demand,
            only the seasonal stats have been fetched and are immediately available.
            You may proceed to the other sections as well, but the data may take a while to load.`,
          undefined,
          10000,
        );
      }
    }
  }, [loading, queuePosition]);

  useEffect(() => {
    if (error) {
      notifyError(error);
    }
  }, [error]);

  useEffect(() => {
    startGlobalInterval();
  }, []);

  async function handleResetUsername(e: React.MouseEvent<HTMLButtonElement>) {
    setUserName("");
    localStorage.removeItem("username");
    resetAllServerCookies();

    if (localStorage.getItem("resetCount") === null) {
      localStorage.setItem("resetCount", "1");
    } else {
      let count = parseInt(localStorage.getItem("resetCount") as string);
      count++;
      localStorage.setItem("resetCount", count.toString());
    }
  }

  async function handleConfirmUsername(e: React.MouseEvent<HTMLButtonElement>) {
    if (userInputField === "") {
      setError("Please enter a username.");
      return;
    }

    if (
      localStorage.getItem("resetCount") !== null &&
      parseInt(localStorage.getItem("resetCount") as string) > 50
    ) {
      setError(
        "You've been doing that too much lately. Please try again later.",
      );
      return;
    }

    try {
      let data = await retrieveQueuePosition();
      setQueuePosition(data.queuePosition);
      setLoading(true);
      console.log("Queue position is", data.queuePosition);

      let taskId = await startTask(userInputField, "seasonal", currentSite);
      let seasonalData = await retrieveTaskData(
        taskId,
        userInputField,
        "seasonal",
      );
      console.log("Successfully retrieved seasonal data");
      if (data.queuePosition < 0) {
        taskId = await startTask(userInputField, "recs", currentSite);
        let recsData = await retrieveTaskData(taskId, userInputField, "recs");
        console.log("Successfully retrieved recs data");

        if (currentSite === "MAL") {
          taskId = await startTask(userInputField, "affinity", currentSite);
          let affinityData = await retrieveTaskData(taskId, "affinity");
          console.log("Successfully retrieved affinity data");
        }
      }

      localStorage.setItem("username", userInputField);
      setUserName(userInputField);
      localStorage.setItem("currentSite", currentSite);

      setLoading(false);
    } catch (error) {
      const err = error as Error;
      let errorMessage = err.message;
      if (errorMessage === "Failed to fetch")
        errorMessage = "Unable to reach the server. Please try again later.";
      setError(errorMessage);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  return !loading ? (
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
          {userName && (
            <p className="text-green-400">Successfully fetched your list!</p>
          )}
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
