import React from "react";

const DashboardHeading = ({ title = "", desc = "", children }) => {
  return (
    <div className="mb-10">
      <h1 className="font-bold text-[28px]">{title}</h1>
      <p className="text-gray500">{desc}</p>
      {children}
    </div>
  );
};

export default DashboardHeading;
