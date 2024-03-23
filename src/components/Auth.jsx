import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Login from "../pages/Login";
import { useSelector } from "react-redux";

function Auth() {
  const [data, setData] = useState(null);

  useEffect(() => {
    let parsedUserData = null;
    try {
      const { userData } = useSelector((state) => state.user);
      parsedUserData = JSON.parse(localStorage.getItem("userData")) || userData;
    } catch (error) {
      console.error("Error parsing userData from localStorage:", error);
    }
    setData(parsedUserData);
  }, []);

  if (!data) {
    return null;
  }

  const token = data?.token || "";
  if (!token) {
    return <Login />;
  }
  return <Outlet />;
}

export default Auth;
