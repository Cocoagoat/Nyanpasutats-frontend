"use server";
import React from "react";
import { cookies } from "next/headers";

export default async function updateCookie(
  cookieName: string,
  cookieValue: string,
) {
  cookies().set(cookieName, cookieValue);
}
