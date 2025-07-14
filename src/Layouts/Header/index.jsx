import { useState, useRef, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import { FiChevronDown, FiSettings, FiLogOut } from "react-icons/fi";
import { IoIosNotificationsOutline } from "react-icons/io";
import { useAuth } from '../../hooks/useAuth';

const Header = () => {

  const { logOut } = useAuth();

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const profileRef = useRef(null);
  const notificationRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsNotificationOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <>
      {/* Top Bar */}
      <header className="flex justify-between items-center mb-6">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <BsSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 " size={18} />
          <input
            type="text"
            placeholder="Search something here"
            className="w-full pl-10 pr-4 py-2.5 bg-white  border border-[#ddd]  rounded-lg text-sm outline-none focus:ring focus:ring-blue-400"
          />
        </div>

        {/* User Profile */}
        <div className="flex items-center space-x-4">

          {/* Notification Dropdown */}
          <div className="relative" ref={notificationRef}>
            <button
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              className="relative p-2 border border-[#ddd] rounded-full text-gray-800"
            >
              <IoIosNotificationsOutline size={24} />
              {/* Notification Badge */}
              <span className="absolute top-2 right-2 bg-red-500 text-white text-xs w-3 h-3 flex items-center justify-center rounded-full">
                3
              </span>
            </button>
            {isNotificationOpen && (
              <div className="absolute right-0 mt-2 w-60 bg-white shadow-lg rounded-lg overflow-hidden z-10">
                <p className="px-4 py-2 text-sm font-semibold  border-b">Notifications</p>
                <div className="max-h-40 overflow-y-auto py-2">
                  <button className="w-full px-4 py-2 flex items-start gap-2 text-left text-sm hover:bg-gray-100">
                    <IoIosNotificationsOutline className="mr-2 relative top-0.5" /> <span>New user signed up</span>
                  </button>
                  <button className="w-full px-4 py-2 flex items-start gap-2 text-left text-sm hover:bg-gray-100">
                    <IoIosNotificationsOutline className="mr-2 relative top-0.5" /> <span>You received a message</span>
                  </button>
                  <button className="w-full px-4 py-2 flex items-start gap-2 text-left text-sm hover:bg-gray-100">
                    <IoIosNotificationsOutline className="mr-2 relative top-0.5" /> <span>Server restarted successfully</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex text-left items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition"
            >
              <img src="./images/user.png" alt="User" className="w-10 h-10 rounded-full" />
              <div>
                <p className="text-sm font-semibold">Nawal Verma</p>
                <p className="text-xs ">naval.verma@elefinmoney.com</p>
              </div>
              <FiChevronDown className=" " />
            </button>
            {isProfileOpen && (
              <div className="absolute left-0 py-2 mt-2 w-48 z-10 bg-white shadow-lg rounded-lg overflow-hidden">
                <button className="w-full px-4 py-2 flex items-center space-x-3 hover:bg-gray-100">
                  <FiSettings className=" " />
                  <span className="text-sm text-gray-800 ">Settings</span>
                </button>
                <button className="w-full px-4 py-2 flex items-center space-x-3 hover:bg-gray-100"   onClick={logOut}>
                  <FiLogOut className=" " />
                  <span className="text-sm text-gray-800 ">Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
