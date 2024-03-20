import axios from "axios";
import { setData } from "./features/userSlice.js";

export const fetchData = async (dispatch) => {
  try {
    const response = await axios.get("/api/v2/users/current-user");
    if (response.data.success) {
      const userDetails = {
        _id: response.data.message._id,
        fullName: response.data.message.fullName,
        username: response.data.message.username,
        email: response.data.message.email,
        profilePictureUrl: response.data.message.profilePicture,
        balance: response.data.message.balance,
      };
      dispatch(setData(userDetails));
    }
  } catch (error) {
    console.log("something went wrong", error.message);
  }
};
