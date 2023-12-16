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
