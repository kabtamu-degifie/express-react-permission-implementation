import React from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { getLoggedInUser, hasPermission } from "./libs/local-storage";

function ProtectedRoute(props) {
  const location = useLocation();
  const loggedInUser = getLoggedInUser();
  let isPermitted = true;
  if (props.permissions) {
    isPermitted = hasPermission(...props.permissions);
  }

  if (loggedInUser) {
    if (!isPermitted) {
      return <Navigate to="/unauthorized" />;
    }
    return <Outlet />;
  } else {
    return <Navigate state={location.pathname} to="/login" />;
  }
}

export default ProtectedRoute;
