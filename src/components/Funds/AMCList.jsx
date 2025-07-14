import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { FaChevronDown } from "react-icons/fa";
import ActionsDropdown from "./ActionDropdown";
import { getAMCList, getFundsList } from "../../pages/Funds/funds-service";
// import { AMCData } from "../../static";



const AMCList = ({ setScreen }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [sortOption, setSortOption] = useState("");
    const [AMCData, setAMCData] = useState([])

    const filteredAMC = AMCData.filter(amc =>
        amc.name.toLowerCase().includes(searchQuery.toLowerCase())
    ).sort((a, b) => (sortOption === "desc" ? b.schemes - a.schemes : a.schemes - b.schemes));

    async function getAMC() {

        try {

            const res = await getAMCList({})
            const { status, details } = res
            if (status.success && details.fund_schemes) {
                toast.success("success")
                setAMCData(filteredData)
            }
        }
        catch (err) {
            toast.error("Failed to fetch funds list")
        }

    }

    useEffect(() => {
        getAMC()
    }, [])

    return (
        <div className="bg-white border border-[#ddd] rounded-lg py-4">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-4 px-4">
                <h2 className="text-lg font-semibold">AMC List</h2>
                <div className="flex items-center gap-4">
                    {/* Sorting Dropdown */}
                    <div className="relative w-52">
                        <select
                            className="border p-2 rounded  appearance-none w-full cursor-pointer"
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value)}
                        >
                            <option value="">Top Fund Count</option>
                            <option value="asc">Ascending</option>
                            <option value="desc">Descending</option>
                        </select>
                        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                            <FaChevronDown className="w-4 h-4 " />
                        </div>
                    </div>
                    {/* Search Input */}
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search"
                            className="border p-2 rounded pl-8"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <span className="absolute left-2 top-1/2 transform -translate-y-1/2 ">
                            <BsSearch />
                        </span>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-100 text-left border-b border-[#ddd]">
                            <th className="p-3">AMC Name</th>
                            <th className="p-3">Schemes</th>
                            <th className="p-3">AUM</th>
                            <th className="p-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAMC.map((amc, index) => (
                            <tr key={index} className="hover:bg-gray-50 border-b border-[#ddd]">
                                <td className="p-3 cursor-pointer" onClick={() => setScreen(2)}>
                                    <div className=" flex items-center gap-2"><img src={amc.icon} alt="" className="w-6 h-6" />
                                        <span className="line-clamp-1">{amc.name}</span>
                                    </div>
                                </td>
                                <td className="p-3">{amc.schemes}</td>
                                <td className="p-3">{amc.aum}</td>
                                <ActionsDropdown />
                            </tr>
                        ))}
                    </tbody>
                </table>
                {/* No Results Message */}
                {filteredAMC.length === 0 && (
                    <p className="text-center p-4">No AMCs found</p>
                )}
            </div>
        </div>
    );
};

export default AMCList;
