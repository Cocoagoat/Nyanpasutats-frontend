import React from "react";
import ShowDisplay from "../ShowDisplay";
import { TbEyeCancel } from "react-icons/tb";
import { Lato } from "next/font/google";
import { ShowToDisplay } from "@/app/interfaces";
import toast from "react-hot-toast";
import { useSingleSeasonContext } from "../reducer/SeasonalContext";
import {
  RiDeleteBin6Fill,
  RiVipCrown2Fill,
  RiVipCrownFill,
} from "react-icons/ri";
import { PiCrownDuotone, PiCrownFill } from "react-icons/pi";
import AOTSCrown from "@/public/AOTSCrown.png";
import Image from "next/image";

const lato = Lato({ weight: "700", subsets: ["latin"] });
export default function ControversialShow({
  controversialShow,
  setDisplayContShow,
}: {
  controversialShow: ShowToDisplay;
  setDisplayContShow: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [eyeHovered, setHovered] = React.useState(false);
  const { editModeOpen } = useSingleSeasonContext()!;

  return (
    <div className="relative">
      <RiDeleteBin6Fill
        size="32px"
        className={`${
          editModeOpen ? "opacity-100" : "hidden"
        } absolute -top-8 w-full cursor-pointer text-center text-black`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => setDisplayContShow(false)}
      >
        Test
      </RiDeleteBin6Fill>
      {/* <div className="flex justify-center">
        <Image
          src={AOTSCrown}
          alt="AOTSCrown"
          width="56"
          height="56"
          className={`${
            editModeOpen ? "opacity-100" : "hidden"
          } absolute -top-14   text-black`}
        />
      </div> */}

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
