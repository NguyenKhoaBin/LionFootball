import React from "react";
import { useAuth } from "../../contexts/auth-context";
import Page404 from "../../pages/Page404";
import Header from "../layout/Header";
import Postaddnew from "../layout/post/Postaddnew";

const UserAddPost = () => {
  const { userInfo } = useAuth();
  if (!userInfo) return <Page404></Page404>;
  return (
    <div className="main">
      <Header></Header>
      <div className="mt-[10px] mb-[25px]  w-full  border-b border-b-[#ccc] "></div>
      <Postaddnew></Postaddnew>
      <div className="my-10"></div>
    </div>
  );
};

export default UserAddPost;
