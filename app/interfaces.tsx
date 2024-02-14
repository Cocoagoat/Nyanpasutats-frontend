import { tooltipsContent } from "@/utils/TooltipsContent";
import { Dispatch, SetStateAction } from "react";

export type User = {
  username: string;
  setUsername: Dispatch<SetStateAction<string>>;
};

export type RecommendationType = {
  ShowName: string;
  PredictedScore: number;
  UserScore: number;
  MALScore: number;
};

export type ShowToDisplay = {
  imageUrl: string;
  score: number;
  displayed: boolean;
  name: string;
};
export type ShowsToDisplay = {
  [key: string]: ShowToDisplay;
};

export type SeasonDataKeys =
  | "Shows"
  | "AvgScore"
  | "ShowList"
  | "FavoritesAvgScore"
  | "MostControversialShow"
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
  MostControversialShow: "Most Unusual Show",
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
  "Most Unusual Show": "MostControversialShow",
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
  MostControversialShow: string;
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

export type DropdownType = "Full" | "Graph";

export type displayedMeanOptions = "AvgScore" | "FavoritesAvgScore" | "Shows";
