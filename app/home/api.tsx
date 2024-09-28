import { ShowPathType, SiteType, UserPathType } from "../interfaces";

export function handleError(error: Error) {
  let errorMessage = error.message;
  if (error instanceof TypeError) {
    errorMessage =
      "We couldn't fetch your data. This might be an issue on our end - please try again later.";
  }
  throw new Error(errorMessage);
}

export async function startTask(
  username: string,
  path: UserPathType,
  site: SiteType,
): Promise<string> {
  const url = `http://localhost:80/${path}/?username=${encodeURIComponent(username)}&site=${encodeURIComponent(site)}`;
  try {
    const res = await fetch(url, { cache: "no-store" });

    const rawData = await res.text();
    const data = JSON.parse(rawData);
    return data["taskId"];
  } catch (error: any) {
    handleError(error);
  }
  return ""; // This line is unreachable, but TypeScript requires it
}

export async function retrieveQueuePosition(
  type: "affs" | "recs" | "seasonal",
) {
  const url = `https://localhost/queue_pos/?type=${type}&random=${Math.random()}`;
  // Random is added because next.js doesn't seem to care about the cache: "no-store" option
  const res = await fetch(url, { cache: "no-store" });

  const rawData = await res.text();
  const data = JSON.parse(rawData);
  return { queuePosition: data["queuePosition"] };
}

// old way of user verification, remove later
// export async function assertUsernameInCache(username: string) {
//   const url = `http://localhost:8000/recent_users/?username=${encodeURIComponent(username)}`;
//   const res = await fetch(url, { cache: "no-store" });
//   const rawData = await res.text();
//   const data = JSON.parse(rawData);
//   return data["UserFound"];
// }

export async function updateImageUrl(showName: string) {
  const url = `http://localhost:80/update_img_url/`;
  const res = await fetch(url, {
    method: "POST",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ show_name: showName }),
  });
  const rawData = await res.text();
  const data = JSON.parse(rawData);
}

export async function getShowData(
  showNames: string | string[],
  path: ShowPathType,
): Promise<any> {
  try {
    const multipleShows = typeof showNames !== "string";
    const response = await fetch(
      `http://localhost/${path}/?show_name${multipleShows ? "s" : ""}=${
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
