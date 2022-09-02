import React from "react";

const Heading = ({
  classname = "text-[28px] font-bold relative mb-[30px] text-[#3A1097] before:content-[' '] before:w-[50px] before:h-[4px] before:absolute before:bg-[#00D1ED] before:top-0 before: left-0 before:translate-x-0 before:translate-y-[-150%]",
  children,
}) => {
  return <div className={classname}>{children}</div>;
};

export default Heading;
