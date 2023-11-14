import axiosClient from "../config/axios";

import { useEffect, useState } from "react";

import { useContext } from "react";
import UserContext from "../context/userContext";
import useToast from "./useToast";

const UseQuery = ({ url, refetch }) => {
  const { session } = useContext(UserContext);
  const showToast = useToast();

  const [state, setState] = useState({
    data: [],
    loading: false,
    success: false,
    error: "",
  });

  useEffect(() => {
    setState((prev) => ({
      ...prev,
      data: [],
      loading: true,
      success: false,
      error: "",
    }));

    axiosClient
      .get(url, {
        headers: { Authorization: `Bearer ${session.accessToken}` },
      })

      .then((response) => {
        console.log({ response });
        setState((prev) => ({
          ...prev,
          data: response.data.presignedUrls,
          loading: false,
          success: true,
          error: "",
        }));
      })

      .catch((error) => {
        setState((prev) => ({
          ...prev,
          data: [],
          loading: false,
          success: false,
          error: error.message,
        }));

        showToast({ message: error, type: "error" });
      });
  }, [url, refetch]);

  return { ...state };
};

export default UseQuery;
