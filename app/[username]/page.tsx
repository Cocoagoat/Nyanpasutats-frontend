"use client";

import { useState, useEffect } from "react";
import RedirectBox from "@/app/home/RedirectBox";
import { redirectBoxContent } from "@/app/home/RedirectBoxContent";
import { useRouter } from "next/navigation";
import ResetUsername from "../home/ResetUsername";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push(`/home`);
  }, []);

  return <></>;
}
