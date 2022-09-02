import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center">
      <div
        className={`h-[30px] w-[30px] border-[4px] border-t-[4px] border-t-[#D5E8DA] rounded-full animate-spin
      `}
      ></div>
    </div>
  );
};

export default Loading;
