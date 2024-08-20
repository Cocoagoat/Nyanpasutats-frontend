import { retrieveTaskData } from "@/app/actions/retrieveTaskData";
import { startTask } from "@/app/home/api";
import { RecommendationType } from "@/app/interfaces";
import GenericError from "@/components/general/GenericError";
import { getSiteCookie } from "@/utils/CookieUtils";
import { cookies } from "next/headers";
import RecsBox from "./RecsBox";
import { Nav } from "@/components/general/Nav";

export async function generateMetadata({
  params,
}: {
  params: { username: string };
}) {
  return {
    title: `${params.username} / Recs`,
    description: `${params.username}'s anime recommendations`,
  };
}

function roundPredictedScores(recs: RecommendationType[]) {
  return recs.map((dict) => ({
    ...dict,
    PredictedScore: parseFloat(dict.PredictedScore.toFixed(2)),
  }));
}

export default async function page({
  params,
}: {
  params: { username: string };
}) {
  let data = [];
  // Set on the home page when fetching user data
  const siteCookie = getSiteCookie();

  // In case someone got past the middleware that redirects people who change the URL
  const usernameCookie = cookies().get("username")?.["value"] as string;
  if (!usernameCookie || usernameCookie != params.username) {
    return (
      <GenericError
        errorMessage={
          "Unauthorized user - please submit your username through the home page."
        }
      />
    );
  }

  // Start Celery task to get recommendations, then ping server in intervals
  // until data is ready
  const taskId = await startTask(params.username, "recs", siteCookie);
  if (taskId === undefined) {
    throw new Error("Unknown error. Please try again.");
  }
  data = await retrieveTaskData(taskId, params.username);

  let recs: RecommendationType[] = data["Recommendations"],
    recs_sorted_by_diff: RecommendationType[] =
      data["RecommendationsSortedByDiff"];

  let favTags = data["FavTags"],
    leastFavTags = data["LeastFavTags"];

  recs = roundPredictedScores(recs);
  recs_sorted_by_diff = roundPredictedScores(recs_sorted_by_diff);

  return (
    <>
      <Nav />
      <RecsBox
        recs={recs}
        recs_sorted_by_diff={recs_sorted_by_diff}
        favTags={favTags}
        leastFavTags={leastFavTags}
      ></RecsBox>
    </>
  );
}
