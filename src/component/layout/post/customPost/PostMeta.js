import React from "react";
import { NavLink } from "react-router-dom";

const PostMeta = ({
  time = "Mar 23",
  authorName = "Andiez Le",
  className = " ",
  to = " ",
}) => {
  return (
    <div
      className={`post-info flex items-center font-[14px] font-[600] gap-3  text-[#fff] ${className}`}
    >
      <span className="post-time">{time}</span>
      <span className="post-dot inline-block w-1 h-1 rounded-full bg-[#B1B5C3]"></span>
      <NavLink to={to}>
        <span className="post-author">{authorName}</span>
      </NavLink>
    </div>
  );
};

export default PostMeta;
