import { useEffect, useState } from "react";
import { FiGrid, FiUsers, FiShield, FiPackage } from "react-icons/fi";
import { FaRegUserCircle } from "react-icons/fa";
import { RiShieldUserLine } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";
import NavItem from "../../components/NavItem";

export default function Sidebar({currentPage, setCurrentPage }) {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [isCollapsed, setIsCollapsed] = useState(false);
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);
        windowWidth < 1279 ? setIsCollapsed(true) : setIsCollapsed(false);

        return () => window.removeEventListener("resize", handleResize);



    }, [windowWidth])
    return (
        <div className={`h-screen shrink-0 sticky top-0 bg-white shadow-md ${isCollapsed ? "w-13" : "w-64"} duration-300`}>
            {/* Logo */}
            <div className="flex items-center justify-between lg:justify-center p-4">
                <img src="./images/elefin-logo.svg" alt="Elefin Money" className={`h-8 ${isCollapsed ? "w-[0%]" : "w-[100%]"}`} />
                <button onClick={() => setIsCollapsed(!isCollapsed)} className="p-2  hover:text-gray-800 xl:hidden">
                    <IoIosArrowForward className={`duration-300 transform ${isCollapsed ? "" : "rotate-180"}`} />
                </button>
            </div>

            {/* Navigation */}
            <nav className="mt-4 ">
                <NavItem icon={<FiGrid size={24} />} text="Dashboard" isCollapsed={isCollapsed} isActive={currentPage === "home"} onClick={() => setCurrentPage("home")} />
                <NavItem icon={<FaRegUserCircle size={24} />} text="Sub - Admin" isCollapsed={isCollapsed} isActive={currentPage === "subadmin"} onClick={() => setCurrentPage("subadmin")} />
                <NavItem icon={<FiPackage size={24} />} text="Funds" isCollapsed={isCollapsed} isActive={currentPage === "funds"} onClick={() => setCurrentPage("funds")} />
                <NavItem icon={<FiUsers size={24} />} text="Customers" isCollapsed={isCollapsed} isActive={currentPage === "customers"} onClick={() => setCurrentPage("customers")} />
                <NavItem icon={<RiShieldUserLine size={24} />} text="Partners" isCollapsed={isCollapsed} isActive={currentPage === "partners"} onClick={() => setCurrentPage("partners")} />
            </nav>
        </div>
    );
}


