import { ShowsToDisplay, ShowToDisplay } from "@/app/interfaces";
import React, { useEffect, useState } from "react";
import { getShowData } from "@/app/home/api";
import FavoriteShows from "./FavoriteShows";
import { useSingleSeasonContext } from "../reducer/SeasonalContext";
import { ModalContext } from "@/contexts/ModalContext";
import FavoriteShowsModal from "./FavoriteShowsModal";
import LargeButton from "../../../../components/general/LargeButton";
import SeasonStatGrid from "./SeasonStatGrid";
import CollapseToggle from "./CollapseToggle";
import GradientFill from "./GradientFill";
import Heading from "./Heading";
import ControversialShow from "./ControversialShow";
import errorImg from "@/public/default.png";
import useToast from "@/hooks/useToast";
import BestX from "./BestX";
import BestX2 from "./BestX2";
import { RiArrowUpDoubleFill } from "react-icons/ri";

export default function SeasonExpanded({ brightness }: { brightness: number }) {
  const [favorites, setFavorites] = useState<ShowsToDisplay>({});
  const [displayContShow, setDisplayContShow] = useState(true);
  const displayedFavorites = Object.fromEntries(
    Object.entries(favorites).filter((show) => show[1].displayed),
  );
  const [favoritesModalOpen, setFavoritesModalOpen] = useState(false);

  const [rows, setRows] = useState(1);
  const [worstImagesNotEmpty, setWorstImagesNotEmpty] = useState<boolean[]>(
    Array.from({ length: rows }).map(() => true),
  );

  const { notifyError } = useToast();

  const [controversialShow, setControversialShow] = useState<ShowToDisplay>({
    imageUrl: "",
    score: 0,
    displayed: false,
    name: "",
  });

  const {
    season,
    seasonStats,
    backgroundImage,
    setExpanded,
    imageChanged,
    editModeOpen,
  } = useSingleSeasonContext();

  function handleAddNewRow() {
    if (rows < 4) {
      setRows((prev) => prev + 1);
      setWorstImagesNotEmpty((prev) => [...prev, true]);
    } else {
      notifyError("A maximum of four rows are allowed.");
    }
  }

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

  // console.log("displayedFavorites : ", displayedFavorites);
  return (
    <ModalContext.Provider
      value={{ favoritesModalOpen, setFavoritesModalOpen }}
    >
      <div className="relative mx-16 mb-8 rounded-3xl bg-zinc-800">
        <div
          className={`relative overflow-hidden rounded-3xl bg-zinc-800 text-white shadow-lg`}
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            opacity: brightness / 100,
          }}
          id={season}
        >
          {!imageChanged && <GradientFill />}

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
                  rows={rows}
                  worstImagesNotEmpty={worstImagesNotEmpty}
                  setWorstImagesNotEmpty={setWorstImagesNotEmpty}
                />
              </div>
            </div>
            {editModeOpen && (
              <CollapseToggle
                onClick={handleAddNewRow}
                IconComponent={RiArrowUpDoubleFill}
                text="Add Row"
                alwaysVisible={true}
              />
            )}
            <CollapseToggle
              onClick={() => setExpanded(false)}
              IconComponent={RiArrowUpDoubleFill}
              text="Collapse"
            />
          </div>
          {favoritesModalOpen && (
            <FavoriteShowsModal
              favorites={favorites}
              setFavorites={setFavorites}
              setFavoritesModalOpen={setFavoritesModalOpen}
            />
          )}
        </div>
      </div>
    </ModalContext.Provider>
  );
}
