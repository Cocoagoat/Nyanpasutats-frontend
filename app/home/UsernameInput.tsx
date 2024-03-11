import React, { Dispatch, SetStateAction } from "react";

export default function UsernameInput({
  userInputField,
  setUserInputField,
  handleConfirmUsername,
  redirectBoxClicked,
}: {
  userInputField: string;
  setUserInputField: Dispatch<SetStateAction<string>>;
  handleConfirmUsername: any;
  redirectBoxClicked: boolean;
}) {
  return (
    <div className="mt-10 flex justify-center transition-all duration-500">
      <input
        type="text"
        value={userInputField}
        placeholder="Enter your MAL username"
        onChange={(e) => setUserInputField(e.target.value)}
        // onChange={handleEnterUsername}
        className={`${
          redirectBoxClicked && `border-2 border-r-0 border-red-500`
        } opacity-175 w-64 max-w-md rounded-l-lg border-2 border-lime-600 bg-blue-990 p-2.5
     text-clampsm text-white outline-none focus:border-lime-600 focus:ring-1 focus:ring-lime-600`}
        required
      ></input>

      <button
        className={`${
          redirectBoxClicked && `border-2 border-l-0 border-red-500 `
        } rounded-r-lg bg-lime-600 
     px-5 py-2.5 text-center font-bold text-white shadow-lime-600 
      hover:shadow-lg hover:shadow-lime-600`}
        onClick={handleConfirmUsername}
      >
        Get List
      </button>
    </div>
  );
}
