import React from "react";
const socials = [
  {
    name: "facebook",
    url: "https://cdn-icons-png.flaticon.com/128/20/20673.png",
  },
  {
    name: "instagram",
    url: "https://cdn-icons-png.flaticon.com/128/1384/1384015.png",
  },
  {
    name: "twitter",
    url: "https://cdn-icons-png.flaticon.com/128/2168/2168336.png",
  },
];
const Footer = () => {
  return (
    <div className="bg-gradient-to-br from-[#fdfbfb] to-[#ebedee] pt-10 pb-5 w-full">
      <div className="flex items-center justify-center ">
        <img
          src="https://o.remove.bg/downloads/54af4348-a2f9-47c2-b154-d0cf47e8e23e/football_tran-removebg-preview.png"
          alt="logo"
          className="max-w-[75px] object-cover"
        />
        <h3 className="text-[28px]">Lion Football Blogs</h3>
      </div>
      <div className="flex items-center mb-10 justify-evenly">
        <div className="flex flex-col items-center justify-center">
          <p className="font-bold text-[20px]">Follow Us</p>
          <div className="flex items-center gap-3 justify-evenly">
            {socials.map((item) => (
              <span key={item.url}>
                <a href="https://www.facebook.com/nguyen.bin.796569">
                  <img
                    src={item.url}
                    className="hover:cursor-pointer hover:translate-y-1 w-full max-w-[20px]"
                    alt={item.name}
                  />
                </a>
              </span>
            ))}
          </div>
        </div>
        <div className="items-center ">
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
