import React from "react";
import { NavLink } from "react-router-dom";
const PostTitle = ({ children, to = "/", classname = " " }) => {
  return (
    <h3 className={`font-[600] leading-[1.5] block ${classname}`}>
      <NavLink to={to} className="block">
        {children}
      </NavLink>
    </h3>
  );
};

export default PostTitle;
