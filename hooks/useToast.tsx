import { ToastPosition, toast } from "react-hot-toast";

function useToast() {
  function notifyError(message: string, position?: ToastPosition) {
    toast.error(message, {
      duration: 5000,
      position: position ? position : "top-center",
      style: {
        backgroundColor: "#ff0055",
        color: "white",
        fontSize: "1.2rem",
      },
    });
  }

  function notifySuccess(message: string, position?: ToastPosition) {
    toast.success(message, {
      duration: 5000,
      position: position ? position : "top-center",
      style: {
        backgroundColor: "#22ff55",
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