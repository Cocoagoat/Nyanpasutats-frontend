"use server";

import { redirect } from "next/navigation";

export async function navigate(data: FormData) {
  console.log(555555);
  console.log(data);
  redirect(`${data.get("path")}`);
}
