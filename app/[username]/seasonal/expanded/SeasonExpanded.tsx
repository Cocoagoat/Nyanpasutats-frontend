import { getShowData } from "@/app/actions/getShowData";
import styles from "@/app/globals.module.css";
import { ShowsToDisplay, ShowToDisplay, TiersState } from "@/app/interfaces";
import Padoru from "@/components/general/Padoru";
import { ModalContext } from "@/contexts/ModalContext";
import useWindowSize from "@/hooks/useWindowSize";
import errorImg from "@/public/default.png";
import { range } from "@/utils/general";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { RiArrowDownDoubleFill, RiArrowUpDoubleFill } from "react-icons/ri";
import LargeButton from "../../../../components/general/LargeButton";
import { useSingleSeasonContext } from "../reducer/SeasonalContext";
import BackgroundDesign from "./BackgroundDesign";
import BestX2 from "./BestX2";
import CollapseToggle from "./CollapseToggle";
import ControversialShow from "./ControversialShow";
import FavoriteShows from "./FavoriteShows";
import FavoriteShowsModal from "./FavoriteShowsModal";
import GradientFill from "./GradientFill";
import Heading from "./Heading";
import SeasonExpandedToolbar from "./SeasonExpandedToolbar";
import SeasonStatGrid from "./SeasonStatGrid";
import TierList from "./tierlist/TierList";

export type ImageRow = {
  [key: string]: string;
};

export const initialTierColors: Record<number, string> = {
  0.5: "#270202",
  1: "#440404",
  1.5: "#6f1515",
  2: "#b71c1c",
  2.5: "#d32f2f",
  3: "#d84300",
  3.5: "#e64a19",
  4: "#ef6c00",
  4.5: "#ff9100",
  5: "#ffd000",
  5.5: "#ffea00",
  6: "#eeff41",
  6.5: "#e1f515",
  7: "#b3ff00",
  7.5: "#97ff00",
  8: "#56ff03",
  8.5: "#00ff45",
  9: "#00ff99",
  9.5: "#00fff0",
  10: "#00b0ff",
};

// const initialRatingTexts: Record<number, string> = {
//   1: "1/10",
//   2: "2/10",
//   3: "3/10",
//   4: "4/10",
//   5: "5/10",
//   6: "6/10",
//   7: "7/10",
//   8: "8/10",
//   9: "9/10",
//   10: "10/10",
// };

export default function SeasonExpanded({
  brightness,
  setCardOpen,
}: {
  brightness: number;
  setCardOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [favorites, setFavorites] = useState<ShowsToDisplay>({});
  const [loaded, setLoaded] = useState(false);
  const [displayContShow, setDisplayContShow] = useState(true);
  const { height } = useWindowSize();
  const [tiers, setTiers] = useState<TiersState>({});

  const displayedFavorites = Object.fromEntries(
    Object.entries(favorites).filter((show) => show[1].displayed),
  );
  const [favoritesModalOpen, setFavoritesModalOpen] = useState(false);

  const [worstImagesNotEmpty, setWorstImagesNotEmpty] = useState<boolean[]>([
    true,
  ]);

  const [controversialShow, setControversialShow] = useState<ShowToDisplay>({
    imageUrl: "",
    score: 0,
    displayed: false,
    name: "",
  });

  let defaultWorstImages = { 0: "" } as ImageRow;
  let defaultBestImages = { 0: "", 1: "", 2: "", 3: "", 4: "" } as ImageRow;

  const [worstImages, setWorstImages] = useState([defaultWorstImages]);
  const [bestImages, setBestImages] = useState([defaultBestImages]);

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const {
    season,
    seasonStats,
    backgroundImage,
    backgroundColor,
    setExpanded,
    imageChanged,
    uploadModalOpen,
    editModeOpen,
    dragModeOpen,
    displayGradient,
    setTierListOpen,
    tierListOpen,
  } = useSingleSeasonContext();

  function handleAddNewRow() {
    setBestImages((prev) => [...prev, defaultBestImages]);
    setWorstImages((prev) => [...prev, defaultWorstImages]);
    setWorstImagesNotEmpty((prev) => [...prev, true]);
  }

  function handleRemoveLastRow() {
    setBestImages((prev) => prev.slice(0, -1));
    setWorstImages((prev) => prev.slice(0, -1));
    setWorstImagesNotEmpty((prev) => prev.slice(0, -1));
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

  useEffect(() => {
    async function getImageUrls() {
      const showList = seasonStats.ShowList;
      const showNames = Object.keys(showList);
      let imageUrls = await getShowData(showNames, "img_urls");
      let initialTiers: TiersState = {};
      for (let i = 1; i <= 10; i++) {
        initialTiers[i] = {
          imageData: [],
          color: initialTierColors[i],
          text: `${i}/10`,
        };
      }

      const showScores = Object.values(showList);
      const thresholdScore = showScores[4];

      const favorite_show_data = {} as ShowsToDisplay;

      Object.entries(showList).forEach(([name, score], index) => {
        const tier = Math.max(1, Math.round(score)); // In case someone has scores below 0.5 on Anilist
        if (score) {
          const show_data = {
            name: showNames[index],
            imageUrl: imageUrls[index],
            score: tier,
            displayed: false,
          } as ShowToDisplay;
          initialTiers[tier]["imageData"].push(show_data);

          if (score >= thresholdScore && score >= seasonStats["AvgScore"]) {
            let show_data_for_favs = {
              ...show_data,
              displayed: index < 5 && score >= seasonStats["AvgScore"],
            };
            favorite_show_data[showNames[index]] = show_data_for_favs;
          }

          if (showNames[index] === seasonStats["MostUnusualShow"]) {
            setControversialShow(show_data);
          }
        }
      });

      setTiers(initialTiers);
      setLoaded(true);
      setFavorites(favorite_show_data);
    }

    getImageUrls();
  }, []);

  return (
    <ModalContext.Provider
      value={{ favoritesModalOpen, setFavoritesModalOpen }}
    >
      <div
        className={`fixed left-1/2 top-1/2 z-[400] -translate-x-1/2 -translate-y-1/2 
           overflow-y-scroll ${styles.hiddenscrollbar} w-small-screen-card  fullhd:w-[978px] 
            ultrahd:w-[1478px]`}
        style={{
          maxHeight: `max(300px, ${height - 150}px)`,
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
          >
            {displayGradient && <GradientFill />}

            {!imageChanged && (
              <Image
                src={backgroundImage}
                ref={imageRef}
                fill
                alt="Test"
                className={`absolute inset-0 rounded-3xl  object-cover `}
                quality={85}
                style={{
                  zIndex: isDragging ? 100000 : 0,
                }}
                objectPosition={`${position.x}px 0px`}
              />
            )}

            <div className="relative z-20">
              <div className="flex flex-col items-center justify-between p-4">
                <Heading />

                <div className="mt-20 grid w-full grid-cols-3 gap-x-10 gap-y-16">
                  <SeasonStatGrid />

                  {!loaded ? (
                    <div className=" relative col-span-1 col-start-1 h-full w-full ">
                      <Padoru width={100} />
                    </div>
                  ) : displayContShow ? (
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

                  {!loaded ? (
                    <div className=" relative col-span-2  col-start-2 h-full w-full ">
                      <Padoru width={100} />
                    </div>
                  ) : Object.keys(displayedFavorites).length ? (
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
      {tierListOpen && (
        <TierList
          tiers={tiers}
          setTiers={setTiers}
          imagesLoaded={loaded}
          setSeasonGraphOpen={setTierListOpen}
        />
      )}
    </ModalContext.Provider>
  );
}
