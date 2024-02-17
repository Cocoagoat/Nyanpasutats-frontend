// async function getAffinities(username: string) {
//   const res = await fetch(
//     `http://localhost:8000/affinities/?username=${encodeURIComponent(
//       username
//     )}`,
//     { next: { revalidate: 3000 } }
//   );
//   if (!res.ok) {
//     const errorMessage = await res.text();
//     console.log(errorMessage, 8, 9);
//     if (res.status == 400) {
//       throw new Error(errorMessage);
//     }
//   }

//   const rawData = await res.text();
//   console.log("Raw Data:", rawData);
//   const data = JSON.parse(rawData);
//   console.log("Parsed Data:", data);
//   return data["Affinities"];
// }

type UserPathType = "recs" | "affinity" | "seasonal" | "affinity";
type ShowPathType = "img_url" | "img_urls" | "full";
export async function getUserData(username: string, path: UserPathType) {
  try {
    const res = await fetch(
      `http://localhost:8000/${path}/?username=${encodeURIComponent(username)}`,
      { next: { revalidate: 3000 } },
    );

    console.log(res);

    // if (!res.ok) {
    //   const errorMessage = await res.text();
    //   throw new Error(errorMessage.slice(1, -1));
    // }

    const rawData = await res.text();
    const data = JSON.parse(rawData);

    switch (path) {
      case "recs":
        return [data["Recommendations"], data["RecommendationsNoWatched"]];
      case "affinity":
        return [data["PositiveAffs"], data["NegativeAffs"]];
      case "seasonal":
        return [data["Stats"], data["StatsNoSequels"]];
    }
  } catch (error) {
    let errorMessage = `An unexpected error occurred on our end - ${(error as Error).message}`;
    if (error instanceof TypeError) {
      errorMessage =
        "We couldn't fetch your data. This might be an issue on our end - please try again later.";
    }

    console.error(errorMessage);
    throw new Error(errorMessage);
  }
}

export async function getShowData(
  showNames: string | string[],
  path: ShowPathType,
): Promise<any> {
  // Consider replacing 'any' with a more specific type that matches your expected data structure

  try {
    const multipleShows = typeof showNames !== "string";
    const response = await fetch(
      `http://localhost:8000/${path}/?show_name${multipleShows ? "s" : ""}=${
        multipleShows
          ? encodeURIComponent(JSON.stringify(showNames))
          : encodeURIComponent(showNames)
      }`,
      { method: "GET" }, // Replaced { next: { revalidate: 300 } } with { method: 'GET' } for clarity and correctness
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
