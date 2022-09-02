import React from "react";
import { NavLink } from "react-router-dom";

const PostImage = ({ url = "", alt = "", to = null, className = " " }) => {
  if (to) {
    return (
      <NavLink to={to}>
        <img
          src={url}
          alt={alt}
          className={`w-full cursor-pointer z-10 h-full object-cover rounded-[4px] ${className}`}
        />
      </NavLink>
    );
  }
  return (
    <img
      src={url}
      alt={alt}
      className={`w-full z-20 h-full cursor-default object-cover rounded-2xl ${className}`}
    />
  );
};

export default PostImage;
<img src="" alt="" />;
