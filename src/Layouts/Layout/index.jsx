import Lenis from "lenis";
import React, { useEffect } from "react";
import Sidebar from "../Sidebar";
import Header from "../Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  useEffect(() => {
    new Lenis({ autoRaf: true });
  }, []); // Empty dependency array

  return (
    <div className="trigger">
      <div className="flex">
        <Sidebar />
        <div className="flex flex-col flex-1 p-6 w-full">
          <Header />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
