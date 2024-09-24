import updateCookie from "@/app/actions/updateCookie";
import { useEffect } from "react";

export function useUpdateRouteCookies(currentRoute?: string) {
  let routes = ["affinity", "recs", "seasonal"];
  useEffect(() => {
    if (currentRoute) {
      localStorage.setItem(currentRoute, "true");
    }
    for (let route of routes) {
      let clientRouteCookie = localStorage.getItem(route);
      if (clientRouteCookie) {
        updateCookie(route, "true", true);
      }
    }
  }, []);
}
