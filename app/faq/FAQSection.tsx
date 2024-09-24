import React from "react";
import FAQItem from "./FAQItem";

export default function FAQSection({
  name,
  answers,
}: {
  name: string;
  answers: Record<string, string>;
}) {
  return (
    <>
      <h1
        className="mt-20 text-center text-3xl font-semibold
       text-lime-600 shadow-lime-600 text-shadow-lg"
      >
        {name}
      </h1>
      <ul
        className=" max-w-front-n-center-55 mx-auto mt-2
       divide-y divide-blue-970 rounded-xl "
      >
        {Object.entries(answers).map(([question, answer]) => (
          <FAQItem key={question} questionText={question} answerText={answer} />
        ))}
      </ul>
    </>
  );
}
