"use server";
import { cookies } from "next/headers";

export default async function getCookie(cookieName: string) {
  "use server";
  return cookies().get(cookieName)?.value;
}
