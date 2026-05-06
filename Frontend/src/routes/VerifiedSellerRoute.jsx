import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import NotFound from "../features/home/pages/NotFound";

const VerifiedSellerRoute = () => {
  const user = useSelector((state) => state.auth.user);
  if (!user) return <NotFound />;
  if (!user.isVerified) return <Navigate to="/seller/apply" replace />;
  return <Outlet />;
};

export default VerifiedSellerRoute;
