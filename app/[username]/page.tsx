// /[username] is not an actual page for now, might add general user analytics in the future
// and put it here.

"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push(`/home`);
  }, []);

  return <></>;
}
