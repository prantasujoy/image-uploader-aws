import React from "react";
import { toast } from "react-toastify";

const useToast = () => {
  const showToast = ({ message, options = {}, type = null }) => {
    const toast_options = {
      position: options.position || "top-center",
      autoClose: options.autoClose || 2000,
      hideProgressBar: options.hideProgressBar || false,
      ...options,
    };
    switch (type) {
      case "success":
        toast.success(message, toast_options);
        break;

      case "error":
        toast.error(message, toast_options);
        break;

      case "warning":
        toast.warning(message, toast_options);
        break;
      default:
        toast(message, toast_options);
    }
  };

  return showToast;
};

export default useToast;
