import React from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/auth-context";
import Page404 from "../../pages/Page404";
import DashboardHeader from "./DashboardHeader";
import Sidebar from "./Sidebar";

const DashboardLayout = ({ children }) => {
  document.title = "dashboard";
  const { userInfo } = useAuth();
  if (userInfo)
    return (
      <div className="max-w-[1600px] mx-0 my-auto">
        <DashboardHeader to={"/manage/add-post"}></DashboardHeader>
        <div className="dashboardMain">
          <Sidebar></Sidebar>
          <div className="dashboardChildren">
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    );
  return <Page404></Page404>;
};

export default DashboardLayout;
