import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect } from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/auth-context";
import { db } from "../../firebaseApp/firebaseConfig";
import Button from "../button/Button";

const DashboardHeader = ({ to }) => {
  const { userInfo } = useAuth();
  const userEmail = userInfo?.email;
  const [avatar, setAvatar] = useState("");
  useEffect(() => {
    async function fetch() {
      const q = query(collection(db, "users"), where("email", "==", userEmail));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setAvatar(doc.data().avatar);
      });
    }
    fetch();
  }, [userEmail]);

  return (
    <div className="bg-[#fff] py-5 px-7 flex justify-between border-b border-solid border-[#eee]">
      <NavLink to={"/"}>
        <div className="sidebar-logo flex items-center font-[600] mb-5 pt-5 pr-5 gap-x-5">
          <img
            srcSet="/football_tran.png"
            className="w-[75px] rounded-full"
            alt="football logo"
          />
          <h3 className="text-[20px] text-[#808191]">Lion Football Blogs</h3>
        </div>
      </NavLink>
      <div className="flex gap-5 p-5">
        <NavLink to={"/manage/add-post"} className="block">
          <Button
            type="button"
            className="w-full text-[#fff] font-bold text-[18px] bg-gradient-to-br from-[#00A7B4] to-[#A4D96C] p-[15px] rounded-lg hover:cursor-pointer
              disabled:opacity-[0.5] max-w-[300px]"
          >
            Write new post
          </Button>
        </NavLink>
        <div className="header-avatar w-[52px] h-[52px]">
          <img
            className="h-full w-full object-cover rounded-full"
            src={avatar || ""}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
