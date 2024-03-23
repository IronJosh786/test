import React, { useState } from "react";
import axios from "axios";
import "../App.css";
import { setData } from "../features/userSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { base } from "../../constant.js";
import Footer from "../components/Footer.jsx";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    emailOrUsername: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const { userData } = useSelector((state) => state.user);

  axios.defaults.withCredentials = true;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    const data = {
      username: formData.emailOrUsername,
      password: formData.password,
    };

    try {
      const response = await axios.post(`${base}/api/v2/users/login`, data);
      if (response.data.success) setSuccess(response.data.data);
      const userDetails = {
        _id: response.data.message.user._id,
        fullName: response.data.message.user.fullName,
        username: response.data.message.user.username,
        email: response.data.message.user.email,
        profilePictureUrl: response.data.message.user.profilePicture,
        balance: response.data.message.user.balance,
        token: response.data.message.accessToken,
      };
      dispatch(setData(userDetails));
      navigate("/");
    } catch (error) {
      if (error.response) {
        // Server responded with an error
        const errorMessage = extractErrorMessage(error.response.data);
        setError(errorMessage);
      } else if (error.request) {
        // The request was made but no response was received
        setError("No response from server. Please try again later.");
      } else {
        // Something happened in setting up the request that triggered an error
        setError("An error occurred. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  const extractErrorMessage = (htmlString) => {
    const regex = /<pre>(.*?)<br>/s;
    const match = htmlString.match(regex);
    if (match) {
      return match[1];
    } else {
      const message = "Error message not found";
      return message;
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row gap-8 md:gap-0 mt-12 md:mt-0 justify-center items-center">
        <div className="w-full md:w-1/2 text-center font-h2 font-bold">
          Money Transfer
        </div>
        <div className="w-full md:w-1/2">
          <div className="max-w-[380px] mx-auto flex flex-col justify-center gap-4 p-4 rounded-md shadow-md drop-shadow-md dark:shadow-gray">
            <h2 className="font-h3 mb-4 font-semibold">Login</h2>
            <form onSubmit={handleSubmit} className="flex flex-col">
              <label
                htmlFor="emailOrUsername"
                className="font-base font-medium"
              >
                Username<span className="text-sent">*</span>
              </label>
              <input
                id="emailOrUsername"
                type="text"
                onChange={handleChange}
                className="mt-2 px-4 py-1 leading-4 font-sm rounded-md border border-gray dark:bg-bg_dark"
              />
              <label htmlFor="password" className="mt-4 font-base font-medium">
                Password<span className="text-sent">*</span>
              </label>
              <input
                id="password"
                type="password"
                onChange={handleChange}
                className="mt-2 px-4 py-1 leading-4 font-sm rounded-md border border-gray dark:bg-bg_dark"
              />
              {loading && (
                <div className="font-sm text-center mt-4 text-gray">
                  Processing...
                </div>
              )}
              {error && (
                <div className="font-sm text-center mt-4 text-sent">
                  {error}
                </div>
              )}
              {success && (
                <div className="font-sm text-center mt-4 text-received">
                  {success}
                </div>
              )}
              <button
                className="py-1 font-h6 mt-8 font-medium rounded-md bg-primary_dark text-white hover:bg-primary_light"
                type="submit"
              >
                Login
              </button>
              <p className="mt-2 font-sm text-center">
                Don't have an account?{" "}
                <NavLink to={"/register"}>
                  <span className="font-bold cursor-pointer">Register</span>
                </NavLink>
              </p>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Login;
