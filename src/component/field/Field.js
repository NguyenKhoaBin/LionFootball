import React from "react";

const Field = ({ children, className = " " }) => {
  return <div className={`mb-[40px] last:mb-0 ${className}`}>{children}</div>;
};

export default Field;
