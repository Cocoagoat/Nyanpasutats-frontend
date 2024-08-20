import { useEffect } from "react";
import { Notifier } from "./useToast";
import { ToastPosition } from "react-hot-toast";

export function useNotify(
  notifier: Notifier,
  message: string,
  dependencies: any[] = [],
  condition: boolean,
  position?: ToastPosition,
  customDuration?: number,
) {
  useEffect(() => {
    if (condition) {
      notifier(message, undefined, customDuration ?? 5000);
    }
  }, dependencies);
}
