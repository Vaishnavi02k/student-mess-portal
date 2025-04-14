import React from "react";
import { Navigate, Outlet, useParams } from "react-router-dom";

const PrivateRoute = () => {
  const username = localStorage.getItem("username");
  const { username: routeUsername } = useParams();

  // Check if user is logged in and route param matches
  return username !== "nouser" && username === routeUsername ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace /> //Login page
  );
};

export default PrivateRoute;
