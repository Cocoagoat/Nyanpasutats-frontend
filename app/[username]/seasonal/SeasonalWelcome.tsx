import React from "react";

export default function SeasonalWelcome() {
  return (
    <div className="text-slate-200">
      <h1 className=" text-center text-4xl font-bold text-lime-600 shadow-lime-600 text-shadow-lg">
        Welcome to the Seasonals section!
      </h1>
      <p className="mt-8">
        Down below you can see a list of seasonal "cards", which are basically
        mini-summaries of how each* season went for you. You're welcome to
        expand the cards and play around with the available buttons to customize
        them, and then you can save it as an image using the download button to
        the right.
      </p>

      <p className="mt-4">
        You can also upload any image you want as the background for the card
        using the upload button on the right.**
      </p>

      <p className="mt-4">
        And finally you can play around with the sorting/filtering options in
        the top bar to easily find the season/year you want and see the
        statistics for that time period. For example, you can easily see which
        Winter season was your favorite of the 2010s by using the year range
        filter and searching for "Winter".
      </p>

      <p className="mt-4">
        For more information about specific features, check out the FAQ.
      </p>

      <p className="mt-8 text-[0.5rem]">
        *Only seasons with 5 or more shows scored are included in the list.
      </p>
      <p className="mt-2 text-[0.5rem]">
        **The default backgrounds are screenshots from the anime "Non Non
        Biyori", which the creator of this website highly recommends.
      </p>
    </div>
  );
}
