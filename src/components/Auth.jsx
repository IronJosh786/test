import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Login from "../pages/Login";

function Auth() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    let parsedUserData = null;
    try {
      parsedUserData = JSON.parse(localStorage.getItem("userData"));
    } catch (error) {
      console.error("Error parsing userData from localStorage:", error);
    }
    setUserData(parsedUserData);
  }, []); // Run only once on component mount

  if (!userData) {
    return null; // Or a loading indicator if necessary
  }

  const token = userData?.token || "";
  if (!token) {
    return <Login />;
  }
  return <Outlet />;
}

export default Auth;
