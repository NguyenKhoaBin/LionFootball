import React from "react";
import { FaFacebook } from "react-icons/fa";
import {
  AiOutlineInstagram,
  AiOutlineTwitter,
  AiOutlineGithub,
} from "react-icons/ai";
import { Link } from "react-router-dom";

const socials = [
  {
    name: "facebook",
    icon: (
      <FaFacebook className="h-7 opacity-[.3] w-7 cursor-pointer hover:scale-105" />
    ),
  },
  {
    name: "instagram",
    icon: (
      <AiOutlineInstagram className="h-7 opacity-[.3] w-7 cursor-pointer hover:scale-105" />
    ),
  },
  {
    name: "twitter",
    icon: (
      <AiOutlineTwitter className="h-7 opacity-[.3] w-7 cursor-pointer hover:scale-105" />
    ),
  },
  {
    name: "github",
    icon: (
      <AiOutlineGithub className="h-7 opacity-[.3] w-7 cursor-pointer hover:scale-105" />
    ),
  },
];

const quickLink = [
  {
    name: "Home",
    to: "/",
  },
  {
    name: "Profile",
    to: "/userprofile",
  },
  {
    name: "Contact",
    to: "/contact",
  },
  {
    name: "Write",
    to: "/add-post",
  },
];

const Footer = () => {
  return (
    <section className="bg-[#000] text-[#EEEEEE] text-[18px]">
      <div className="max-w-screen-xl px-4 py-12 mx-auto space-y-8 overflow-hidden sm:px-6 lg:px-8">
        <nav className="flex flex-wrap justify-center gap-4 -my-2">
          {quickLink.map((item, i) => (
            <Link to={item.to} key={i}>
              <span className="font-[500] cursor-pointer hover:opacity-75">
                {item.name}
              </span>
            </Link>
          ))}
        </nav>
        <div className="flex justify-center mt-8 space-x-6">
          {socials.map((item, i) => (
            <a
              className=""
              href="https://www.facebook.com/nguyen.bin.796569"
              to={"https://www.facebook.com/nguyen.bin.796569"}
              key={i}
            >
              {item.icon}
            </a>
          ))}
        </div>
        <p className="mt-8 text-base leading-6 text-center text-gray-400">
          © 2022 Nguyễn Khoa Bin. All rights reserved.
        </p>
      </div>
    </section>
  );
};

export default Footer;
