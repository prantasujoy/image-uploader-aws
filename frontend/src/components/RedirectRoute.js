import React from "react";
import UserContext from "../context/userContext";
import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const RedirectRoute = () => {
  const { session } = useContext(UserContext);
  const { current_user } = session;
  const location = useLocation();

  return !current_user ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default RedirectRoute;
