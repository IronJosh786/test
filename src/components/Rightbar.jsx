import React from "react";
import { useSelector } from "react-redux";

function Rightbar() {
  const { userData } = useSelector((state) => state.user);

  return (
    <div className={`col-span-2 px-8 hidden lg:flex flex-col rounded-md`}>
      <h4 className="font-h4">Profile</h4>
      <div className="bg-primary_light dark:bg-primary_dark text-white my-4 rounded-md flex flex-col justify-center gap-2">
        <div className="">
          <img
            src={userData.profilePictureUrl}
            alt="profile picture"
            className="rounded-md object-cover"
          />
        </div>
        <div className="px-4 font-sm font-semibold">{userData.username}</div>
        <div className="px-4 text-xs uppercase hidden xl:block">
          {userData.fullName}
        </div>
        <div className="px-4 py-2 font-sm mb-4 font-bold bg-primary_dark dark:bg-primary_light">
          $ {userData.balance}
        </div>
      </div>
    </div>
  );
}

export default Rightbar;
