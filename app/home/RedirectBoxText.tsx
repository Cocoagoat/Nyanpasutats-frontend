import LoadingSpinner from "@/components/general/LoadingSpinner";
import React from "react";

export default function RedirectBoxText({
  title,
  MAL,
  description,
  disabled,
  loading,
}: {
  title: string;
  MAL: boolean;
  description: string;
  disabled: boolean;
  loading?: boolean;
}) {
  let [desc, postAsterisk] = description.includes("*")
    ? description.split("*").slice(0, 2) // The slice is just to make sure that the array has at most 2 elements
    : [description, ""];
  if (postAsterisk) {
    desc = desc + "*";
  }
  return (
    <>
      <h2
        className={`place-self-center self-center text-center text-2xl text-lime-600 ${
          !disabled && ``
        } font-semibold`}
      >
        {title}
      </h2>
      {!loading ? (
        <>
          <p
            className={`text-wrap balance-text text-md text-center text-zinc-300  shadow-black text-shadow-lg ${
              !disabled && `group-hover:text-white`
            }`}
          >
            {desc}
          </p>
          <p className="w-full text-center text-xs">{`${postAsterisk && "*"}${postAsterisk}`}</p>
        </>
      ) : (
        <LoadingSpinner width={64} height={64} />
      )}
    </>
  );
}
