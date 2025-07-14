import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { FaChevronDown } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";

const fundsData = [
    { name: "Motilal Oswal Midcap Fund", category: "Equity", risk: "Very High", returns: "16.6%", size: "₹23,703" },
    { name: "Motilal Oswal Large and Midcap Fund", category: "Equity", risk: "Moderately High", returns: "10.4%", size: "₹7,624" },
    { name: "Motilal Oswal ELSS Tax Saver Fund", category: "Equity", risk: "Very High", returns: "7.7%", size: "₹3,405" },
    { name: "Motilal Oswal Flexi Cap Fund", category: "Equity", risk: "Very High", returns: "15.1%", size: "₹11,171" },
    { name: "Motilal Oswal Nifty Midcap 150 Index Fund", category: "Equity", risk: "Moderately High", returns: "1.4%", size: "₹1,800" },
    { name: "Motilal Oswal Nifty Next 50 Index Fund", category: "Equity", risk: "Very High", returns: "-1.3%", size: "₹270" },
    { name: "Motilal Oswal Nifty 500 Index Fund", category: "Equity", risk: "Moderately High", returns: "0.6%", size: "₹1,906" },
    { name: "Motilal Oswal Nifty 50 Index Fund", category: "Equity", risk: "Very High", returns: "1.8%", size: "₹577" },
    { name: "Motilal Oswal Asset Allocation Passive FoF", category: "Hybrid", risk: "Very High", returns: "7.8%", size: "₹71" },
    { name: "Motilal Oswal Nifty Bank Index Fund", category: "Equity", risk: "High", returns: "1.7%", size: "₹558" },
];
const keyInfo = {
    "Name": "Motilal Oswal Mutual Fund",
    "AUM": "₹ 88,636.71 Crores",
    "AUM Setup Date": "November 14, 2008",
    "AUM Incorporate Date": "November 14, 2008",
    "CIO": "Mr. Navin Agarwal",
    "MD & CEO": "Mr. Navin Agarwal",
    "Schemes": "213",
    "Trustee": "Motilal Oswal Trustee Company Ltd."
};
const MutualFundsList = ({setScreen}) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");

    const categories = ["All", "Equity", "Hybrid"];

    const filteredFunds = fundsData.filter(fund =>
        (selectedCategory === "All" || selectedCategory === "" || fund.category === selectedCategory) &&
        (fund.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div>
            <div className='flex gap-5 items-start'>
                <div className='border border-[#aeaeae] rounded-lg p-2 cursor-pointer hover:bg-black hover:text-white duration-300' onClick={() => setScreen(1)}>
                    <IoMdArrowRoundBack size={24} />
                </div>
                <div className="flex items-center p-5 border border-[#ddd] rounded-md w-full">
                    {/* Image */}
                    <img
                        src="/images/11.svg"
                        alt="Motilal Oswal Logo"
                        className="w-16 h-16 rounded-md"
                    />

                    {/* Content */}
                    <div className="ml-4">
                        <h2 className="text-lg font-semibold">Motilal Oswal Top 100 Fund</h2>
                        <p className="text-sm">
                            Motilal Oswal Top 100 Fundd manages assets worth 93341 crores and was
                            set up on 2009-12-29. Its current offering of mutual fund schemes
                            includes 28 debt, 52 equity, 14 hybrid, 72 other funds. The company
                            is led by its CEO Prateek Agrawal.
                        </p>
                    </div>
                </div>
            </div>
            <div className=" mx-auto bg-white rounded-lg border-[#ddd] border mt-4">
                <h2 className="text-lg font-semibold px-6 py-4 border-b border-[#ccc]">
                    Key information about Motilal Oswal Asset Management Company Pvt Ltd.
                </h2>
                <div className="space-y-3">
                    {Object.entries(keyInfo).map(([key, value], index) => (
                        <div key={index} className="flex flex-col md:flex-row md:items-center [&:not(:last-child)]:border-b border-[#ddd] px-6 py-3.5 mb-0 text-sm">
                            <span className="font-medium w-48">{key}:</span>
                            <span className="">{value}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className=" mx-auto bg-white rounded-lg border border-[#ddd]  mt-4">
                {/* Header Section */}
                <div className="flex justify-between items-center px-6 py-2">
                    <h2 className="text-xl font-semibold">List of Motilal Oswal Mutual Fund in India</h2>

                    {/* Search & Filter Container */}
                    <div className="flex gap-3">
                        {/* Filter Dropdown */}

                        <div className="relative w-52">
                            <select
                                className="border py-2 px-4 rounded text-gray appearance-none w-full cursor-pointer"
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                            >
                                {categories.map((cat, index) => (
                                    <option key={index} value={cat === "All" ? "" : cat}>{cat}</option>
                                ))}
                            </select>
                            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                                <FaChevronDown className="w-4 h-4 " />
                            </div>
                        </div>
                        {/* Search Bar */}
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search"
                                className="border py-2 pl-10 pr-3 rounded-md focus:ring focus:ring-gray-300 w-60"
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <BsSearch className="absolute left-3 top-3 " />
                        </div>
                    </div>
                </div>


                {/* Data Table */}
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-100 border-b border-[#ddd]">
                                <th className="py-3.5 px-6 text-left">Fund Name</th>
                                <th className="py-3.5 px-6 text-left">Category</th>
                                <th className="py-3.5 px-6 text-left">Risk</th>
                                <th className="py-3.5 px-6 text-left">1Y Returns</th>
                                <th className="py-3.5 px-6 text-left">Fund Size</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredFunds.map((fund, index) => (
                                <tr key={index} className="[&:not(:last-child)]:border-b border-[#ddd] text-sm hover:bg-gray-50 cursor-pointer" onClick={() => setScreen(3)}>
                                    <td className="py-3.5 px-6">{fund.name}</td>
                                    <td className="py-3.5 px-6">{fund.category}</td>
                                    <td className="py-3.5 px-6">{fund.risk}</td>
                                    <td className="py-3.5 px-6">{fund.returns}</td>
                                    <td className="py-3.5 px-6">{fund.size}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredFunds.length === 0 && <p className="py-3.5 px-6">No matching funds found.</p>}
            </div>
        </div>
    );
};

export default MutualFundsList;
