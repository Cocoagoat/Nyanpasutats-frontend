import React from "react";
import { TbX } from "react-icons/tb";

export default function WelcomeClose({
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <TbX
      className="absolute right-1 top-1 h-7 w-7 
            cursor-pointer rounded-full p-1 text-white hover:bg-lime-600"
      onClick={() => setOpen(false)}
    />
  );
}
