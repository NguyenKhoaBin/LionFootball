import React from "react";
import { NavLink } from "react-router-dom";
const Page404 = () => {
  return (
    <div className="flex items-center  flex-col mt-[100px] h-screen gap-8">
      <NavLink to={"/"}>
        <img
          src="https://github.com/NguyenKhoaBin/LionFootball/blob/gh-pages/football_tran.png?raw=true"
          alt="Lion football"
          className="h-[230px] mb-4 w-[250px]"
        />
      </NavLink>
      <h1 className="font-bold text-[20px]">...Oops! Something is missing</h1>
      <div className="flex items-center justify-center">
        <button className="bg-gradient-to-br from-[#00A7B4] to-[#A4D96C] px-7 py-3 rounded-lg text-[#fff] text-[16px] hover:cursor-pointer">
          <NavLink to={"/"}>Back to home page</NavLink>
        </button>
      </div>
    </div>
  );
};

export default Page404;
