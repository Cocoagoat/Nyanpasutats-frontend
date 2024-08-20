import React, { SetStateAction, useEffect } from "react";

export default function useSetFromCookie(
  setter: React.Dispatch<SetStateAction<any>>,
  cookieName: string,
) {
  useEffect(() => {
    const cookieValue = localStorage.getItem(cookieName);
    if (cookieValue) {
      setter(cookieValue);
    }
  }, [setter, cookieName]);
}
