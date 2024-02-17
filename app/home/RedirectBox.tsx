import React, { useRef } from "react";
import Link from "next/link";
import RedirectBoxText from "./RedirectBoxText";
import useOutsideClick from "@/hooks/useOutsideClick";
import toast from "react-hot-toast";
import test from "@/public/nnb6.png";
import { navigate } from "./RedirectNavigate";

type RedirectBoxProps = {
  title: string;
  description: string;
  link: string;
  disabled: boolean;
  // redirectBoxClicked: boolean;
  setRedirectBoxClicked?: React.Dispatch<React.SetStateAction<boolean>>;
  //onRedirectBoxClick: () => void;
};

export default function RedirectBox({
  title,
  description,
  link,
  disabled,
  // redirectBoxClicked,
  setRedirectBoxClicked,
}: //onRedirectBoxClick,
RedirectBoxProps) {
  const redirectBoxStyle = `flex flex-col justify-between rounded-lg px-6 pt-6 pb-6 
     mt-6 w-64 lg:max-w-[16rem] duration-500 bg-gray-500 text-center 
    hover:shadow-2xl relative z-40 h-[250px] group grow`;
  //Clamp the w-64?

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
    toast("Please get your list first.", {
      duration: 5000,
      position: "bottom-center",
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
      className={`${redirectBoxStyle} border-slate-500 bg-gray-950 bg-cover text-center
       text-gray-400 shadow-2xl shadow-blue-950 transition-shadow  hover:shadow-lime-500 
      `}
      style={{ backgroundImage: `url(${test.src})` }}
      onClick={handleRedirectBoxClicked}
    >
      <RedirectBoxText
        title={title}
        description={description}
        disabled={disabled}
      />
    </button>
  ) : (
    <form action={navigate}>
      <input type="hidden" name="path" value={link} />
      <button
        style={{ backgroundImage: `url(${test.src})` }}
        className={`${redirectBoxStyle} rounded-xl bg-gray-950 bg-cover text-zinc-200
         shadow-lg shadow-blue-950 hover:shadow-lime-600 `}
      >
        {/* <Link
          href={link}
          style={{ backgroundImage: `url(${test.src})` }}
          className={`${redirectBoxStyle} rounded-xl bg-gray-950 bg-cover text-zinc-200 shadow-lg shadow-blue-950 hover:shadow-lime-600 `}
        > */}
        <RedirectBoxText
          title={title}
          description={description}
          disabled={disabled}
        />
        {/* </Link> */}
      </button>
    </form>
  );
}
