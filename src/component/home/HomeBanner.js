import React from "react";
import Button from "../button/Button";
//from-[#B7F8DB] to-[#50A7C2]
const HomeBanner = () => {
  return (
    <div className="bg-gradient-to-br  from-[#414141] to-[#000000] min-h-[520px] ">
      <div className="main h-full flex items-center py-[45px] pr-[80px] justify-between">
        <div className="banner-content max-w-[500px] text-[#fff]">
          <h1 className="text-[38px] font-bold">Lion Football Blogs</h1>
          <p className="my-[25px] text-[18px]">
            A place to connect football passions, writing and sharing will be
            questions your story here!
          </p>
          <Button
            type="button"
            to="/add-post"
            className="w-[200px] bg-[#fff] text-primary text-[16px] font-[600] py-4 rounded-sm cursor-pointer inline hover:bg-opacity-[0.8] transition-all"
          >
            Write new post
          </Button>
        </div>
        <div className="banner-img ">
          <img
            src="https://o.remove.bg/downloads/bd3f1139-3119-4c26-af64-2213b04d1c7c/banner_tran-removebg-preview.png"
            alt=""
            className="object-cover min-w-[450px]"
          />
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;
