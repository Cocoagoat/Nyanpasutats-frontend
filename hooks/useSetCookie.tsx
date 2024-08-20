import { useEffect } from "react";

export default function useSetCookie(
  cookieName: string,
  cookieValue: string,
  dependencies: any[],
  condition: boolean = true,
) {
  useEffect(() => {
    if (condition) {
      sessionStorage.setItem(cookieName, cookieValue);
    }
  }, dependencies);
}
