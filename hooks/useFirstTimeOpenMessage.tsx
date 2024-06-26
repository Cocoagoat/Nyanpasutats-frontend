import { useEffect } from "react";
import useToast from "./useToast";
import { ToastPosition } from "react-hot-toast";

const { notifySuccess } = useToast();
export default function useFirstTimeOpenMessage(
  isOpen: boolean,
  cookieName: string,
  message: string,
  duration?: number,
  toastPosition?: ToastPosition,
) {
  useEffect(() => {
    if (isOpen && sessionStorage.getItem(cookieName) === null) {
      notifySuccess(message, toastPosition, duration ?? 30000);
      sessionStorage.setItem(cookieName, "true");
    }
  }, [notifySuccess, isOpen]);
}
