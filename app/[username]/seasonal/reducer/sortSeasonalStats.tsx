import { SeasonsData, SeasonName, seasonalValues } from "@/app/interfaces";

export function compareSeasons(a: string, b: string) {
  {
    const [season_a, year_a] = a.split(" ") as [SeasonName, string];
    const [season_b, year_b] = b.split(" ") as [SeasonName, string];

    const comparisonValue =
      Number(year_a) +
      seasonalValues[season_a] -
      Number(year_b) -
      seasonalValues[season_b];

    return comparisonValue;
  }
}

export function sortSeasonalStats(
  seasonalStats: SeasonsData,
  by: string,
  reverse: boolean,
) {
  switch (by) {
    case "Season":
      return Object.fromEntries(
        Object.entries(seasonalStats).sort((a, b) => {
          const coeff = reverse ? -1 : 1;
          return coeff * compareSeasons(a[0], b[0]);
        }),
      );
    case "AvgScore":
    case "FavoritesAvgScore":
    case "Shows":
      return Object.fromEntries(
        Object.entries(seasonalStats).sort((a, b) => {
          const comparisonValue = a[1][by] - b[1][by];

          if (!reverse) {
            return comparisonValue;
          } else {
            return -comparisonValue;
          }
        }),
      );
    default:
      return seasonalStats;
  }
}
