import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../fetchData.js";
import axios from "axios";

function Profile() {
  const dispatch = useDispatch();

  const { userData } = useSelector((state) => state.user);
  const [details, setDetails] = useState({
    currentPassword: "",
    newPassword: "",
  });
  const [image, setImage] = useState();
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [imageError, setImageError] = useState("");
  const [imageSuccess, setImageSuccess] = useState("");

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.id]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleImageChange = async () => {
    setImageError(null);
    setImageSuccess(null);
    setLoading(true);

    if (!image) {
      setImageError("Image is required");
      return;
    }

    const formData = new FormData();
    formData.append("profilePicture", image);

    try {
      const response = await axios.patch(
        "/api/v2/users/update-profilePicture",
        formData
      );

      if (response.data.success) {
        setImageSuccess("Image updated");
      }
      await fetchData(dispatch);
      setImage(null);
    } catch (error) {
      setLoading(false);
      if (error.response) {
        // Server responded with an error
        const errorMessage = extractErrorMessage(error.response.data);
        setImageError(errorMessage);
      } else if (error.request) {
        // The request was made but no response was received
        setImageError("No response from server. Please try again later.");
      } else {
        // Something happened in setting up the request that triggered an error
        setImageError("An error occurred. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    setError(null);
    setSuccess(null);
    const data = {
      oldPassword: details.currentPassword,
      newPassword: details.newPassword,
    };
    try {
      const response = await axios.post("/api/v2/users/change-password", data);
      if (response.data.success) {
        setSuccess("Password updated");
      }
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
    }
  };

  const extractErrorMessage = (htmlString) => {
    const regex = /<pre>(.*?)(?=<\s*\/pre|\s*<br>)/s;
    const match = htmlString.match(regex);
    if (match) {
      return match[1];
    } else {
      const message = "Error message not found";
      return message;
    }
  };

  return (
    <div className={`col-span-8 px-8 lg-px-0`}>
      <h4 className="font-h4">Profile</h4>
      <div className="my-4 flex flex-col items-center md:items-start text-center md:flex-row gap-4 md:justify-between font-sm bg-primary_light dark:bg-primary_dark rounded-md p-2 text-white">
        <div className="flex flex-col gap-4 items-center justify-center">
          <img
            src={userData.profilePictureUrl}
            alt="user profile picture"
            className="h-32 w-32 rounded-full object-cover"
          />
          <label
            htmlFor="profilePicture"
            className="bg-[#2372f3] p-1 rounded-md cursor-pointer"
          >
            Select Image
          </label>
          {image ? "File Selected" : ""}
          <input
            type="file"
            id="profilePicture"
            onChange={handleFileChange}
            className="max-w-[200px] hidden dark:bg-primary_dark"
          />
          <button
            onClick={handleImageChange}
            className="p-1 rounded-md font-sm text-white bg-primary_dark dark:bg-primary_light hover:bg-primary_light dark:hover:bg-primary_dark ring-primary_dark dark:hover:ring-primary_light hover:ring-2"
          >
            Change Image
          </button>
          {loading && (
            <div className="font-sm text-center mt-4 text-gray">
              Processing...
            </div>
          )}
          {imageError && (
            <div className="bg-primary_dark dark:bg-primary_light p-1 rounded-md font-sm text-center mt-4 text-red-700 dark:text-red-600">
              {imageError}
            </div>
          )}
          {imageSuccess && (
            <div className="bg-primary_dark dark:bg-primary_light p-1 rounded-md font-sm text-center mt-4 text-green-500">
              {imageSuccess}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-4">
          <div className="font-base font-semibold underline">Details</div>
          <p>
            <span className="font-semibold underline underline-offset-2">
              Username:
            </span>{" "}
            {userData.username}
          </p>
          <p>
            <span className="font-semibold underline underline-offset-2">
              Full Name:
            </span>{" "}
            {userData.fullName}
          </p>
          <p>
            <span className="font-semibold underline underline-offset-2">
              Email:
            </span>{" "}
            {userData.email}
          </p>
          <p>
            <span className="font-semibold underline underline-offset-2">
              Balance:
            </span>{" "}
            $ {userData.balance}
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <div className="font-base font-semibold underline">
            Change Password
          </div>
          <label htmlFor="currentPassword" className="font-semibold">
            Current Password
          </label>
          <input
            type="text"
            id="currentPassword"
            onChange={handleChange}
            className="max-w-[200px] p-1 font-sm text-text_light dark:text-white rounded-md border border-gray dark:bg-primary_light"
          />
          <label htmlFor="newPassword" className="font-semibold">
            New Password
          </label>
          <input
            type="text"
            id="newPassword"
            onChange={handleChange}
            className="max-w-[200px] p-1 font-sm text-text_light dark:text-white rounded-md border border-gray dark:bg-primary_light"
          />
          <button
            className="max-w-[200px] p-1 rounded-md font-sm text-white bg-primary_dark dark:bg-primary_light hover:bg-primary_light dark:hover:bg-primary_dark ring-primary_dark dark:hover:ring-primary_light hover:ring-2"
            onClick={handleChangePassword}
          >
            Confirm
          </button>
          {error && (
            <div className="bg-primary_dark dark:bg-primary_light p-1 rounded-md font-sm text-center mt-8 text-red-700 dark:text-red-600">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-primary_dark dark:bg-primary_light p-1 rounded-md font-sm text-center mt-8 text-green-500">
              {success}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
