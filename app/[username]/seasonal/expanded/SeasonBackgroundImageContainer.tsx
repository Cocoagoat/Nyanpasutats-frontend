import React, { useState, useEffect, useRef } from "react";
import { useSingleSeasonContext } from "../reducer/SeasonalContext";
import Image from "next/image";
import GradientFill from "./GradientFill";
import { hexToRgb } from "@/utils/general";

// Basically a div with a background image and horizontal dragging capabilities
export default function SeasonBackgroundImageContainer({
  children,
}: {
  children: any;
}) {
  const {
    dragModeOpen,
    imageChanged,
    backgroundImage,
    season,
    displayGradient,
    backgroundColor,
  } = useSingleSeasonContext();
  const [isDragging, setIsDragging] = useState(false);
  const positionRefX = useRef(0);
  const [positionX, setPositionX] = useState(0);
  const frameRef = useRef<number | null>(null);
  const [positionChanged, setPositionChanged] = useState(false);

  useEffect(() => {
    setPositionChanged(false);
  }, [backgroundImage]);

  useEffect(() => {
    if (isDragging) {
      setPositionChanged(true);
    }
  }, [isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (dragModeOpen) {
      e.preventDefault();
      setIsDragging(true);
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      positionRefX.current = positionRefX.current + e.movementX;
      if (frameRef.current === null) {
        frameRef.current = requestAnimationFrame(() => {
          setPositionX(positionRefX.current);
          frameRef.current = null;
        });
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  const rgbColor = hexToRgb(backgroundColor);
  return (
    <>
      <div
        className={`relative ${dragModeOpen ? "cursor-move" : ""}
       bg-no-repeat ${isDragging ? "z-[100000]" : ""} rounded-3xl bg-cover
        text-white shadow-lg`}
        id={season}
        onMouseDown={handleMouseDown}
        draggable={dragModeOpen ? true : false}
      >
        <div
          // Div for changed background image
          className="absolute inset-0 rounded-3xl bg-cover bg-no-repeat"
          style={{
            backgroundImage: `${imageChanged ? `url(${backgroundImage})` : ""}`,
            backgroundPosition: `${positionChanged ? `${positionX}px 0px` : "center"}`,
            zIndex: 5,
          }}
        ></div>

        {!imageChanged && (
          // Div for default background image
          <Image
            src={backgroundImage}
            fill
            unoptimized={true}
            alt="Test"
            className="absolute inset-0 rounded-3xl object-cover"
            quality={85}
            style={{
              zIndex: 5,
            }}
            objectPosition={`${positionChanged ? `${positionX}px 0px` : "center"}`}
          />
        )}

        {displayGradient && <GradientFill />}

        <div
          // Div for solid color overlay
          className="absolute inset-0 rounded-3xl"
          style={{
            backgroundColor: `rgba(${rgbColor}, 1)`,
            zIndex: 4,
          }}
        ></div>

        {children}
      </div>
    </>
  );
}
