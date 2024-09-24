import React, { SetStateAction, useEffect } from "react";

export default function useSetFromClientCookie(
  setter: React.Dispatch<SetStateAction<any>>,
  cookieName: string,
  cookieCheckerFunction: (cookieValue: string) => boolean = () => true,
  extraConditions: boolean = true,
) {
  useEffect(() => {
    const cookieValue = localStorage.getItem(cookieName);
    if (cookieValue && extraConditions && cookieCheckerFunction(cookieValue)) {
      setter(cookieValue);
    }
  }, [setter, cookieName]);
}
