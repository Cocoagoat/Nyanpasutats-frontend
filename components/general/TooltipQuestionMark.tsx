import React from "react";

export function TooltipQuestionMark({
  text,
  extraStyles,
  color,
}: {
  text: string;
  extraStyles?: string;
  color?: string;
}) {
  const [showTooltip, setShowTooltip] = React.useState(false);
  const [hovered, setHovered] = React.useState(false);

  return (
    <div className={`absolute right-1/5`}>
      <div className="relative flex w-full items-center justify-center">
        <div
          className={`flex h-6 w-6 cursor-pointer items-center justify-center
           rounded-full bg-blue-970 text-xs ${extraStyles}`}
          onClick={() => setShowTooltip(true)}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => {
            setShowTooltip(false);
            setHovered(false);
          }}
          style={{
            backgroundColor: hovered ? (color ? color : "#65A30D") : "",
          }}
        >
          ?
        </div>
        {showTooltip && (
          <div
            className="absolute right-0 top-3 z-[10000]  mb-2 min-w-[100px] max-w-[300px] 
             -translate-y-1/2 rounded-xl bg-zinc-800 p-3 text-xs text-white sm:min-w-[150px]"
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
