import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import NotFound from "../features/home/pages/NotFound";

const RoleRoute = ({ roles }) => {
    const user = useSelector((state) => state.auth.user);
  if (!user) return <NotFound/>;
  if (!roles.includes(user.role))
    return <NotFound />;
  return <Outlet/>;
};

export default RoleRoute;
