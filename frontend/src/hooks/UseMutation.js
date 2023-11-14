import { useState } from "react";
import useToast from "./useToast";

import axiosClient from "../config/axios";

import { useContext } from "react";
import UserContext from "../context/userContext";

const UseMutation = ({ url, method = "POST" }) => {
  const { session } = useContext(UserContext);

  const showToast = useToast();

  const [loadingState, setLoadingState] = useState({
    isLoading: false,
    error: "",
    success: false,
  });

  const mutate = async (data, folder) => {
    setLoadingState((prev) => ({
      ...prev,
      isLoading: true,
      error: "",
      success: false,
    }));

    setTimeout(() => {
      axiosClient
        .post("/images", data, {
          headers: {
            "upload-folder": folder,
            Authorization: `Bearer ${session.accessToken}`,
          },
        })
        .then(() => {
          showToast("Image Upload Successful", {}, "success");
          setLoadingState((prev) => ({
            ...prev,
            isLoading: false,
            error: "",
            success: true,
          }));
        })
        .catch((error) => {
          setLoadingState((prev) => ({
            ...prev,
            isLoading: false,
            error: error,
            success: false,
          }));
        });
    }, 1000);
  };
  return { mutate, ...loadingState };
};

export default UseMutation;
