import React from "react";

export default function Question({ questionText }: { questionText: string }) {
  return (
    <summary className="flex items-center gap-3   px-4 py-6 font-medium marker:content-none hover:cursor-pointer">
      <svg
        className="h-5 w-5  text-lime-600 transition group-open:rotate-90"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        viewBox="0 0 16 16"
      >
        <path
          fill-rule="evenodd"
          d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
        ></path>
      </svg>
      <span className="">{questionText}</span>
    </summary>
  );
}
