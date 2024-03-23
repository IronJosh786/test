import React from "react";
import { Outlet } from "react-router-dom";
import Login from "../pages/Login";

function Auth() {
  let userData = null;
  try {
    userData = JSON.parse(localStorage.getItem("userData"));
  } catch (error) {
    console.error("Error parsing userData from localStorage:", error);
  }

  setTimeout(() => {
    const token = userData?.token || "";
    if (!token) {
      return <Login />;
    }
    return <Outlet />;
  }, 1000);
}

export default Auth;
