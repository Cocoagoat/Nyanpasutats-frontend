import Image from "next/image";
import React, { useState } from "react";

interface ImageWithPlaceholderProps {
  src: string;
  index: number;
  alt: string;
  className?: string; // Allow custom styles for the image
}

const ImageWithPlaceholder: React.FC<ImageWithPlaceholderProps> = ({
  src,
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
        className={`${!loaded ? "hidden" : ""}`}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
};

export default ImageWithPlaceholder;
