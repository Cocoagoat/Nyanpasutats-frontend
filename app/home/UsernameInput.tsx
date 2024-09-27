import Loading from "@/components/general/Loading";
import { Dispatch, SetStateAction } from "react";
import { SiteType } from "../interfaces";
import SiteToggle from "./SiteToggle";

export default function UsernameInput({
  userInputField,
  setUserInputField,
  handleConfirmUsername,
  redirectBoxClicked,
  currentSite,
  setCurrentSite,
  loading,
  setLoading,
}: {
  userInputField: string;
  setUserInputField: Dispatch<SetStateAction<string>>;
  handleConfirmUsername: any;
  redirectBoxClicked: boolean;
  currentSite: SiteType;
  setCurrentSite: Dispatch<SetStateAction<SiteType>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div className="mt-10 flex  justify-center  transition-all duration-500">
      <div
        className={`${redirectBoxClicked && "border-[3px] border-red-500"} flex rounded-xl `}
      >
        <input
          type="text"
          value={userInputField}
          placeholder={`Enter your ${currentSite} username`}
          onChange={(e) => setUserInputField(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleConfirmUsername();
            }
          }}
          className={`${
            redirectBoxClicked ? `border-0` : "border-2"
          } opacity-175 w-64 max-w-md rounded-l-lg border-lime-600 bg-blue-990 p-2.5
     text-clampsm text-white outline-none focus:border-lime-600 focus:ring-1 focus:ring-lime-600`}
          required
        ></input>

        <button
          className={`${redirectBoxClicked && ` `}  bg-lime-600 
     px-5 py-2.5 text-center font-bold text-white shadow-lime-600 
      hover:shadow-lg hover:shadow-lime-600`}
          onClick={() => {
            handleConfirmUsername();
            setLoading(true);
          }}
        >
          {loading ? <Loading width={25} /> : "Get List"}
        </button>
        <SiteToggle currentSite={currentSite} setCurrentSite={setCurrentSite} />
      </div>
    </div>
  );
}
