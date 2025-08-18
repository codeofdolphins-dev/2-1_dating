// src/components/CustomToast.js
import { toast } from "react-toastify";


  const toastVar = {
    position: "bottom-right",
    autoClose: 4000,
    theme: "dark",
    style: { zIndex: 9999 },
  }

export const showErrorToast = (message) => {
  toast.error(message, toastVar);
};

export const showSuccessToast = (message) => {
  toast.success(message, toastVar);
};

export const showWarningToast = (message) => {
  toast.warning(message, toastVar);
};

