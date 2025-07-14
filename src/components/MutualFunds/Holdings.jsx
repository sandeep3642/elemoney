import React, { useState } from 'react'
import { BsSearch } from 'react-icons/bs';
import { FaChevronDown } from 'react-icons/fa';
const holdingsData = [
  {
    fundName: "Coforge Ltd.",
    sector: "Technology",
    instrument: "Equity",
    assets: "9.91%"
  },
  {
    fundName: "Persistent Systems Ltd.",
    sector: "Technology",
    instrument: "Equity",
    assets: "9.51%"
  },
  {
    fundName: "Kalyan Jewellers India Ltd.",
    sector: "Consumer Discretionary",
    instrument: "Equity",
    assets: "6.83%"
  },
  {
    fundName: "Dixon Technologies (India) Ltd.",
    sector: "Capital Goods",
    instrument: "Equity",
    assets: "6.67%"
  },
  {
    fundName: "Max Healthcare Institute Ltd.",
    sector: "Healthcare",
    instrument: "Equity",
    assets: "4.11%"
  },
  {
    fundName: "One97 Communications Ltd.",
    sector: "Services",
    instrument: "Equity",
    assets: "3.94%"
  },
  {
    fundName: "Trent Ltd.",
    sector: "Services",
    instrument: "Equity",
    assets: "3.68%"
  },
  {
    fundName: "Polycab India Ltd.",
    sector: "Capital Goods",
    instrument: "Equity",
    assets: "3.48%"
  },
  {
    fundName: "Bharti Hexacom Ltd.",
    sector: "Communication",
    instrument: "Equity",
    assets: "3.44%"
  }
];

const Holdings = () => {

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSector, setSelectedSector] = useState("All");


  const sector = ["All",
    "Technology",
    "Consumer Discretionary",
    "Capital Goods",
    "Healthcare",
    "Services",
    "Communication"
  ];

  const filteredFunds = holdingsData.filter(hold =>
    (selectedSector === "All" || hold.sector === selectedSector) &&
    (searchTerm === "" || hold.fundName.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  return (
    <div>


      <div className=" mx-auto bg-white rounded-lg border border-[#ddd]  mt-4">
        {/* Header Section */}
        <div className="flex justify-between items-center px-6 py-2">
          <h2 className="text-xl font-semibold">List of Motilal Oswal Mutual Fund in India</h2>

          {/* Search & Filter Container */}
          <div className="flex gap-3">
            {/* Filter Dropdown */}

            <div className="relative w-52">
              <select className="border py-2 pl-4 pr-8 rounded text-gray appearance-none w-full cursor-pointer" onChange={(e) => setSelectedSector(e.target.value)}>
                {sector.map((item) => (
                  <option key={item} value={item}>{item}</option>
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
                <th className="py-3.5 px-6 text-left">sector</th>
                <th className="py-3.5 px-6 text-left">Instrument</th>
                <th className="py-3.5 px-6 text-left">Assets</th>
              </tr>
            </thead>
            <tbody>
              {filteredFunds.map((hold, index) => (
                <tr key={index} className="[&:not(:last-child)]:border-b border-[#ddd] text-sm hover:bg-gray-50">
                  <td className="py-3.5 px-6">{hold.fundName}</td>
                  <td className="py-3.5 px-6">{hold.sector}</td>
                  <td className="py-3.5 px-6">{hold.instrument}</td>
                  <td className="py-3.5 px-6">{hold.assets}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredFunds.length === 0 && <p className="py-3.5 px-6 text-center">No matching funds found.</p>}
      </div>
    </div>
  )
}

export default Holdings