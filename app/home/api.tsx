import { ShowPathType, SiteType, UserPathType } from "../interfaces";

export function handleError(error: Error) {
  let errorMessage = `An unexpected error occurred on our end - ${error.message}`;
  if (error instanceof TypeError) {
    errorMessage =
      "We couldn't fetch your data. This might be an issue on our end - please try again later.";
  }

  throw new Error(errorMessage);
}

export async function getUserData(taskId: string) {
  const url = `http://localhost:8000/tasks/?task_id=${taskId}`;
  try {
    const res = await fetch(url, { cache: "force-cache" });
    const rawData = await res.text();
    const data = JSON.parse(rawData);

    return data;
  } catch (error: any) {
    handleError(error);
  }
}
export async function startTask(
  username: string,
  path: UserPathType,
  site: SiteType,
): Promise<string> {
  const url = `http://localhost:8000/${path}/?username=${encodeURIComponent(username)}&site=${encodeURIComponent(site)}`;
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

export async function retrieveQueuePosition() {
  const url = `http://localhost:8000/queue_pos/?test="test"`;
  const res = await fetch(url, { cache: "no-store" });

  const rawData = await res.text();
  const data = JSON.parse(rawData);
  console.log("Queue_pos response is: ", data);

  return { queuePosition: data["queuePosition"] };
}

export async function assertUsernameInCache(username: string) {
  const url = `http://localhost:8000/recent_users/?username=${encodeURIComponent(username)}`;
  const res = await fetch(url, { cache: "no-store" });
  const rawData = await res.text();
  const data = JSON.parse(rawData);
  return data["UserFound"];
}

export async function updateImageUrl(showName: string) {
  const url = `http://localhost:8000/update_img_url/`;
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
  console.log("Response is: ", data);
}

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
