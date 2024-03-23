import React from "react";
import { Outlet } from "react-router-dom";
import Login from "../pages/Login";
import { useSelector } from "react-redux";

function Auth() {
  const { userData } = useSelector((state) => state.user);

  const token =
    userData?.token || JSON.parse(localStorage.getItem("userData")) || "";
  if (!token) {
    return <Login />;
  }
  return <Outlet />;
}

export default Auth;
