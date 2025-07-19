import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { FaChevronDown } from "react-icons/fa";
import ActionsDropdown from "./ActionDropdown";
import { getFundsList } from "../../pages/Funds/funds-service";
import { toast } from "react-toastify";
import { getAMCIconPath } from '../../utils/geticon';

const FundList = () => {
  const [fundsData, setFundsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("");


  async function getFunds() {
    setLoading(true)
    try {

      const res = await getFundsList({})
      const { status, details } = res
      if (status.success && details.funds) {
        toast.success("success")
        const filteredData = details.funds.map((fund) => ({
          name: fund.name,
          fund_category: fund.fund_category,
          isin: fund.isin,
          min_initial_investment: fund.min_initial_investment,
          max_swp_amount: fund.max_swp_amount,
        }));
        setFundsData(filteredData)
      }
    }
    catch (err) {
      toast.error("Failed to fetch funds list")
    }
    finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getFunds()
  }, []);

  const uniqueCategories = [...new Set(fundsData.map((f) => f.fund_category))];

  const filteredFunds = fundsData.filter(
    (fund) =>
      fund.name?.toLowerCase() && (filterCategory === "" || fund.fund_category === filterCategory) &&
      (searchQuery === "" || fund.name?.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  console.log("objfilteredFundsect", filteredFunds, fundsData)

  return (
    <div className="bg-white border border-[#ddd] rounded-lg py-4">

      <div className="flex justify-between items-center mb-4 flex-wrap gap-4 px-4">
        <h2 className="text-lg font-semibold">Fund List</h2>

        <div className="flex items-center gap-4 flex-wrap">
          {/* Category Filter */}
          <div className="relative w-52">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="border p-2 w-full rounded appearance-none"
            >
              <option value="">All Categories</option>
              {uniqueCategories.map((cat, idx) => (
                <option key={idx} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
              <FaChevronDown className="w-4 h-4" />
            </div>
          </div>

          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search by Fund Name"
              className="border p-2 rounded pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="absolute left-2 top-1/2 transform -translate-y-1/2">
              <BsSearch />
            </span>
          </div>

        </div>
      </div>


      <div className="overflow-x-auto">
        {loading ? (
          <p className="text-center p-4">Loading...</p>
        ) : (
          <>
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 text-left border-b border-[#ddd]">
                  <th className="p-3">Fund Name</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">ISIN</th>
                  <th className="p-3">Min Investment</th>
                  <th className="p-3">Fund Size</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {
                  filteredFunds && filteredFunds.length > 0 &&
                  filteredFunds.map((fund, index) => (
                    <tr key={index} className="hover:bg-gray-50 border-b border-[#ddd]">
                      <td className="p-3 leading-[1] max-w-60">
                        <div className="flex items-center gap-2">
                          <img src={getAMCIconPath(fund.name)} alt={fund.name} className="w-6 h-6" />
                          <span className="line-clamp-1">{fund.name}</span>
                        </div>
                      </td>
                      <td className="p-3">{fund.fund_category}</td>
                      <td className="p-3">{fund.isin}</td>
                      <td className="p-3">{fund.min_initial_investment}</td>
                      <td className="p-3">{fund.max_swp_amount}</td>
                      <ActionsDropdown />
                    </tr>
                  ))}
              </tbody>
            </table>

            {filteredFunds.length === 0 && (
              <p className="text-center p-4">No funds found</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default FundList;
