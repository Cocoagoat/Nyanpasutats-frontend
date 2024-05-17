import React from "react";
import ShowDisplay from "../ShowDisplay";
import { TbEyeCancel } from "react-icons/tb";
import { Lato } from "next/font/google";
import { ShowToDisplay } from "@/app/interfaces";
import toast from "react-hot-toast";

const lato = Lato({ weight: "700", subsets: ["latin"] });
export default function ControversialShow({
  controversialShow,
  setDisplayContShow,
}: {
  controversialShow: ShowToDisplay;
  setDisplayContShow: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [eyeHovered, setHovered] = React.useState(false);

  function handleHideContShow() {
    setDisplayContShow(false);
    toast("To restore, collapse and expand the card again.", {
      duration: 5000,
      position: "top-center",
      style: { backgroundColor: "#74ceff", color: "white" },
      className: "bg-sky-550 text-white",
    });
  }
  return (
    <div className="relative">
      <TbEyeCancel
        size="36px"
        className={`${
          eyeHovered ? "opacity-100" : "opacity-0"
        } absolute -top-8 w-full cursor-pointer text-center text-zinc-700`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={handleHideContShow}
      >
        Test
      </TbEyeCancel>

      <div
        className="mx-auto w-fit"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <ShowDisplay show={controversialShow} controversialImage={true} />
      </div>
      <p
        className={`p-1 text-center text-lg shadow-black text-shadow ${lato.className}`}
      >
        Most Unusual Score
      </p>
    </div>
  );
}
