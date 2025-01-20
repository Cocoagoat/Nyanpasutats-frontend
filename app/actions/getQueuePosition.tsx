"use server"

import { sanitizeError } from "@/utils/sanitizeError";

export async function retrieveQueuePosition(
    type: "affs" | "recs" | "seasonal",
  ) {
    "use server"
    const url = `https://nps.moe/api/queue_pos/?type=${type}&random=${Math.random()}`;
    // Random is added because next.js doesn't seem to care about the cache: "no-store" option
    try{
    const res = await fetch(url, { cache: "no-store" });
    const rawData = await res.text();
    const data = JSON.parse(rawData);
    return { queuePosition: data["queuePosition"] };} 
    catch(error: any){
        return { error: sanitizeError(error.message) }
    }
  }
