import useLoadBestXImagesFromCookies from "@/app/[username]/seasonal/expanded/useLoadBestXImagesFromCookies";
import useSaveBestXImagesIntoCookies from "@/app/[username]/seasonal/expanded/useSaveBestXImagesIntoCookies";
import { getShowData } from "@/app/actions/getShowData";
import styles from "@/app/globals.module.css";
import {
  ImageRow,
  ShowsToDisplay,
  ShowToDisplay,
  TiersState,
} from "@/app/interfaces";
import LoadingSpinner from "@/components/general/LoadingSpinner";
import useWindowSize from "@/hooks/useWindowSize";
import { useParams } from "next/navigation";
import React, { useContext, useEffect, useRef, useState } from "react";
import { RiArrowUpDoubleFill } from "react-icons/ri";
import LargeButton from "../../../../components/general/LargeButton";
import {
  SeasonalContext,
  useSingleSeasonContext,
} from "../reducer/SeasonalContext";
import BackgroundDesignModal from "./BackgroundDesignModal";
import BestX from "./BestX";
import BestXRowToggle from "./BestXRowToggle";
import CollapseToggle from "./CollapseToggle";
import ControversialShow from "./ControversialShow";
import FavoriteShows from "./FavoriteShows";
import FavoriteShowsModal from "./FavoriteShowsModal";
import Heading from "./Heading";
import { ModalContext } from "./ModalContext";
import SeasonBackgroundImageContainer from "./SeasonBackgroundImageContainer";
import SeasonExpandedToolbar from "./SeasonExpandedToolbar";
import { initialTierColors } from "./SeasonExpandedUtils";
import SeasonStatGrid from "./SeasonStatGrid";
import TierList from "./tierlist/TierList";

export default function SeasonExpanded({
  setCardOpen,
}: {
  setCardOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [favorites, setFavorites] = useState<ShowsToDisplay>({});
  const [loaded, setLoaded] = useState(false);
  const [displayContShow, setDisplayContShow] = useState(true);
  const { height } = useWindowSize();
  const tiers = useRef<TiersState>({});
  const username = useParams<{ username: string }>().username;

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

  const {
    season,
    seasonStats,
    setExpanded,
    uploadModalOpen,
    editModeOpen,
    setTierListOpen,
    tierListOpen,
    backgroundColor,
    altBackgroundColor,
  } = useSingleSeasonContext();

  const { noSequels } = useContext(SeasonalContext)!;

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

  useSaveBestXImagesIntoCookies(worstImages, season, "worst");
  useSaveBestXImagesIntoCookies(bestImages, season, "best");

  useLoadBestXImagesFromCookies(
    season,
    setWorstImages,
    setBestImages,
    setWorstImagesNotEmpty,
  );

  useEffect(() => {
    // This hook fetches the image urls for all the shows the user watched,
    // and updates all the image-dependent state
    // (tiers, favorites, controversial show) in one go.
    async function getImageUrls() {
      const showList = seasonStats.ShowList;
      const showNames = Object.keys(showList);
      let imageUrls = await getShowData(showNames, "img_urls");
      let tempInitialTiers: TiersState = {};

      let previousColors =
        JSON.parse(sessionStorage.getItem("tierListColors_10") as string) ??
        ({} as Record<number, string>);

      let previousText =
        JSON.parse(sessionStorage.getItem("tierListText_10") as string) ??
        ({} as Record<number, string>);

      for (let i = 1; i <= 10; i++) {
        tempInitialTiers[i] = {
          imageData: [],
          color: previousColors[i] ?? initialTierColors[i],
          text: previousText[i] ?? `${i}/10`,
        };
      }

      // Favorites are shows that have a score higher than the user's
      // mean score and equal to or higher than their 5th highest score
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

          // Add all shows to tiers
          tempInitialTiers[tier]["imageData"].push(show_data);

          // Add all shows meeting favorites condition to favorites
          if (score >= thresholdScore && score >= seasonStats["AvgScore"]) {
            let show_data_for_favs = {
              ...show_data,
              displayed: index < 5 && score >= seasonStats["AvgScore"],
            };
            favorite_show_data[showNames[index]] = show_data_for_favs;
          }

          // Backend already calculated the most "controversial" show
          if (showNames[index] === seasonStats["MostUnusualShow"]) {
            setControversialShow(show_data);
          }
        }
      });

      if (
        localStorage.getItem(
          `${username}_${season}_TierList${noSequels ? "_NoSequels" : ""}`,
        )
      ) {
        const savedTiers = JSON.parse(
          localStorage.getItem(
            `${username}_${season}_TierList${noSequels ? "_NoSequels" : ""}`,
          ) as string,
        );
        tiers.current = savedTiers;
      } else {
        tiers.current = tempInitialTiers;
        localStorage.setItem(
          `${username}_${season}_TierList${noSequels ? "_NoSequels" : ""}_Initial`,
          JSON.stringify(tiers.current),
        );
      }

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
           overflow-y-scroll ${styles.hiddenscrollbarVerticalOnly}  w-small-screen-card overflow-x-scroll
             fullhd:w-[978px] ultrahd:w-[1478px]`}
        style={{
          maxHeight: `max(300px, ${height - 150}px)`,
        }}
      >
        <div
          style={
            {
              // html2Images does not like inline styles, the solid-colored
              // background is now created inside GradientFill alongside
              // the gradient.
            }
          }
          className="relative mx-16 mb-8 w-[900px] lg:w-auto"
        >
          {uploadModalOpen && <BackgroundDesignModal />}
          <SeasonBackgroundImageContainer>
            {/* Basically a div with a background image and dragging capabilities*/}
            <div className="relative z-20">
              <div className="flex flex-col items-center justify-between p-4">
                <Heading />

                <div className="mt-20 grid w-full grid-cols-3 gap-x-10 gap-y-16">
                  <SeasonStatGrid />

                  {!loaded ? (
                    <div className=" relative col-span-1 col-start-1 h-full w-full ">
                      <LoadingSpinner
                        width={100}
                        backgroundColor={backgroundColor}
                      />
                    </div>
                  ) : displayContShow ? (
                    <ControversialShow
                      controversialShow={controversialShow}
                      setDisplayContShow={setDisplayContShow}
                    />
                  ) : (
                    // If edit mode is open, show the button that restores the contShow
                    editModeOpen && (
                      <div
                        className={`flex h-[105px] w-[75px] cursor-pointer  
              items-center justify-center justify-self-center rounded-xl
              bg-zinc-800 text-center text-xs opacity-40 shadow-md shadow-black 
              hover:opacity-100`}
                        style={{ color: altBackgroundColor }}
                        onClick={() => setDisplayContShow(true)}
                      >
                        <p className="font-semibold">Restore</p>
                      </div>
                    )
                  )}

                  {!loaded ? (
                    <div className=" relative col-span-2  col-start-2 h-full w-full ">
                      <LoadingSpinner
                        width={100}
                        backgroundColor={backgroundColor}
                      />
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
                  <BestX
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
                <BestXRowToggle
                  currentRows={bestImages.length}
                  handleAddNewRow={handleAddNewRow}
                  handleRemoveLastRow={handleRemoveLastRow}
                />
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
          </SeasonBackgroundImageContainer>

          <>
            <SeasonExpandedToolbar />
          </>
        </div>
      </div>

      {tierListOpen && (
        <div>
          <div className="fixed inset-0 z-[450] bg-black opacity-90" />

          <TierList
            tiersFromRef={tiers.current}
            imagesLoaded={loaded}
            setTierListOpen={setTierListOpen}
          />
        </div>
      )}
    </ModalContext.Provider>
  );
}
