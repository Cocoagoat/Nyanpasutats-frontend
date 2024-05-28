import React, { useState } from "react";
import TierListDeleteButton from "./TierListDeleteButton";

export default function TierListRating({
  color,
  initialScore,
  ratingText,
  deleteRow,
  deleteMode,
  setRatingText,
}: {
  color: string;
  initialScore: string;
  ratingText: string;
  deleteRow: (tier: number) => void;
  deleteMode: boolean;
  setRatingText: (text: string) => void;
}) {
  // const [score, setScore] = useState(initialScore);
  // const [text, setText] = useState(`${initialScore}/10`);
  const [hovered, setHovered] = useState(false);

  const handleScoreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRatingText(event.target.value);
  };

  function textLength(text: string) {
    return text.length;
  }

  // console.log("Text length is: ", textLength(text) * 30);
  return (
    <div
      className={`relative z-[60]  h-[88px] border-zinc-800`}
      onMouseEnter={() => {
        setHovered(true);
      }}
      onMouseLeave={() => {
        setHovered(false);
      }}
      style={{
        backgroundColor: color,
        // width: `${textLength(text) * 30}px`,
      }}
    >
      {deleteMode && (
        <div
          className="absolute right-0 top-0 z-[100] flex h-full w-full
     cursor-pointer items-center justify-center  bg-gradient-to-t from-red-500 from-5% to-50%
      text-center text-4xl font-semibold text-red-500 shadow-black text-shadow"
          onClick={() => deleteRow(Number(initialScore))}
        >
          <p>x</p>
        </div>
      )}

      <input
        type="text"
        value={ratingText}
        onChange={handleScoreChange}
        className="text-shadow-smd absolute left-1/2 top-1/2 w-full
         -translate-x-1/2 -translate-y-1/2 border-none bg-transparent p-2
           text-center font-semibold text-white shadow-black outline-none"
      />
    </div>
  );
}
