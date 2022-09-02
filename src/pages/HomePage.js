import React from "react";
import { useEffect } from "react";
import HomeBanner from "../component/home/HomeBanner";
import HomeFeature from "../component/home/HomeFeature";
import HomeNewest from "../component/home/HomeNewest";

import Layout from "../component/layout/Layout";

const HomePage = () => {
  useEffect(() => {
    document.title = "Lion Football";
  }, []);
  return (
    <div>
      <Layout>
        <HomeBanner></HomeBanner>
        <HomeFeature></HomeFeature>
        <HomeNewest></HomeNewest>
      </Layout>
    </div>
  );
};

export default HomePage;
