import React from "react";

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
  const handleScoreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRatingText(event.target.value);
  };

  return (
    <div
      className={`relative z-[60]  h-[88px] border-zinc-800`}
      style={{
        backgroundColor: color,
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
        className="absolute left-1/2 top-1/2 w-full -translate-x-1/2
         -translate-y-1/2 border-none bg-transparent p-2 text-center
           font-semibold text-white shadow-black outline-none text-shadow-smd"
      />
    </div>
  );
}
