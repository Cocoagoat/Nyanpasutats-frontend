import { useRef } from "react";
import useOutsideClick from "./useOutsideClick";

export function useCloseOnOutsideClick<T extends HTMLElement>(
  isOpen: boolean,
  onClick: () => void,
) {
  const ref = useRef<T>(null);

  function onOutsideClick() {
    if (isOpen) onClick();
  }

  useOutsideClick(ref, onOutsideClick);

  return ref;
}
