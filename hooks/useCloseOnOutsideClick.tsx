import React, { useRef } from "react";
import useOutsideClick from "./useOutsideClick";

export function useCloseOnOutsideClick<T extends HTMLElement>(
  isOpen: boolean,
  setIsOpen: (isOpen: boolean) => void
) {
  const ref = useRef<T>(null);

  function onOutsideClick() {
    if (isOpen) setIsOpen(false);
  }

  useOutsideClick(ref, onOutsideClick);

  return ref;
}
