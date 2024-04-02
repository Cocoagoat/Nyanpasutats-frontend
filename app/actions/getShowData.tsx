"use server";
import { ShowPathType } from "../interfaces";

export async function getShowData(
  showNames: string | string[],
  path: ShowPathType,
): Promise<any> {
  try {
    const multipleShows = typeof showNames !== "string";
    const response = await fetch(
      `http://localhost:8000/${path}/?show_name${multipleShows ? "s" : ""}=${
        multipleShows
          ? encodeURIComponent(JSON.stringify(showNames))
          : encodeURIComponent(showNames)
      }`,
      { next: { revalidate: 3600 } },
    );

    // Handling client-side errors
    if (!response.ok) {
      const errorMessage = await response.text();
      console.error(`Error from server: ${errorMessage}`, 8, 9); // Using console.error for better visibility of errors
      throw new Error(
        `Server responded with status ${response.status}: ${errorMessage}`,
      );
    }

    const rawData = await response.text();
    const data = JSON.parse(rawData);
    return data;
  } catch (error) {
    // Handling network errors or parsing errors
    console.error(`An error occurred while fetching show data: ${error}`);
    throw new Error(`An error occurred while fetching show data: ${error}`);
  }
}
