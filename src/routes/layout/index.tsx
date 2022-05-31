import React from "react";
import { Outlet } from "react-router-dom";
import Tab from "../../components/Tab";

const Layout = () => {
  return (
    <div>
      <Outlet />
      <Tab />
    </div>
  );
};

export default Layout;
