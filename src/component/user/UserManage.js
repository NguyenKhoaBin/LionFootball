import React from "react";
import Button from "../button/Button";
import DashboardHeading from "../dashboard/DashboardHeading";
import UserTable from "./UserTable";

const UserManage = () => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <DashboardHeading
          title="Users"
          desc="Manage your user"
        ></DashboardHeading>
        <Button
          type="submit"
          to={"/manage/add-user"}
          className="w-full mb-3 text-[#fff] font-bold text-[18px] bg-gradient-to-br from-[#00A7B4] to-[#A4D96C] p-[18px] rounded-lg hover:cursor-pointer
              disabled:opacity-[0.5] max-w-[250px] mx-auto block    "
        >
          Add new user
        </Button>
      </div>
      <UserTable></UserTable>
    </div>
  );
};

export default UserManage;
