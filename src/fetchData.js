import axios from "axios";
import { setData } from "./features/userSlice.js";
import { base } from "../constant.js";

export const fetchData = async (dispatch, userData) => {
  axios.defaults.withCredentials = true;
  const token = userData?.token;
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  try {
    const response = await axios.get(`${base}/api/v2/users/current-user`);
    if (response.data.success) {
      const userDetails = {
        _id: response.data.message._id,
        fullName: response.data.message.fullName,
        username: response.data.message.username,
        email: response.data.message.email,
        profilePictureUrl: response.data.message.profilePicture,
        balance: response.data.message.balance,
        token: token,
      };
      dispatch(setData(userDetails));
    }
  } catch (error) {
    console.log("something went wrong", error.message);
  }
};
