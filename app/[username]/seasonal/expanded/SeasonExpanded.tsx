import { ShowsToDisplay, ShowToDisplay } from "@/app/interfaces";
import React, { useEffect, useRef, useState } from "react";
import { getShowData } from "@/app/home/api";
import FavoriteShows from "./FavoriteShows";
import { useSingleSeasonContext } from "../reducer/SeasonalContext";
import { ModalContext } from "@/contexts/ModalContext";
import FavoriteShowsModal from "./FavoriteShowsModal";
import LargeButton from "../../../../components/general/LargeButton";
import SeasonStatGrid from "./SeasonStatGrid";
import CollapseToggle from "./CollapseToggle";
import styles from "./SeasonExpanded.module.css";
import GradientFill from "./GradientFill";
import Heading from "./Heading";
import ControversialShow from "./ControversialShow";
import errorImg from "@/public/default.png";
import useToast from "@/hooks/useToast";
import BestX from "./BestX";
import BestX2 from "./BestX2";
import { RiArrowDownDoubleFill, RiArrowUpDoubleFill } from "react-icons/ri";
import { range } from "@/utils/general";
import DraggableBackground from "./DraggableBackground";
import SeasonExpandedToolbar from "./SeasonExpandedToolbar";
import Image from "next/image";
import BackgroundDesign from "./BackgroundDesign";

export type ImageRow = {
  [key: string]: string;
};

