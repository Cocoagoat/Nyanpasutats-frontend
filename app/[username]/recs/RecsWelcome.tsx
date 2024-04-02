import React from "react";

export default function RecsWelcome() {
  return (
    <>
      <h1 className=" text-center text-4xl font-bold text-lime-600 shadow-lime-600 text-shadow-lg">
        Welcome to the Recommendations section!
      </h1>
      <p className="mt-8">
        Down below you see a list of recommendations along with some filtering
        options. A few notes before you get started :
      </p>
      <p className="mt-4">
        - It's highly recommended to try <b>sorting by score difference</b> -
        the model takes the MAL scores of a show into account when predicting
        your scores, so the shows with the highest difference will be the ones
        the model thinks your tastes match the most, regardless of the MAL
        score.
      </p>
      <p className="mt-4">
        - You can also use the filtering options to filter out shows with
        high/low MAL scores and shows you've already watched, along with
        filtering by year if you want to stick to newer/older shows.{" "}
      </p>
      <p className="mt-4">
        - The model also predicts scores for shows you've already seen (making
        the prediction as if you haven't seen the specific show). You can use
        these scores, as well as the tag lists on the right to judge how well
        the whole system learned your preferences. If both aren't at least
        somewhat accurate, unfortunately the model didn't manage to learn your
        tastes well. It's definitely far from perfect at this stage, and mileage
        strongly varies depending on how many shows you've seen and how diverse
        your taste is, but I hope you at least get a few hidden gems out of it
        like I did.
      </p>
      <p className="mt-4">
        {" "}
        - Only shows with MAL scores above 6.5 are included here. (more info in
        FAQ)
      </p>
    </>
  );
}
