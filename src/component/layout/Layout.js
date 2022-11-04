import React from "react";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <div className="relative ">
      <Header></Header>
      {children}
      <Footer></Footer>
    </div>
  );
};

export default Layout;
