import React from "react";

import {
  AffinityAnswers,
  RecommendationAnswers,
  SeasonalAnswers,
  GeneralAnswers,
} from "./QuestionsAnswers";
import FAQSection from "./FAQSection";
import { Nav } from "@/components/general/Nav";
export default function page() {
  return (
    <>
      <Nav />
      <div
        className={`hiddenscrollbar absolute inset-0 mx-auto my-auto
      max-h-front-n-center max-w-front-n-center-80 overflow-y-scroll  
       `}
      >
        <FAQSection name="Affinity" answers={AffinityAnswers} />
        <FAQSection name="Recommendations" answers={RecommendationAnswers} />
        <FAQSection name="Seasonal" answers={SeasonalAnswers} />
        <FAQSection name="General" answers={GeneralAnswers} />
      </div>
      <p className="mt-40 h-1"></p>
    </>
  );
}
