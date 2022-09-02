import React from "react";
const socials = [
  { name: "facebook", url: "./facebook.png" },
  { name: "instagram", url: "./insta.png" },
  { name: "twitter", url: "./twitter.png" },
];
const Footer = () => {
  return (
    <div className="bg-gradient-to-br from-[#fdfbfb] to-[#ebedee] pt-10 pb-5 w-full">
      <div className=" flex items-center justify-center">
        <img
          src="./football_tran.png"
          alt="football_logo"
          className="w-[75px] object-cover"
        />
        <h3 className="text-[28px]">Lion Football Blogs</h3>
      </div>
      <div className="mb-10 flex items-center justify-evenly">
        <div className="flex flex-col items-center justify-center">
          <p className="font-bold text-[20px]">Follow Us</p>
          <div className="flex items-center gap-3 justify-evenly">
            {socials.map((item) => (
              <span key={item.url}>
                <a href="https://www.facebook.com/nguyen.bin.796569">
                  <img
                    src={item.url}
                    className="hover:cursor-pointer hover:translate-y-1"
                    alt={item.name}
                  />
                </a>
              </span>
            ))}
          </div>
        </div>
        <div className=" items-center">
          <p className="font-bold text-[20px]">Call Us</p>
          <span>0981808888</span>
        </div>
      </div>
      <div className="mt-[10px] mb-[25px]  w-full  border-b border-b-[#333] "></div>
      <p className="text-center">
        Copyright © 2022 Nguyễn Khoa Bin / All rights reserved /Privacy
      </p>
    </div>
  );
};

export default Footer;
