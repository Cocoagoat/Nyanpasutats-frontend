import { useEffect, useState } from "react";
import ImageCarouselButton from "./ImageCarouselButton";

export default function ImageCarousel({
  images,
  imagesText,
}: {
  images: string[];
  imagesText: string[];
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [previousImageIndex, setPreviousImageIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [hovered, setHovered] = useState(false);

  // const imagesClosed = [...images];
  const imagesCount = images.length;

  type TransitionType = "Next" | "Previous";

  const autoAdvanceDelay = 5000;

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!animating && !hovered) {
        nextImage();
      }
    }, autoAdvanceDelay);

    // Clear the timeout if the component unmounts
    // or if the user interacts and causes a re-render
    return () => clearTimeout(timeoutId);
  }, [currentImageIndex, animating, hovered]);

  function startTransition(newIndex: number, type: TransitionType) {
    if (animating) return;

    setAnimating(true);
    setPreviousImageIndex(currentImageIndex);
    setCurrentImageIndex(newIndex);

    setTimeout(() => {
      setAnimating(false);
    }, 1000);
  }

  function previousImage() {
    const newIndex =
      currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1;
    startTransition(newIndex, "Previous");
  }

  function nextImage() {
    const newIndex =
      currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1;
    startTransition(newIndex, "Next");
  }

  function getImageTranslate(currentImageIndex: number, index: number) {
    let translateClass = "";
    if (currentImageIndex === images.length - 1 && index === 0) {
      translateClass = "translate-x-full"; // index 4 still on -translate-x-full bad
    } else if (currentImageIndex === 0 && index === images.length - 1) {
      translateClass = "-translate-x-full";
    } else
      index === currentImageIndex
        ? (translateClass = "translate-x-0")
        : index < currentImageIndex
          ? (translateClass = "-translate-x-full")
          : (translateClass = "translate-x-full ");
    return translateClass;
  }

  function getOpacity(
    currentImageIndex: number,
    previousImageIndex: number,
    index: number,
  ) {
    let opacity = null;

    if (
      index === currentImageIndex ||
      ((index === (currentImageIndex - 1 + imagesCount) % imagesCount ||
        index === (currentImageIndex + 1 + imagesCount) % imagesCount ||
        index === currentImageIndex) &&
        index === previousImageIndex)
    ) {
      opacity = 100;
    } else opacity = 0;
    return opacity;
  }

  return (
    <div className="flex flex-col">
      <div
        className="xl:w-image-carousel relative aspect-[3/2] w-[500px]
      overflow-hidden rounded-3xl shadow-2xl shadow-blue-900 "
      >
        <ImageCarouselButton
          type="previous"
          animating={animating}
          onClick={previousImage}
          setOnHover={setHovered}
        />
        {images.map((image, index) => {
          return (
            <img
              key={index}
              src={image}
              width={500}
              height={150}
              alt={`Slide ${index}`}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              className={`absolute top-0 h-full w-full transform 
          transition-transform duration-1000 ${getImageTranslate(
            currentImageIndex,
            index,
          )} opacity-${getOpacity(currentImageIndex, previousImageIndex, index)}`}
            />
          );
        })}
        <ImageCarouselButton
          type="next"
          animating={animating}
          onClick={nextImage}
          setOnHover={setHovered}
        />
      </div>
      <p className="text-wrap relative  text-center text-[1.45rem] font-semibold leading-tight text-zinc-400 shadow-black text-shadow">
        {imagesText[currentImageIndex]}
        {currentImageIndex === imagesCount - 1 && (
          <p className="absolute w-full text-center text-[7px] ">
            *It's technically AI, but definitely not GPT-4, don't expect much
          </p>
        )}
      </p>
    </div>
  );
}