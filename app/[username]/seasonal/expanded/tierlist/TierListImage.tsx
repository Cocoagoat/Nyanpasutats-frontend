import Image from "next/image";
import React, { useState } from "react";

interface ImageWithPlaceholderProps {
  src: string;
  showName: string;
  index: number;
  alt: string;
  className?: string; // Allow custom styles for the image
}

const ImageWithPlaceholder: React.FC<ImageWithPlaceholderProps> = ({
  src,
  showName,
  index,
  alt,
  className,
}) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative ${className}`}>
      {!loaded && (
        <div className="z-50 h-[72px] w-[54px] animate-pulse bg-zinc-600"></div>
      )}
      <img
        key={index}
        src={src}
        alt={alt}
        width={55}
        height={54}
        className={`${showName && "opacity-60"} ${!loaded ? "hidden" : ""}`}
        onLoad={() => setLoaded(true)}
      />
      <div
        className="absolute left-1/2 top-1/2 flex h-full  w-full
           -translate-x-1/2 -translate-y-1/2 items-center justify-center
            text-center text-[0.5rem] font-semibold text-white"
      >
        <p
          className="z-[60] mb-2 text-center opacity-100 shadow-black 
        text-shadow"
        >
          {showName}
        </p>
      </div>
    </div>
  );
};

export default ImageWithPlaceholder;
