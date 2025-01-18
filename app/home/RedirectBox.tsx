import { useRef, useState } from "react";
import Link from "next/link";
import RedirectBoxText from "./RedirectBoxText";
import useOutsideClick from "@/hooks/useOutsideClick";
import toast from "react-hot-toast";
import test from "@/public/nnb6.png";
import Image from "next/image";

type RedirectBoxProps = {
  title: string;
  MAL: boolean;
  description: string;
  link: string;
  disabled: boolean;
  setRedirectBoxClicked?: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function RedirectBox({
  title,
  MAL,
  description,
  link,
  disabled,
  setRedirectBoxClicked,
}: RedirectBoxProps) {
  // const redirectBoxStyle = `flex flex-col justify-between rounded-lg px-6 pt-6 pb-6
  //    mt-6 w-fluid-redirectbox h-fluid-redirectbox duration-500 text-center
  //   hover:shadow-2xl hover:shadow-lime-600
  //   shadow-lg relative text-zinc-200 shadow-blue-950 z-40 `;

  const redirectBoxStyle = `flex flex-col justify-between rounded-lg px-6 pt-6 pb-6 
     mt-6 w-64 lg:max-w-[16rem] duration-500 text-center 
    hover:shadow-2xl hover:shadow-lime-600 
    shadow-lg relative text-zinc-200 shadow-blue-950 z-40 h-[250px] `;

  function getErrorMessage() {
    if (!MAL) {
      return "Affinity Finder is only available for MyAnimeList. Read the FAQ for more details.";
    }
    return "Please get your list first.";
  }

  const ref = useRef<HTMLButtonElement>(null);
  const [loading, setLoading] = useState(false);

  function onOutsideClick() {
    if (setRedirectBoxClicked) setRedirectBoxClicked(false);
  }

  useOutsideClick(ref, onOutsideClick);

  function handleRedirectBoxClickedEarly() {
    if (setRedirectBoxClicked) setRedirectBoxClicked(true);
    toast(getErrorMessage(), {
      duration: 5000,
      position: "top-center",
      style: {
        backgroundColor: "#ff0055",
        color: "white",
        fontSize: "1.2rem",
      },
    });
  }

  function handleRedirectBoxClicked() {
    if (!link.includes("faq")) {
      if (setRedirectBoxClicked) setRedirectBoxClicked(true);
      let route = link.split("/")[2];
      localStorage.setItem(route, "true");
      setLoading(true);
    }
    else{
      toast("The FAQ is currently a work in progress, and will be available with the site's full release.", {
        duration: 5000,
        position: "top-center",
        style: {
          backgroundColor: "#ff0055",
          color: "white",
          fontSize: "1.2rem",
        },
      })
    }
  }

  return disabled ? (
    <button
      ref={ref}
      className={`${redirectBoxStyle} relative ${!MAL && "grayscale"}`}
      onClick={handleRedirectBoxClickedEarly}
    >
      <Image
        src={test}
        fill
        alt="Disabled"
        className="-z-50"
        placeholder="blur"
      />
      <RedirectBoxText
        title={title}
        MAL={MAL}
        description={description}
        disabled={disabled}
      />
    </button>
  ) : (
    <Link
      href={link}
      className={`${redirectBoxStyle} `}
      onClick={handleRedirectBoxClicked}
    >
      <Image
        src={test}
        fill
        alt="Button"
        className="-z-50"
        placeholder="blur"
      />
      <RedirectBoxText
        title={title}
        MAL={MAL}
        description={description}
        disabled={disabled}
        loading={loading}
      />
    </Link>
  );
}
