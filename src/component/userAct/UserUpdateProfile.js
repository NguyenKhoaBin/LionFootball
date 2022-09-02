import React from "react";
import Header from "../layout/Header";
import UserProfile from "../user/UserProfile";

const UserUpdateProfile = () => {
  document.title = "Profile";
  return (
    <div className="">
      <Header></Header>
      <div className="main">
        <div className="mt-[10px] mb-[25px]  w-full  border-b border-b-[#ccc] "></div>
        <UserProfile></UserProfile>
        <div className="my-10"></div>
      </div>
    </div>
  );
};

export default UserUpdateProfile;
