import { ShowToDisplay } from "@/app/interfaces";
import { Lato } from "next/font/google";
import React from "react";
import { RiDeleteBin6Fill } from "react-icons/ri";
import ShowDisplay from "../ShowDisplay";
import { useSingleSeasonContext } from "../reducer/SeasonalContext";

const lato = Lato({ weight: "700", subsets: ["latin"] });
export default function ControversialShow({
  controversialShow,
  setDisplayContShow,
}: {
  controversialShow: ShowToDisplay;
  setDisplayContShow: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { editModeOpen } = useSingleSeasonContext()!;

  return (
    <div className="relative">
      <RiDeleteBin6Fill
        size="32px"
        className={`${
          editModeOpen ? "opacity-100" : "hidden"
        } absolute -top-8 w-full cursor-pointer text-center text-black`}
        onClick={() => setDisplayContShow(false)}
      >
        Test
      </RiDeleteBin6Fill>

      <div className="mx-auto w-fit">
        <ShowDisplay show={controversialShow} controversialImage={true} />
      </div>
      <p
        className={`p-1 text-center text-lg shadow-black text-shadow ${lato.className}`}
      >
        Unpopular Opinion
      </p>
    </div>
  );
}
