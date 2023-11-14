import React, { useEffect } from "react";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import UserContext from "../context/userContext";
import { useContext } from "react";

const useRefreshSession = () => {
  const { getSession, setSession } = useContext(UserContext);
  const [userSession, setUserSession] = useState();

  useEffect(() => {
    const fetch_session = async () => {
      try {
        const result = await getSession();
        const { jwtToken, payload } = result.accessToken;

        setSession((prev) => ({
          ...prev,
          accessToken: jwtToken,
          current_user: payload.username,
        }));
      } catch (err) {
        console.log(err);
      }
    };
    fetch_session();
  }, []);

  return <Outlet />;
};

export default useRefreshSession;
