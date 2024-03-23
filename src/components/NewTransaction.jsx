import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../fetchData.js";
import { useParams } from "react-router-dom";
import { base } from "../../constant.js";

function NewTransaction() {
  const { givenUserName } = useParams() || "";

  const [details, setDetails] = useState({
    username: givenUserName,
    amount: 0,
    message: "",
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  axios.defaults.withCredentials = true;
  const token = userData?.token;
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const transactionDetails = {
      to: details.username,
      amount: details.amount,
      message: details.message,
    };

    try {
      const response = await axios.post(
        `${base}/api/v2/transactions/new-transaction`,
        transactionDetails
      );
      if (response.data.data) setSuccess(response.data.data);
      await fetchData(dispatch, userData);
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
    <div className="col-span-8 px-8 lg:px-0">
      <h4 className="font-h4">New Transaction</h4>
      <form
        onSubmit={handleSubmit}
        className="my-4 flex flex-col border-2 border-gray rounded-md p-4 gap-4"
      >
        <label htmlFor="username" className="font-base font-medium">
          Username<span className="text-sent">*</span>
        </label>
        <input
          id="username"
          type="text"
          value={details.username}
          onChange={handleChange}
          className="px-4 py-2 leading-4 font-sm rounded-md border border-gray dark:bg-bg_dark"
        />
        <label htmlFor="amount" className="font-base font-medium">
          Amount<span className="text-sent">*</span>
        </label>
        <input
          id="amount"
          type="number"
          onChange={handleChange}
          className="px-4 py-2 leading-4 font-sm rounded-md border border-gray dark:bg-bg_dark"
        />
        <label htmlFor="message" className="font-base font-medium">
          Message<span className="text-sent">*</span>
        </label>
        <textarea
          id="message"
          cols="20"
          rows="1"
          onChange={handleChange}
          className="px-4 py-2 leading-4 font-sm border border-gray rounded-md resize-none dark:bg-bg_dark"
        ></textarea>
        <button
          className="p-2 rounded-md font-sm text-white bg-primary_dark dark:bg-primary_light hover:bg-primary_light dark:hover:bg-primary_dark"
          type="submit"
        >
          Send <i className="ri-send-plane-2-fill"></i>
        </button>
        <div className="text-center lg:hidden">
          Balance: $ {userData.balance}
        </div>
        {error && (
          <div className="font-sm text-center mt-8 text-sent">{error}</div>
        )}
        {success && (
          <div className="font-sm text-center mt-8 text-received">
            {success}
          </div>
        )}
      </form>
    </div>
  );
}

export default NewTransaction;
