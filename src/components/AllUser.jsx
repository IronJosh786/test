import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NewTransaction from "./NewTransaction";

function AllUser() {
  const [allUser, setAllUser] = useState([]);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSend = (givenUsername) => {
    navigate(`/new-transaction/${givenUsername}`);
  };

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await axios.get("/api/v2/users/get-all-users");
        if (response.data.success) setSuccess(response.data.data);
        setAllUser(response.data.message);
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
    fetchAllUsers();
  }, []);

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
    <div className={`col-span-8 px-8 lg:px-0`}>
      <h4 className="font-h4">All Users</h4>
      <div className="my-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-white">
        {allUser.map((singleUser) => (
          <div
            key={singleUser._id}
            className="bg-primary_light dark:bg-primary_dark flex flex-row items-center justify-between sm:flex-col sm:items-start gap-4 rounded-md p-2"
          >
            <div className="flex flex-col xs:flex-row xs:items-center gap-4">
              <div>
                <img
                  src={singleUser.profilePicture}
                  alt="profile picture of user"
                  className="h-12 w-12 object-cover rounded-full"
                />
              </div>
              <div className="flex flex-col">
                <p className="font-sm font-medium">{singleUser.username}</p>
                <p className="font-base capitalize">{singleUser.fullName}</p>
              </div>
            </div>
            <div>
              <button
                onClick={() => handleSend(singleUser.username)}
                className="border-2 border-gray p-1 rounded-md font-sm text-white bg-primary_dark dark:bg-primary_light hover:bg-primary_light dark:hover:bg-primary_dark"
              >
                Send <i className="ri-send-plane-2-fill"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllUser;
