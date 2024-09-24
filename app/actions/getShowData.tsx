"use server";
import { ShowPathType } from "../interfaces";

export async function getShowData(
  showNames: string | string[],
  path: ShowPathType,
): Promise<any> {
  try {
    const multipleShows = typeof showNames !== "string";
    const response = await fetch(
      `http://localhost:80/${path}/?show_name${multipleShows ? "s" : ""}=${
        multipleShows
          ? encodeURIComponent(JSON.stringify(showNames))
          : encodeURIComponent(showNames)
      }`,
      { next: { revalidate: 3600 } },
    );

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(
        `Server responded with status ${response.status}: ${errorMessage}`,
      );
    }

    const rawData = await response.text();
    const data = JSON.parse(rawData);
    return data;
  } catch (error) {
    throw new Error(`An error occurred while fetching show data: ${error}`);
  }
}
