import React from "react";

export function TooltipQuestionMark({ text }: { text: string }) {
  const [showTooltip, setShowTooltip] = React.useState(false);

  return (
    <div className={`absolute right-1/5`}>
      <div className="relative flex items-center justify-center w-full">
        <div
          className="bg-zinc-700 rounded-full w-6 h-6 flex items-center justify-center text-xs cursor-pointer"
          onClick={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          ?
        </div>
        {showTooltip && (
          <div
            className="absolute min-w-[100px] right-0  sm:min-w-[150px] max-w-[300px] mb-2 px-2 py-1 z-50 whitespace-pre-line bg-zinc-700 text-white text-xs rounded-xl"
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
