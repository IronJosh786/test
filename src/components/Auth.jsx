import React from "react";
import { Outlet } from "react-router-dom";
import Login from "../pages/Login";
import Cookies from "js-cookie";

function Auth() {
  const token = Cookies.get("accessToken");
  return token ? <Outlet /> : <Login />;
}

export default Auth;
