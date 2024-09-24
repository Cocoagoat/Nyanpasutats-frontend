"use client";
import { useUpdateRouteCookies } from "@/hooks/useUpdateRouteCookies";
import React from "react";
// This client component solely exists to update server-side cookies
// from the client side.
// The arrows in AffCurrentShared being locked/unlocked depends on said cookies.

// Remember to test removing useUpdateRouteCookies from other components later
// since they might no longer be necessary thanks to this dummy component.
export default function AffCookieUpdateDummyComponent() {
  useUpdateRouteCookies("affinity");
  return <p></p>;
}
