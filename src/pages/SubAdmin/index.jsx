import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { subadminData } from "../../static";
import { FaPlus } from "react-icons/fa";
import { BsSearch } from "react-icons/bs";
import AddSubAdmin from "../../components/AddSubAdmin";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import ChangePassword from "../../components/SubAdmin/ChangePassword";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import CheckBox from "../../components/CheckBox";

const SubAdmin = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [step, setStep] = useState(1); // to open Sub admin info

  const filteredData = subadminData.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const openPopup = () => setIsPasswordModalOpen(true);

  return (
    <>
      {step === 1 && (
        <div className="">
          <button className='btn btn-primary ml-auto block' onClick={() => setIsModalOpen(true)}>
            <FaPlus className='inline-block mr-2' /> Add Sub admin
          </button>
          <div className="border border-[#ddd] rounded-lg my-4">
            <div className="flex justify-between items-center py-2 px-4">
              <h2 className="text-sm text-gray-800">Sub - Admin List</h2>
              <div className="relative ">
                <BsSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 " size={16} />
                <input
                  type="text"
                  placeholder="Search"
                  className="pl-10 pr-4 py-1.5 text-sm border border-[#ddd] rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <table className="w-full border-collapse border-t border-[#ddd] text-sm">
              <thead>
                <tr className="bg-gray-100 text-left border-b border-[#ddd]">
                  <th className="p-3 font-semibold ">Name</th>
                  <th className="p-3 font-semibold ">Email</th>
                  <th className="p-3 font-semibold ">Role</th>
                  <th className="p-3 font-semibold ">Last Login</th>
                  <th className="p-3 font-semibold ">Joined on</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item, index) => (
                  <tr key={index} className="[&:not(:last-child)]:border-b border-[#ddd]">
                    <td className="p-3 cursor-pointer" onClick={() => setStep(2)}>{item.name}</td>
                    <td className="p-3 cursor-pointer" onClick={() => setStep(2)}>{item.email}</td>
                    <td className="p-3">{item.role}</td>
                    <td className="p-3">{item.lastLogin}</td>
                    <td className="p-3">{item.joinedOn}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredData.length === 0 && <p className="py-3.5 px-6 text-center">No match found.</p>}
          </div>
          <AddSubAdmin isOpen={isModalOpen} setIsModalOpen={setIsModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
      )}
      {step === 2 && (
        <div className="max-w-[1000px]">
          <div className="sub-admin-info flex flex-col gap-5">
            <div className="flex gap-3"><button onClick={() => setStep(1)}><IoArrowBackCircleOutline size={22} />
            </button><h3> Sub admin info</h3></div>
            <div>
              <label className="block text-sm font-medium">Name</label>
              <input
                disabled
                type="text"
                value={'Sylvester Ernser'}
                className="w-full p-2 border rounded text-gray"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Email Address</label>
              <input
                disabled
                type="email"
                value={'Anahi80@hotmail.com'}
                className="w-full p-2 border rounded text-gray"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Mobile Number</label>
              <input
                disabled
                type="text"
                value={'9102874951'}
                className="w-full p-2 border rounded text-gray"
              />
            </div>

            <div>
              {/* Password Field with Show/Hide Icon */}
              <label className="block text-sm font-medium">Password</label>
              <div className="relative w-full">
                <input
                  disabled
                  type={showPassword ? "text" : "password"}
                  value="12345678"
                  className="w-full p-2 border rounded text-gray"
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 "
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <MdOutlineVisibilityOff size={20} /> : <MdOutlineVisibility size={20} />}
                </button>
              </div>

              {/* Change Password Link */}
              <div
                className="ml-auto w-fit block mt-1 text-sm underline hover:no-underline cursor-pointer"
                onClick={openPopup}
              >
                Change Password
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium">Role</label>
              <input
                disabled
                type="text"
                value={'Accoountant'}
                className="w-full p-2 border rounded text-gray"
              />
            </div>

            {/* Change Password Popup */}
            <ChangePassword isOpen={isPasswordModalOpen} onClose={() => setIsPasswordModalOpen(false)} />
          </div>


          {/* Permissions */}
          <div className="border border-[#F3F3F3]  rounded-lg overflow-hidden mt-5">
            <div className="bg-[#F3F3F3]">
              <h3 className="text-lg text-[#606060] font-medium mb-2 p-3 border-b border-[#F3F3F3]">Set Permissions</h3>
            </div>
            <div className="pr-5">
              <div className="flex justify-between items-center px-6 py-3 ">
                <span className="text-sm">Dashboard</span>
                <CheckBox name="permissions.dashboard" checked={true} disabled />
              </div>
              <div className="flex justify-between items-center px-6 py-3 ">
                <span className="text-sm">Sub - Admin</span>
                <CheckBox name="permissions.subAdmin" />
              </div>
              <div className="flex justify-between items-center px-6 py-3 ">
                <span className="text-sm">Funds</span>
                <CheckBox name="permissions.funds" />
              </div>
              <div className="flex justify-between items-center px-6 py-3">
                <span className="text-sm">Customer</span>
                <CheckBox name="permissions.customer" />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SubAdmin;

