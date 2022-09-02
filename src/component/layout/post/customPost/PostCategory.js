import React from "react";
import { NavLink } from "react-router-dom";
const PostCategory = ({ children, className = " ", to = "/" }) => {
  return (
    <span
      className={`post-category block py-2 px-[10px] rounded-lg text-[#6b6b6b] font-[14px] font-[600] bg-[#fff] ${className}`}
    >
      <NavLink to={to} className="block">
        {children}
      </NavLink>
    </span>
  );
};

export default PostCategory;
