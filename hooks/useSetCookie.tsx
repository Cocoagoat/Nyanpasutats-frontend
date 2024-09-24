import { useEffect } from "react";

export default function useSetCookie(
  cookieName: string,
  cookieValue: string,
  dependencies: any[],
  condition: boolean = true,
  storageType: "local" | "session" = "local",
) {
  useEffect(() => {
    let storage = storageType === "local" ? localStorage : sessionStorage;
    if (condition) {
      storage.setItem(cookieName, cookieValue);
    }
  }, dependencies);
}
