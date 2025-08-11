// src/components/CustomToast.js
import { toast } from "react-toastify";

export const showErrorToast = (message) => {
  toast.error(message, {
    position: "bottom-right",
    autoClose: 4000,
    theme: "dark",
    style: { zIndex: 9999 },
  });
};

export const showSuccessToast = (message) => {
  toast.success(message, {
    position: "bottom-right",
    autoClose: 4000,
    theme: "dark",
    style: { zIndex: 9999 },
  });
};
