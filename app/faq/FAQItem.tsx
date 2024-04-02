import React from "react";
import Question from "./Question";
import Answer from "./Answer";

export default function FAQItem({
  questionText,
  answerText,
}: {
  questionText: string;
  answerText: string;
}) {
  return (
    <li>
      <details className="text-lime-550 group shadow-xl  shadow-blue-970 ">
        <Question questionText={questionText} />
        <Answer answerText={answerText} />
      </details>
    </li>
  );
}
