import React from "react";
import { useSelector } from "react-redux";

function Rightbar() {
  const { userData } = useSelector((state) => state.user);

  return (
    <div className={`col-span-2 px-8 hidden lg:flex flex-col`}>
      <h4 className="font-h4">Profile</h4>
      <div className="bg-primary_light dark:bg-primary_dark text-white text-center my-4 rounded-md p-2 flex flex-col items-center justify-center gap-4">
        <div className="">
          <img
            src={userData.profilePictureUrl}
            alt="profile picture"
            className="h-20 w-20 object-cover rounded-full"
          />
        </div>
        <div className="font-sm">{userData.username}</div>
        <div className="font-base capitalize hidden xl:block">
          {userData.fullName}
        </div>
        <div className="font-bold">$ {userData.balance}</div>
      </div>
    </div>
  );
}

export default Rightbar;
