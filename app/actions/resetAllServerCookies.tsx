"use server";
import { cookies } from "next/headers";

export default async function resetAllServerCookies() {
  cookies().delete("affinity");
  cookies().delete("recs");
  cookies().delete("seasonal");
  cookies().delete("username");
}
