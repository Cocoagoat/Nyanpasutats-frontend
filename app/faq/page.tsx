import React from "react";
import Question from "./Question";
import Answer from "./Answer";
import FAQItem from "./FAQItem";
import {
  AffinityAnswers,
  RecommendationAnswers,
  SeasonalAnswers,
  GeneralAnswers,
} from "./QuestionsAnswers";
import FAQSection from "./FAQSection";
import { Nav } from "@/components/general/Nav";
export default function () {
  return (
    <>
      <Nav />
      <div className="max-h-front-n-center overflow-y-scroll">
        <FAQSection name="Affinity" answers={AffinityAnswers} />
        <FAQSection name="Recommendations" answers={RecommendationAnswers} />
        <FAQSection name="Seasonal" answers={SeasonalAnswers} />
        <FAQSection name="General" answers={GeneralAnswers} />
      </div>
      <p className="mt-40 h-1"></p>
    </>
  );
}
