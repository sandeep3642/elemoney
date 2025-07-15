import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { BsSearch } from "react-icons/bs";
import ActionsDropdown from "../../components/Funds/ActionDropdown";
import Portfolio from "../../components/Customers/Portfolio";
import Kycdetails from "../../components/Customers/Kyc-details";
import { IoMdArrowRoundBack } from "react-icons/io";
import { getAllCustomer, getCutomerDetailsById } from "./customer-service";
import { toast } from "react-toastify";
import { getMessageName } from "../../utils/messageConstant";
import { useNavigate } from "react-router-dom";

const Customers = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1); // to open Sub admin info
  const [customersList, setCustomers] = useState([]);
  const [customerDetails, setCutomerDetails] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const filteredData =
    customersList &&
    Array.isArray(customersList) &&
    customersList.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const [activeTab, setActiveTab] = useState("Portfolio");
  const tabs = [
    { id: "Portfolio", label: "Portfolio", content: <Portfolio /> },
    { id: "KYCDetails", label: "KYC Details", content: <Kycdetails /> },
  ];

  async function fetchCustomers() {
    try {
      const response = await getAllCustomer();
      const { details, status } = response;
      if (status.success && Array.isArray(details.customers)) {
        setCustomers(details?.customers);
      }
    } catch (error) {
      toast.error("Failed to fetch service requests");
    }
  }

  const handleClick = async (id) => {
    try {
      const response = await getCutomerDetailsById({ customer_id: id });
      const { details, status } = response;
      if (status.success && details.customer) {
        console.log(details.customer, "details");
        setCutomerDetails(details.customer);
        setStep(2);
      }
    } catch (error) {
      toast.error("Failed to fetch service requests");
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <>
      {step === 1 && (
        <div className="">
          <button className="btn btn-primary ml-auto block"
            onClick={() => navigate("/customerOnboarding")}
          >
            <FaPlus className="inline-block mr-2" /> Add Customer
          </button>
          <div className="border border-[#ddd] rounded-lg my-4">
            <div className="flex justify-between items-center py-2 px-4">
              <h2 className="text-sm text-gray-800">Customer List</h2>
              <div className="relative ">
                <BsSearch
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 "
                  size={16}
                />
                <input
                  type="text"
                  placeholder="Search"
                  className="pl-10 pr-4 py-1.5 text-sm border border-[#ddd] rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <table className="w-full border-collapse border-[#ddd] text-sm">
              <thead>
                <tr className="bg-gray-100 text-left  border-b border-[#ddd]">
                  <th className="p-3 font-semibold ">Name</th>
                  <th className="p-3 font-semibold ">Email</th>
                  <th className="p-3 font-semibold ">Mobile No.</th>
                  <th className="p-3 font-semibold ">KYC Status</th>
                  <th className="p-3 font-semibold ">Joined on</th>
                  {/* <th className="p-3 font-semibold">Actions</th> */}
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 border-b border-[#ddd]"
                    onClick={() => handleClick(item._id)}
                  >
                    <td className="p-3 cursor-pointer text-blue-700">
                      {item.name || "NA"}
                    </td>
                    <td className="p-3 cursor-pointer">{item.email || "NA"}</td>
                    <td className="p-3">{item.mobile || "NA"}</td>
                    <td className="p-3">
                      {getMessageName(item?.kyc_status) || "NA"}
                    </td>
                    <td className="p-3">{item?.joinedOn || "NA"}</td>
                    {/* <ActionsDropdown /> */}
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredData.length === 0 && (
              <p className="py-3.5 px-6 text-center">No match found.</p>
            )}
          </div>
          {/* <AddSubAdmin isOpen={isModalOpen} setIsModalOpen={setIsModalOpen} onClose={() => setIsModalOpen(false)} /> */}
        </div>
      )}
      {step === 2 && (
        <div className="">
          <div className="row">
            <div className="w-fit mb-4">
              <div
                className="border border-[#aeaeae] rounded-lg p-2 cursor-pointer hover:bg-black hover:text-white duration-300"
                onClick={() => setStep(1)}
              >
                <IoMdArrowRoundBack size={24} />
              </div>
            </div>

            <div className="col-12">
              <div class="flex items-center justify-between p-4 border border-[#b3b35c] rounded-lg bg-[#f9f9e7] w-full mb-4">
                <div>
                  <h1 class="text-[#8a8a2e] text-xl font-bold">
                    KYC Verification
                  </h1>
                  <p class="text-gray-500">
                    {customerDetails?.kyc_verification?.status === "pending"
                      ? "  KYC Verification need to be verified"
                      : "  KYC Verification done"}
                  </p>
                </div>
                {customerDetails?.kyc_verification?.status === "pending" && (
                  <button class="bg-black text-white py-2 px-4 rounded-lg">
                    Verify Now
                  </button>
                )}
              </div>
            </div>
            <div className="col-12">
              {customerDetails?.kyc_status === "NOT_STARTED" ? (
                <div className="flex items-center justify-between p-4 border border-[#FB5959] rounded-lg bg-[#FFEDEC] w-full mb-4">
                  <div>
                    <h1 className="text-[#FB5959] text-xl font-bold">
                      KYC Pending
                    </h1>
                    <p className="text-gray-500">Customer KYC not done</p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between p-4 border border-[#36B37E] rounded-lg bg-[#E6F4EC] w-full mb-4">
                  <div>
                    <h1 className="text-[#36B37E] text-xl font-bold">
                      KYC Done
                    </h1>
                    <p className="text-gray-500">Customer KYC completed</p>
                  </div>
                </div>
              )}
            </div>

            <div className="col-12 col-md-6">
              <div>
                <div className="mx-auto">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="p-6 border border-[#ddd] rounded-lg flex items-start bg-white">
                      <div className="min-w-[190px]">
                        <h3 className="text-gray-500 text-xl font-normal">
                          Customer Detail{" "}
                          <img
                            className="w-6 h-6 inline"
                            src="./images/question-mark-circle.svg"
                          />
                        </h3>
                        <img
                          alt="Customer profile picture"
                          className="mt-5 rounded-full mr-4"
                          height="120"
                          src="./images/user1.png"
                          width="120"
                        />
                      </div>
                      <div className="mt-10">
                        <h2 className="text-xl font-semibold">
                          {customerDetails?.name}
                          <img
                            className="w-6 h-6 float-right ml-1"
                            src="./images/verifed_success.svg"
                          />
                        </h2>
                        <p className="text-gray-600 mt-1">
                          Customer ID : 394028037
                        </p>
                        <p className="text-gray-600 mt-1">
                          <img
                            className="w-6 h-6 float-left mr-3"
                            src="./images/mail_ico.svg"
                          />{" "}
                          {customerDetails?.email}
                        </p>
                        <p className="text-gray-600 mt-1">
                          <img
                            className="w-6 h-6 float-left mr-3"
                            src="./images/call_ico.svg"
                          />{" "}
                          +91 {customerDetails?.mobile}
                        </p>
                      </div>
                      <div className="ml-auto flex items-center space-x-2">
                        <img className="w-6 h-6" src="./images/editico.svg" />
                        <div className="text-right w-6 h-6">⋮</div>
                      </div>
                    </div>

                    <div className="p-6 border border-[#ddd] rounded-lg bg-white flex flex-col w-full justify-between">
                      <h3 className="text-xl font-normal text-gray-500 mb-2">
                        Your Portfolio Value{" "}
                        <img
                          className="w-6 h-6 inline"
                          src="./images/mdi_information-outline.svg"
                        />
                      </h3>
                      <p className="text-3xl font-bold text-green-500">
                        ₹545,000
                        <span className="text-gray-500 text-sm font-normal inline ml-3">
                          Till Date
                        </span>
                      </p>

                      <div className="flex justify-between align-center">
                        <p className="text-gray-400 text-xl font-normal">
                          Invested Amount
                          <span className="text-xl font-semibold w-full block text-gray-700">
                            ₹500,000
                          </span>
                        </p>

                        <p className="text-gray-400 text-xl font-normal">
                          Total Returns
                          <span className="text-xl font-semibold w-full block text-green-500">
                            +45,000 (9.00%)
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div>
                      {/* Tabs */}
                      <div class="bg-gray-200 p-2 rounded-lg flex items-center space-x-4 w-fit">
                        {tabs.map((tab) => (
                          <div
                            key={tab.id}
                            className={`p-2 rounded-lg cursor-pointer ${
                              activeTab === tab.id ? "shadow bg-white" : ""
                            }`}
                            onClick={() => setActiveTab(tab.id)}
                          >
                            <span
                              key={tab.id}
                              className={`font-normal text-lg ${
                                activeTab === tab.id ? "" : "text-gray-500"
                              }`}
                            >
                              {tab.label}
                            </span>
                          </div>
                        ))}
                      </div>
                      {/* Tab Content */}
                      <div className="mt-4 text-gray-700">
                        {tabs.find((tab) => tab.id === activeTab)?.content}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Customers;
