"use client";

import { SiteType, siteOptions } from "@/app/interfaces";
import useOutsideClick from "@/hooks/useOutsideClick";
import { useEffect, useRef, useState } from "react";
import { sendRequestToView } from "../actions/sendRequestToView";
import RedirectBox from "./RedirectBox";
import { redirectBoxContent } from "./RedirectBoxContent";

import img4 from "@/public/Affinity.jpg";
import img5 from "@/public/Recs.jpg";
import img1 from "@/public/Test-card.jpg";
import img2 from "@/public/Test-edited-card2.jpg";
import img3 from "@/public/Test-tierlist.jpg";

import ImageCarousel from "@/components/general/ImageCarousel";
import ToasterWithX from "@/components/general/ToasterWithX";
import UserQueueDisplay from "@/components/general/UserQueueDisplay";
import { useNotify } from "@/hooks/useNotify";
import useSetFromClientCookie from "@/hooks/useSetFromCookie";
import useToast from "@/hooks/useToast";
import { useUpdateRouteCookies } from "@/hooks/useUpdateRouteCookies";
import getCookie from "../actions/getCookie";
import resetAllServerCookies from "../actions/resetAllServerCookies";
import updateCookie from "../actions/updateCookie";
import Heading from "./Heading";
import { startGlobalIntervalServerSide } from "./ResetIntervalRegulator.js";
import ResetUsername from "./ResetUsername";
import UsernameInput from "./UsernameInput";
import { retrieveQueuePosition } from "../actions/getQueuePosition";

export default function Home() {
  const backgrounds = [img1.src, img2.src, img3.src, img4.src, img5.src];

  const backgroundsText = [
    "Automatically get summaries for every season",
    "Customize the cards to your liking",
    "Automatically get customizable tier lists for every season",
    "Find your soulmates and archenemies",
    "Get AI* anime recommendations",
  ];

  const [userName, setUserName] = useState("");
  const [userInputField, setUserInputField] = useState("");
  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);
  const [inputLoading, setInputLoading] = useState(false);
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

  function usernameIsValid(username: string) {
    return username.length >= 2 && username.length <= 16;
  }

  function siteIsValid(site: string) {
    return siteOptions.includes(site as SiteType);
  }

  useOutsideClick(ref, onOutsideClick);

  useSetFromClientCookie(setUserName, "username", usernameIsValid);
  useSetFromClientCookie(setCurrentSite, "currentSite", siteIsValid);
  useUpdateRouteCookies();

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

  useEffect(() => {
    if (error) {
      setInputLoading(false);
    }
  }, [error]);

  async function handleResetUsername(e: React.MouseEvent<HTMLButtonElement>) {
    setUserName("");
    localStorage.removeItem("username");
    resetAllServerCookies(); // except for resetCount
    let resetCount = await getCookie("resetCount");
    localStorage.removeItem("seasonal");
    localStorage.removeItem("affinity");
    localStorage.removeItem("recs");
    if (!resetCount) {
      updateCookie("resetCount", "1");
    } else {
      updateCookie("resetCount", (parseInt(resetCount) + 1).toString());
    }
  }

  async function handleConfirmUsername(e: React.MouseEvent<HTMLButtonElement>) {
    if (userInputField === "" || !usernameIsValid(userInputField)) {
      setError("Please enter a username.");
      return;
    }

    let resetCount = await getCookie("resetCount");
    if (resetCount && parseInt(resetCount) >= 5) {
      setError(
        "You've been doing that too much lately. Please try again later.",
      );
      return;
    }

    try {
      let data = await retrieveQueuePosition("seasonal");
      if ('error' in data){
        throw Error(data["error"])
      }
      setQueuePosition(data.queuePosition);
      setLoading(true);
      let seasonalData = await sendRequestToView(
        userInputField,
        "seasonal",
        currentSite,
        "return"
      );

      if('error' in seasonalData){
        throw Error(seasonalData["error"])
      }

      localStorage.setItem("username", userInputField);
      setUserName(userInputField);
      localStorage.setItem("currentSite", currentSite);
      updateCookie("currentSite", currentSite);
      updateCookie("seasonal", "true", true);
    } catch (error) {
      const err = error as Error;
      let errorMessage = err.message;
      if (errorMessage === "Failed to fetch")
        errorMessage = "Unable to reach the server. Please try again later.";
      setError(errorMessage);
    } finally {
      setLoading(false);
      setInputLoading(false);
    }
  }

  return !loading ? (
    <div className="">
      <div
        className="hiddenscrollbar absolute inset-0 mx-auto my-auto mt-14 flex max-h-front-n-center 
        min-h-[80%] max-w-front-n-center-75 flex-col justify-between gap-6 overflow-y-scroll
        fullhd:mt-24 fullhd:max-w-front-n-center-60
         "
      >
        <div
          className="mx-6 flex flex-col items-center
         justify-between gap-20 pt-0 xl:flex-row xl:items-start"
        >
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
            loading={inputLoading}
            setLoading={setInputLoading}
          />
        )}

        <div ref={ref} className="text-center">
          {loading && <UserQueueDisplay queuePosition={queuePosition} />}
        </div>

        <div
          className="mx-6 mb-28 grid grid-cols-1 
         justify-items-center sm:grid-cols-2 lg:min-h-[250px] lg:justify-between xl:flex fullhd:pt-20"
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
    </div>
  ) : (
    <UserQueueDisplay queuePosition={queuePosition} />
  );
}
