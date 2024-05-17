import React, { useState } from "react";

export default function TierListRating({
  color,
  initialScore,
  ratingText,
  deleteRow,
  setRatingText,
}: {
  color: string;
  initialScore: string;
  ratingText: string;
  deleteRow: (tier: number) => void;
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
      {hovered && (
        <div
          className="absolute right-0 top-0 h-4 w-4 cursor-pointer 
        rounded-full bg-zinc-800 text-center text-xs font-semibold text-lime-600"
          onClick={() => deleteRow(Number(initialScore))}
        >
          x
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
