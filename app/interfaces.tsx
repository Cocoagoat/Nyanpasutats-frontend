import AnilistLogo from "@/public/AniList_logo.png";
import MALLogo from "@/public/MALLogo.png";
import { tooltipsContent } from "@/utils/TooltipsContent";
import { Dispatch, SetStateAction } from "react";

export type User = {
  username: string;
  setUsername: Dispatch<SetStateAction<string>>;
};

export type ImageRow = {
  [key: string]: string;
};

export type RecommendationType = {
  ShowName: string;
  PredictedScore: number;
  UserScore: number;
  MALScore: number;
  Year: number;
  Season: SeasonName;
  Tags: string[];
};

export type RecommendationSortOptions =
  | "SORT_BY_SCORE_DIFFERENCE"
  | "SORT_BY_PREDICTION_SCORE";

export type ShowToDisplay = {
  imageUrl: string;
  score: number;
  displayed: boolean;
  name: string;
  tier?: number;
};
export type ShowsToDisplay = {
  [key: string]: ShowToDisplay;
};

export type SeasonDataKeys =
  | "Shows"
  | "AvgScore"
  | "ShowList"
  | "FavoritesAvgScore"
  | "MostUnusualShow"
  | "OverallRank"
  | "FavoritesRank"
  | "YearlyRank"
  | "FavYearlyRank"
  | "DroppedShows"
  | "Affinity"
  | "MostWatchedGenre"
  | "TotalShowsDuration";

export const seasonalValues = {
  Winter: 0.1,
  Spring: 0.2,
  Summer: 0.3,
  Fall: 0.4,
};

export const statKeysToNames = {
  Season: "Season",
  Shows: "Shows Watched",
  AvgScore: "Mean Score",
  ShowList: "Show List",
  FavoritesAvgScore: "Mean Score (Top 10)",
  MostUnusualShow: "Most Unusual Show",
  OverallRank: "Overall Rank",
  FavoritesRank: "Overall Rank (Top 10)",
  YearlyRank: "Yearly Rank",
  FavYearlyRank: "Yearly Rank (Top 10)",
  DroppedShows: "Shows Dropped",
  Affinity: "Affinity",
  MostWatchedGenre: "Most Watched Genre",
  TotalShowsDuration: "Time Wasted",
};

export const statNamesToKeys = {
  Season: "Season",
  "Shows Watched": "Shows",
  "Mean Score": "AvgScore",
  "Show List": "ShowList",
  "Mean Score (Top 10)": "FavoritesAvgScore",
  "Most Unusual Show": "MostUnusualShow",
  "Overall Rank": "OverallRank",
  "Overall Rank (Top 10)": "FavoritesRank",
  "Yearly Rank": "YearlyRank",
  "Yearly Rank (Top 10)": "FavYearlyRank",
  "Shows Dropped": "DroppedShows",
  Affinity: "Affinity",
  "Most Watched Genre": "MostWatchedGenre",
  "Time Wasted": "TotalShowsDuration",
};

export type AffinityData = {
  Affinity: number;
  CommonShows: number;
};

export type AffinitiesData = {
  [key: string]: AffinityData;
};

export type AffTableType = "Positive" | "Negative";

export type SeasonData = {
  Shows: number;
  AvgScore: number;
  ShowList: { [key: string]: number };
  FavoritesAvgScore: number;
  MostUnusualShow: string;
  OverallRank: number;
  FavoritesRank: number;
  YearlyRank: number;
  FavYearlyRank: number;
  DroppedShows: number;
  Affinity: number;
  MostWatchedGenre: string;
  TotalShowsDuration: string;
};

export type SeasonsData = {
  [key: string]: SeasonData;
};

export type TooltipKeys = keyof typeof tooltipsContent;
export type StatType = {
  name: TooltipKeys;
  value: string;
  tooltipText?: string;
};

export type ChartData = {
  Season: string;
  AvgScore?: number;
  FavoritesAvgScore?: number;
  Shows: number;
};

export type ChartDataKeys =
  | "Season"
  | "AvgScore"
  | "FavoritesAvgScore"
  | "Shows";

export type SeasonName = "Winter" | "Spring" | "Summer" | "Fall";

export type DropdownType = "Full" | "Graph" | "Recs";

export type RangeFilterType = "Year" | "MALScore" | "ShowCount";

export type UserPathType = "affinity" | "seasonal" | "recs";

export const siteOptions = ["MAL", "Anilist"] as const;

export const siteLogos = [MALLogo, AnilistLogo] as const;

export const siteLogosMap = {
  MAL: MALLogo,
  Anilist: AnilistLogo,
};

// Define the type based on the array

export type SiteType = (typeof siteOptions)[number];

// export type UserPathType = "recs" | "affinity" | "seasonal"

export type ShowPathType = "img_url" | "img_urls" | "full";

export type displayedMeanOptions = "AvgScore" | "FavoritesAvgScore" | "Shows";

export type ImageData2 = [string, string, number];

export type ImageData = {
  showName: string;
  imageUrl: string;
  tier: number;
  deleted: boolean;
};

export type TierState = {
  imageData: ShowToDisplay[];
  color: string;
  text: string;
};
// [showName, imageUrl]

export type TiersState = Record<number, TierState>;