export default function SeasonExpanded({
  brightness,
  cardOpen,
  setCardOpen,
}: {
  brightness: number;
  cardOpen: boolean;
  setCardOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [favorites, setFavorites] = useState<ShowsToDisplay>({});
  const [displayContShow, setDisplayContShow] = useState(true);

  const displayedFavorites = Object.fromEntries(
    Object.entries(favorites).filter((show) => show[1].displayed),
  );
  const [favoritesModalOpen, setFavoritesModalOpen] = useState(false);

  const [worstImagesNotEmpty, setWorstImagesNotEmpty] = useState<boolean[]>([
    true,
  ]);

  const { notifyError } = useToast();

  const [controversialShow, setControversialShow] = useState<ShowToDisplay>({
    imageUrl: "",
    score: 0,
    displayed: false,
    name: "",
  });

  const [resolution, setResolution] = useState({ width: 0, height: 0 });

  const {
    season,
    seasonStats,
    backgroundImage,
    backgroundColor,
    setExpanded,
    imageChanged,
    uploadModalOpen,
    // nightImage,
    editModeOpen,
    dragModeOpen,
    // handleDayNightChange,
    displayGradient,
  } = useSingleSeasonContext();

  let defaultWorstImages = { 0: "" } as ImageRow;
  let defaultBestImages = { 0: "", 1: "", 2: "", 3: "", 4: "" } as ImageRow;

  const [worstImages, setWorstImages] = useState([defaultWorstImages]);
  const [bestImages, setBestImages] = useState([defaultBestImages]);

  useEffect(() => {
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;
    setResolution({ width: screenWidth, height: screenHeight });
  }, []);

  function handleAddNewRow() {
    // if (bestImages.length < 4) {
    setBestImages((prev) => [...prev, defaultBestImages]);
    setWorstImages((prev) => [...prev, defaultWorstImages]);
    setWorstImagesNotEmpty((prev) => [...prev, true]);
    // } else {
    //   notifyError("A maximum of four rows are allowed.");
    // }
  }

  function handleRemoveLastRow() {
    // if (bestImages.length > 1) {
    setBestImages((prev) => prev.slice(0, -1));
    setWorstImages((prev) => prev.slice(0, -1));
    setWorstImagesNotEmpty((prev) => prev.slice(0, -1));
    // } else {
    //   notifyError("A minimum of one row is required.");
    // }
  }

  function imagesAreEmpty(images: ImageRow[]) {
    for (const imageRow of images) {
      for (const key in imageRow) {
        if (imageRow[key] !== "") {
          return false;
        }
      }
    }
    return true;
  }

  useEffect(() => {
    if (!imagesAreEmpty(worstImages) || worstImages.length > 1) {
      sessionStorage.setItem(
        `${season}_worstImages`,
        JSON.stringify(worstImages),
      );
    }
  }, [worstImages]);

  useEffect(() => {
    if (!imagesAreEmpty(bestImages) || bestImages.length > 1) {
      sessionStorage.setItem(
        `${season}_bestImages`,
        JSON.stringify(bestImages),
      );
    }
  }, [bestImages]);

  useEffect(() => {
    let savedWorstImages = sessionStorage.getItem(`${season}_worstImages`);
    let savedBestImages = sessionStorage.getItem(`${season}_bestImages`);

    if (savedWorstImages) {
      console.log(sessionStorage.getItem(`${season}_worstImages`)!);
      setWorstImages(JSON.parse(savedWorstImages)); // ffs typescript

      let parsedSavedWorstImages = JSON.parse(savedWorstImages) as ImageRow[];
      if (!parsedSavedWorstImages) return;
      // console.log("Test", parsedSavedWorstImages);
      setWorstImagesNotEmpty(
        Array.from(
          range(0, parsedSavedWorstImages.length - 1, 1),
          (i: number) =>
            Object.keys(parsedSavedWorstImages[i]).length >= 1 ||
            (parsedSavedWorstImages[i][0] !== "" &&
              parsedSavedWorstImages[i][0] !== undefined),
        ),
      );
    }
    if (savedBestImages) {
      console.log(sessionStorage.getItem(`${season}_bestImages`)!);
      setBestImages(JSON.parse(savedBestImages));
    }
  }, []);

  useEffect(() => {
    const getImageUrl = async () => {
      const showScores = Object.values(seasonStats["ShowList"]);
      const thresholdScore = showScores[4];

      const favorite_show_scores = showScores.filter(
        (score) => score >= thresholdScore && score >= seasonStats["AvgScore"],
      );

      const favorite_shows = Object.keys(seasonStats["ShowList"]).slice(
        0,
        favorite_show_scores.length,
      );

      let contr_img_url = "";
      try {
        contr_img_url = await getShowData(
          seasonStats["MostUnusualShow"],
          "img_url",
        );
      } catch (error) {
        console.error(error);
        contr_img_url = errorImg.src;
      }
      setControversialShow({
        imageUrl: contr_img_url,
        score: seasonStats["ShowList"][seasonStats["MostUnusualShow"]],
        displayed: false,
        name: seasonStats["MostUnusualShow"],
      });

      let fav_img_urls = [] as string[];
      try {
        fav_img_urls = await getShowData(favorite_shows, "img_urls");
      } catch (error) {
        console.error(error);
        fav_img_urls = Array(favorite_shows.length).fill(errorImg.src);
      }
      const favorites_data = Object.fromEntries(
        favorite_shows.map((title, index) => {
          return [
            title,
            {
              imageUrl: fav_img_urls[index],
              score: favorite_show_scores[index],
              displayed:
                index < 5 &&
                favorite_show_scores[index] >= seasonStats["AvgScore"],
              name: title,
            },
          ];
        }),
      );
      setFavorites(favorites_data);
    };
    getImageUrl();
  }, []);

  const [position, setPosition] = useState({ x: 0, y: 0 });

  // useEffect(() => {}, [imageChanged]);
  // const isDragging = useRef(false);
  const [isDragging, setIsDragging] = useState(false);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (dragModeOpen) {
      console.log(e.target);
      e.preventDefault();
      setIsDragging(true);
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      setPosition((prevPosition) => ({
        x: prevPosition.x + e.movementX,
        y: prevPosition.y + e.movementY,
      }));
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

  // const cardWidth = "w-";

  // console.log("displayedFavorites : ", displayedFavorites);
  return (
    <ModalContext.Provider
      value={{ favoritesModalOpen, setFavoritesModalOpen }}
    >
      <div
        className={`fixed left-1/2 top-1/2 z-[400] -translate-x-1/2 -translate-y-1/2 
           overflow-y-scroll ${styles.hiddenscrollbar} w-small-screen-card  fullhd:w-[978px] 
            ultrahd:w-[1478px]`}
        style={{
          maxHeight: `${resolution.height - 150}px`,
          // width: `${resolution.width < 1000 ? `${resolution.width - 10}px` : ""}`,
        }}
      >
        <div
          style={{ backgroundColor: backgroundColor }}
          className="relative mx-16 mb-8   rounded-3xl"
        >
          {uploadModalOpen && <BackgroundDesign />}
          <div
            className={`relative ${dragModeOpen && "cursor-move"} rounded-3xl bg-cover  text-white shadow-lg`}
            style={{
              backgroundImage: `${imageChanged ? `url(${backgroundImage})` : ""}`,
              // backgroundSize: `${imageChanged && !nightImage ? "auto 120%" : "auto 102%"}`,
              backgroundPosition: `${position.x}px 0px`,
              opacity: brightness / 100,
            }}
            id={season}
            onMouseDown={handleMouseDown}
            draggable={true}

            // onMouseMove={handleMouseMove}
            // onMouseUp={handleMouseUp}
          >
            {displayGradient && (
              <GradientFill
              // displayGradient={displayGradient}
              // setDisplayGradient={setDisplayGradient}
              />
            )}

            {!imageChanged && (
              <Image
                src={backgroundImage}
                ref={imageRef}
                layout="fill"
                alt="Test"
                className={`absolute inset-0 rounded-3xl  object-cover `}
                quality={85}
                // sizes={"(max-width: 768px) 100vw, 75vw"}
                style={{
                  zIndex: isDragging ? 100000 : 0,
                }}
                objectPosition={`${position.x}px 0px`}
              />
            )}
            {/* <div
            style={{ width: "100%", height: "100%" }}
            className="min-h-full w-full"
          > */}

            {/* </div> */}

            <div className="relative z-20">
              <div className="flex flex-col items-center justify-between p-4">
                <Heading />

                <div className="mt-20 grid w-full grid-cols-3 gap-x-10 gap-y-16">
                  <SeasonStatGrid />

                  {displayContShow ? (
                    <ControversialShow
                      controversialShow={controversialShow}
                      setDisplayContShow={setDisplayContShow}
                    />
                  ) : (
                    editModeOpen && (
                      <div
                        className={`flex h-[105px] w-[75px] cursor-pointer  
              items-center justify-center justify-self-center rounded-xl
              bg-zinc-800 text-center text-xs text-lime-600 opacity-40 shadow-md shadow-black 
              hover:opacity-100`}
                        onClick={() => setDisplayContShow(true)}
                      >
                        <p className="font-semibold">Restore</p>
                      </div>
                    )
                  )}

                  {Object.keys(displayedFavorites).length ? (
                    <FavoriteShows
                      favorites={displayedFavorites}
                      contShowRemoved={!displayContShow}
                    />
                  ) : (
                    <LargeButton
                      onClick={() => setFavoritesModalOpen(true)}
                      fill={true}
                    >
                      Add favorites
                    </LargeButton>
                  )}
                  <BestX2
                    worstImages={worstImages}
                    bestImages={bestImages}
                    setWorstImages={setWorstImages}
                    setBestImages={setBestImages}
                    worstImagesNotEmpty={worstImagesNotEmpty}
                    setWorstImagesNotEmpty={setWorstImagesNotEmpty}
                  />
                </div>
              </div>
              {editModeOpen && (
                <>
                  {bestImages.length > 0 && (
                    <CollapseToggle
                      onClick={handleRemoveLastRow}
                      IconComponent={RiArrowUpDoubleFill}
                      text="Delete Row"
                      alwaysVisible={true}
                    />
                  )}
                  {bestImages.length < 4 && (
                    <CollapseToggle
                      onClick={handleAddNewRow}
                      IconComponent={RiArrowDownDoubleFill}
                      text="Add Row"
                      alwaysVisible={true}
                    />
                  )}
                </>
              )}
              {!editModeOpen && (
                <CollapseToggle
                  onClick={() => {
                    setExpanded(false);
                    setCardOpen(false);
                  }}
                  IconComponent={RiArrowUpDoubleFill}
                  text="Collapse"
                />
              )}
            </div>
            {favoritesModalOpen && (
              <FavoriteShowsModal
                favorites={favorites}
                setFavorites={setFavorites}
                setFavoritesModalOpen={setFavoritesModalOpen}
              />
            )}
          </div>
          <>
            <SeasonExpandedToolbar />
          </>
        </div>
      </div>
    </ModalContext.Provider>
  );
}
