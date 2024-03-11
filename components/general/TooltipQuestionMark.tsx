import React from "react";

export function TooltipQuestionMark({
  text,
  extraStyles,
}: {
  text: string;
  extraStyles?: string;
}) {
  const [showTooltip, setShowTooltip] = React.useState(false);

  return (
    <div className={`absolute right-1/5`}>
      <div className="relative flex w-full items-center justify-center">
        <div
          className={`flex h-6 w-6 cursor-pointer items-center justify-center
           rounded-full bg-blue-970 text-xs hover:bg-lime-600 ${extraStyles}`}
          onClick={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          ?
        </div>
        {showTooltip && (
          <div
            className="absolute right-0 top-3 z-[60]  mb-2 min-w-[100px] max-w-[300px] whitespace-pre-line rounded-xl bg-zinc-700 px-2 py-1 text-xs text-white sm:min-w-[150px]"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            {text}
          </div>
        )}
      </div>
    </div>
  );
}

export default TooltipQuestionMark;
