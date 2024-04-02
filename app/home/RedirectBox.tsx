import React, { useRef } from "react";
import Link from "next/link";
import RedirectBoxText from "./RedirectBoxText";
import useOutsideClick from "@/hooks/useOutsideClick";
import toast from "react-hot-toast";
import test from "@/public/nnb6.png";
import { navigate } from "./RedirectNavigate";
import { SiteType } from "../interfaces";

type RedirectBoxProps = {
  title: string;
  MAL: boolean;
  description: string;
  link: string;
  disabled: boolean;
  // redirectBoxClicked: boolean;
  setRedirectBoxClicked?: React.Dispatch<React.SetStateAction<boolean>>;
  //onRedirectBoxClick: () => void;
};

export default function RedirectBox({
  title,
  MAL,
  description,
  link,
  disabled,
  // redirectBoxClicked,
  setRedirectBoxClicked,
}: //onRedirectBoxClick,
RedirectBoxProps) {
  const redirectBoxStyle = `flex flex-col justify-between rounded-lg px-6 pt-6 pb-6 
     mt-6 w-64 lg:max-w-[16rem] duration-500  text-center 
    hover:shadow-2xl hover:shadow-lime-600 bg-cover 
    shadow-lg relative text-zinc-200 shadow-blue-950 z-40 h-[250px] group grow`;
  //Clamp the w-64?

  function getErrorMessage() {
    if (!MAL) {
      return "Affinity Finder is only available for MyAnimeList. Read the FAQ for more details.";
    }
    return "Please get your list first.";
  }

  const ref = useRef<HTMLButtonElement>(null);

  function onOutsideClick() {
    if (setRedirectBoxClicked) setRedirectBoxClicked(false);
  }

  useOutsideClick(ref, onOutsideClick);

  // useEffect(() => {
  //   if (!disabled) return;

  //   function handleClickOutside(event: MouseEvent) {
  //     if (
  //       setRedirectBoxClicked &&
  //       ref.current &&
  //       !ref.current.contains(event.target as Node)
  //     ) {
  //       setRedirectBoxClicked(false);
  //     }
  //   }

  // Bind the event listener
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     // Unbind the event listener on clean up
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, [ref]);

  function handleRedirectBoxClicked() {
    if (setRedirectBoxClicked) setRedirectBoxClicked(true);
    toast(getErrorMessage(), {
      duration: 5000,
      position: "top-center",
      style: {
        backgroundColor: "#ff0055",
        color: "white",
        // padding: "1rem 2rem",
        fontSize: "1.2rem",
      },
    });
  }

  return disabled ? (
    <button
      ref={ref}
      className={`${redirectBoxStyle} ${!MAL && "grayscale"}`}
      style={{ backgroundImage: `url(${test.src})` }}
      onClick={handleRedirectBoxClicked}
    >
      <RedirectBoxText
        title={title}
        MAL={MAL}
        description={description}
        disabled={disabled}
      />
    </button>
  ) : (
    // <form action={navigate}>
    //   <input type="hidden" name="path" value={link} />
    //   <button
    //     style={{ backgroundImage: `url(${test.src})` }}
    //     className={`${redirectBoxStyle} rounded-xl bg-gray-950 bg-cover text-zinc-200
    //      shadow-lg shadow-blue-950 hover:shadow-lime-600 `}
    //   >
    <Link
      href={link}
      style={{ backgroundImage: `url(${test.src})` }}
      className={`${redirectBoxStyle} `}
    >
      <RedirectBoxText
        title={title}
        MAL={MAL}
        description={description}
        disabled={disabled}
      />
    </Link>

    // </form>
  );
}
