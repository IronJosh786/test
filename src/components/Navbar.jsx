import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../features/darkModeSlice.js";
import "../App.css";
import { NavLink, useNavigate } from "react-router-dom";
import { setData } from "../features/userSlice.js";
import axios from "axios";

function Navbar() {
  const { isDarkMode } = useSelector((state) => state.darkMode);
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const navigate = useNavigate();

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  const handleLogout = async () => {
    const response = await axios.post("/api/v2/users/logout");
    if (response.data.success) {
      dispatch(setData(null));
      navigate("/login");
    }
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <div className="relative flex justify-between items-center px-8 py-1 mb-4 shadow-md shadow-gray">
      <NavLink to={"/"} className="font-h2 cursor-pointer">
        <i className="ri-exchange-dollar-line"></i>
      </NavLink>
      <div className="flex gap-8">
        <button
          onClick={handleToggleTheme}
          className="font-semibold cursor-pointer"
        >
          {isDarkMode ? (
            <i className="ri-sun-line font-h6"></i>
          ) : (
            <i className="ri-moon-line font-h6"></i>
          )}
        </button>
        {userData ? (
          <button
            onClick={() => {
              setIsMobileNavOpen(!isMobileNavOpen);
            }}
          >
            <i className="ri-menu-line font-h6 lg:hidden"></i>
            <div
              className={`absolute top-full right-8 z-10 ${
                isMobileNavOpen ? "block" : "hidden"
              } border-2 border-gray rounded-md bg-bg_light dark:bg-bg_dark lg:hidden`}
            >
              <ul className="flex flex-col gap-4 px-4 py-4">
                <li className="font-sm">
                  <NavLink to={"/"}>All Users</NavLink>
                </li>
                <li className="font-sm">
                  <NavLink to={"/new-transaction"}>New Transaction</NavLink>
                </li>
                <li className="font-sm">
                  <NavLink to={"/all-transactions"}>All Transactions</NavLink>
                </li>
                <li className="font-sm">
                  <NavLink to={"/profile"}>My Profile</NavLink>
                </li>
                <li className="font-sm">
                  <div onClick={handleLogout}>Logout</div>
                </li>
              </ul>
            </div>
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Navbar;
