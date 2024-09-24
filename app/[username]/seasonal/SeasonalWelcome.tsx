import WelcomeClose from "@/components/WelcomeClose";
import React from "react";

export default function SeasonalWelcome({
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="rounded-xl bg-blue-990 p-5 text-slate-200">
      <WelcomeClose setOpen={setOpen} />
      <h1 className=" text-center text-4xl font-bold text-lime-600 shadow-lime-600 text-shadow-lg">
        Welcome to the Seasonals section!
      </h1>
      <p className="mt-8">
        Down below you can see a list of seasonal "cards", which are basically
        mini-summaries of how each* season went for you. You can expand each
        card and customize it to your liking - add/remove favorites, change the
        amount and type of visible stats and the background image**, and create
        your own Best/Worst X rankings. Once you're done, you can copy or
        download the card as an image.
      </p>

      <p className="mt-4">
        Also, you can play around with the sorting / filtering options in the
        top bar to easily find the season / year you want and see the statistics
        for that time period. For example, you can easily see which Winter
        season was your favorite of the 2010s by using the year range filter and
        searching for "Winter".
      </p>
      <p>
        Filtering will also change the Overall Rank stat in all your cards - for
        example, if you use the filter to show only seasons in which you watched
        over 20 shows, the Overall Rank of each season will reflect that.
      </p>

      <p className="mt-4">
        And finally, the lower-most button in the toolbar of an expanded card
        will turn the card into an automatically generated and customizable tier
        list, which can also be copied and downloaded as an image.
      </p>

      <p className="mt-4">
        For more information about specific features, check out the FAQ.
      </p>

      <p className="mt-8 text-[0.5rem]">
        *Only seasons with 5 or more shows scored are included in the list.
      </p>
      {/* <p className="mt-2 text-[0.5rem]">
        **Copying is currently not supported on Firefox.
      </p> */}
      <p className="mt-2 text-[0.5rem]">
        **The default backgrounds are screenshots from the anime "Non Non
        Biyori", which the creator of this website highly recommends.
      </p>
    </div>
  );
}
