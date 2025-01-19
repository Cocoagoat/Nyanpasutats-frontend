import React, { Dispatch, SetStateAction } from "react";

export default function ResetUsername({
  userInputField,
  setUserInputField,
  userName,
  handleResetUsername,
}: {
  userInputField: string;
  setUserInputField: Dispatch<SetStateAction<string>>;
  userName: string;
  handleResetUsername: any;
}) {
  return (
    <div className="flex justify-center justify-items-center">
      <input
        type="text"
        value={userInputField}
        placeholder={userName}
        disabled
        onChange={(e) => setUserInputField(e.target.value)}
        className="max-w-md rounded-l-lg p-2.5 bg-blue-970 text-white opacity-100 text-clampsm outline-none"
        required
      ></input>

      <button
        className="rounded-r-lg bg-red-500 px-5 py-2.5 text-center
         font-bold text-white hover:bg-red-700"
        onClick={handleResetUsername}
      >
        Reset Username
      </button>
    </div>
  );
}
