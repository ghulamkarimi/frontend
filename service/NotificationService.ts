import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const NotificationService = {
  success(message: string) {
    toast.success(message, {
      position: "top-left",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    });
  },
  error(message: string) {
    toast.error(message, {
      position: "top-left",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    });
  },
};


 