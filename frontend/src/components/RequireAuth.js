import React from "react";
import { Outlet, useLocation, Navigate } from "react-router-dom";

import { useContext } from "react";
import UserContext from "../context/userContext";

const RequireAuth = () => {
  const { session } = useContext(UserContext);
  const { current_user } = session;

  const location = useLocation();

  return current_user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
