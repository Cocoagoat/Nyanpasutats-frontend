import React from "react";

export default function Answer({ answerText }: { answerText: string }) {
  return (
    <article className="px-4 pb-4 pt-4 text-white">
      <p dangerouslySetInnerHTML={{ __html: answerText }}></p>
    </article>
  );
}
