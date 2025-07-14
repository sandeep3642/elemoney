import Lenis from "lenis";
import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import Header from "../Header";
import Dashboard from "../../pages/Dashboard";

const Layout = () => {
  const [currentPage, setCurrentPage] = useState("home");
  //smooth  scroll using lenis
  useEffect(() => {
    // Initialize Lenis
    new Lenis({
      autoRaf: true,
    });
  });
  return (
    <div className="trigger">
      <div className="flex">
        <Sidebar setCurrentPage={setCurrentPage} currentPage={currentPage} />
        <div className="flex flex-col flex-1 p-6 w-full max-w-[1500px]">
          <Header />
          <Dashboard currentPage={currentPage} />
        </div>
      </div>
    </div>
  );
};

export default Layout;
