import { ToastPosition, toast } from "react-hot-toast";

export type Notifier = (
  message: string,
  position?: ToastPosition,
  customDuration?: number,
) => void;


function useToast() {
  function notifyError(
    message: string,
    position?: ToastPosition,
    customDuration?: number,
  ) {
    toast.error(message, {
      duration: customDuration ? customDuration : 5000,
      position: position ? position : "top-center",
      style: {
        backgroundColor: "#ff0055",
        color: "white",
        fontSize: "1.2rem",
      },
    });
  }

  function notifySuccess(
    message: string,
    position?: ToastPosition,
    customDuration?: number,
  ) {
    toast.success(message, {
      duration: customDuration ? customDuration : 5000,
      position: position ? position : "top-center",
      style: {
        backgroundColor: "#65a30d",
        color: "white",
        fontSize: "1.2rem",
      },
    });
  }

  function notifyInfo(message: string, position?: ToastPosition) {
    toast(message, {
      duration: 5000,
      position: position ? position : "top-center",
      style: {
        backgroundColor: "#74ceff",
        color: "white",
        fontSize: "1.2rem",
      },
    });
  }

  return { notifyError, notifySuccess, notifyInfo };
}

export default useToast;
