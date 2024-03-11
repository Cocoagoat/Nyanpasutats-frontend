import { revalidatePath } from "next/cache";
import { ShowPathType, TaskReturnType, UserPathType } from "../interfaces";

function handleError(error: Error) {
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
    // console.log("Before fetch");
    const res = await fetch(url, { cache: "force-cache" });
    // console.log("Task_id response is: ", res);
    const rawData = await res.text();
    const data = JSON.parse(rawData);
    return data;
  } catch (error: any) {
    console.log("Caught error in getUserData", error);
    handleError(error);
  }
}
export async function startTask(
  username: string,
  path: UserPathType,
): Promise<string> {
  const url = `http://localhost:8000/${path}/?username=${encodeURIComponent(username)}`;
  try {
    console.log("Before fetch");
    // revalidatePath(url);
    const res = await fetch(url, { next: { revalidate: 3600 } });
    // console.log("Task_id response is: ", res);

    const rawData = await res.text();
    const data = JSON.parse(rawData);

    console.log("Task ID is : ", data["taskId"]);
    return data["taskId"];

    // switch (path) {
    //   case "recs":
    //     return [data["Recommendations"], data["RecommendationsNoWatched"]];
    //   case "affinity":
    //     return [data["PositiveAffs"], data["NegativeAffs"]];
    //   case "seasonal":
    //     return [data["Stats"], data["StatsNoSequels"]];
    // }
  } catch (error: any) {
    console.log("Caught error in startTask", error);
    handleError(error);
  }
  return ""; // This line is unreachable, but TypeScript requires it
}

export async function retrieveTaskData(taskId: string) {
  let taskStatus = "pending";
  let data = [];
  let error = "";
  // let count = 0;
  try {
    const taskData = await getUserData(taskId);
    if (taskData.status === "error") {
      console.log("Supposed to throw error here");
      throw new Error(taskData.data);
    }
    data = taskData["data"];
    console.log("Test", taskData);

    return data;
  } catch (err) {
    console.log("Caught error in retrieveTaskData", err);
    error = (err as Error).message;
    throw new Error(error);
  }
}
//   while (taskStatus === "pending") {
//     try {
//       const taskData = await getUserData(taskId);
//       taskStatus = taskData["status"];
//       if (taskStatus === "pending") {
//         console.log("Task is pending");
//         count += 1;
//         if (count > 100) {
//           // Increase this later
//           throw new Error("Task is taking too long");
//         }
//       } else {
//         data = taskData["data"];
//         break;
//       }
//     } catch (err) {
//       error = (err as Error).message;
//       throw new Error(error);
//       // set timeout here
//     } finally {
//       await new Promise((resolve) => setTimeout(resolve, 200));
//     }
//   }
//   return data;
// }

export async function retrieveTaskData2(taskId: string) {
  let taskStatus = "pending";
  let data = [];
  let error = "";
  let count = 0;
  while (taskStatus === "pending") {
    try {
      const taskData = await getUserData(taskId);
      taskStatus = taskData["status"];
      if (taskStatus === "pending") {
        console.log("Task is pending");
        count += 1;
        if (count > 100) {
          // Increase this later
          throw new Error("Task is taking too long");
        }
      } else {
        data = taskData["data"];
        break;
      }
    } catch (err) {
      error = (err as Error).message;
      throw new Error(error);
      // set timeout here
    } finally {
      await new Promise((resolve) => setTimeout(resolve, 200));
    }
  }
  return data;
}

export async function retrieveQueuePosition() {
  let queuePosition = null;
  const url = `http://localhost:8000/queue_pos/`;
  const res = await fetch(url, { cache: "no-store" });

  const rawData = await res.text();
  const data = JSON.parse(rawData);
  console.log("Queue_pos response is: ", data);

  return { queuePosition: data["queuePosition"] };
}

export async function assertUsernameInCache(username: string) {
  const url = `http://localhost:8000/recent_users/?username=${encodeURIComponent(username)}`;
  const res = await fetch(url, { next: { revalidate: 300 } });
  const rawData = await res.text();
  const data = JSON.parse(rawData);
  console.log("Username is : ", username);
  console.log("Response is : ", data);
  // turn this into a function
  return data["UserFound"];
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
