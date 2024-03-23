import React from "react";
import { Outlet } from "react-router-dom";
import Login from "../pages/Login";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";

function Auth() {
  // const token = Cookies.get("accessToken");
  // const token = sessionStorage.getItem("accessToken");
  // const token = localStorage.getItem("accessToken");
  const { userData } = useSelector((state) => state.user);
  const token = userData?.token || "";
  if (!token.trim()) {
    return <Login />;
  }
  return <Outlet />;
}

export default Auth;
