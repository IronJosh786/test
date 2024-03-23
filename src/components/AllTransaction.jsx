import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Login from "../pages/Login";
import { base } from "../../constant.js";

function AllTransaction() {
  const { userData } = useSelector((state) => state.user);

  const [allTransaction, setallTransaction] = useState([]);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  axios.defaults.withCredentials = true;
  const token = userData?.token;
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  useEffect(() => {
    const fetchAllTransactions = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${base}/api/v2/users/get-transaction-history`
        );
        if (response.data.success) setSuccess(response.data.data);
        setallTransaction(response.data.message.transactionHistory);
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
    fetchAllTransactions();
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

  const transactionTemplate = (entry) => {
    let date = entry.createdAt;
    date = new Date(date);
    const timestamp = date.toLocaleString();

    return (
      <div
        key={entry._id}
        className="bg-primary_light dark:bg-primary_dark text-white rounded-md border-gray p-2 flex flex-col justify-center items-center text-center gap-4 mb-8"
      >
        <div className="flex items-center gap-4">
          <div className="flex flex-col gap-4 items-center">
            <img
              className="h-12 w-12 object-cover rounded-full"
              src={entry.participantsDetails.senderProfilePicture}
              alt="sender profile picture"
            />
            <p className="font-sm font-semibold">
              {entry.participantsDetails.senderUsername}
            </p>
          </div>
          <i className="ri-arrow-right-line font-h5"></i>
          <div className="flex flex-col gap-4 items-center">
            <img
              className="h-12 w-12 object-cover rounded-full"
              src={entry.participantsDetails.receiverProfilePicture}
              alt="receiver profile picture"
            />
            <p className="font-sm font-semibold">
              {entry.participantsDetails.receiverUsername}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <p
            className={`font-bold font-base bg-primary_dark dark:bg-primary_light p-2 rounded-md ${
              entry.from === userData._id
                ? "text-red-900 dark:text-red-500"
                : " text-green-500"
            }`}
          >
            $ {entry.amount}
          </p>
          <p className="font-sm">{entry.message || "No Message"}</p>
        </div>
        <div className="text-xs">{timestamp}</div>
      </div>
    );
  };

  return (
    <div className={`col-span-8 px-8 lg:px-0`}>
      <h4 className="font-h4">All Transactions</h4>
      <div className="my-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {loading ? (
          <div className="font-sm text-center mt-4 text-gray">
            Processing...
          </div>
        ) : (
          allTransaction.length === 0 && (
            <div className="font-sm text-center mt-4 text-gray">
              No transaction to show
            </div>
          )
        )}
        {allTransaction.map((singleTransaction) =>
          transactionTemplate(singleTransaction)
        )}
      </div>
    </div>
  );
}

export default AllTransaction;
