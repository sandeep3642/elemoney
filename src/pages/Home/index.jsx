import React from 'react'
import { BsSearch } from "react-icons/bs";
import { stats } from '../../static';
import CustomerGrowthChart from '../../components/Home/CustomerGrowthChart';
import InvestmentGrowthChart from '../../components/Home/InvestmentGrowthChart';
import InvestedAMC from '../../components/Home/InvestedAMC';
import TopSellingFunds from '../../components/Home/TopSellingFunds';
import SubAdmin from '../SubAdmin';

const Home = () => {
  return (
    < section className="p-6 border border-[#ddd] rounded-lg" >
      <div className='flex justify-between items-center'>
        <h2 className="text-sm text-gray-800  mb-4">Dashboard</h2>
        <div className="relative flex-1 max-w-[232px]">
          <BsSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 " size={18} />
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-4 py-2.5 bg-white  border border-[#ddd]  rounded-lg text-sm outline-none focus:ring focus:ring-blue-400"
          />
        </div>
      </div>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-lg p-5 border border-[#ddd]"
          >
            <div className="flex items-center space-x-3">
              <div className="bg-gray-100 p-3 rounded-full flex items-center justify-center">
                <span className="text-2xl text-gray-800">{stat.icon}</span>
              </div>
            </div>
            <h3 className="mt-4  font-medium">{stat.title}</h3>
            <div className='flex items-center gap-2 mt-2'>
              <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              <span className="px-2 py-1 text-xs font-medium bg-light-green text-green rounded-full">
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className='charts flex gap-5 w-full mt-5'>
        <CustomerGrowthChart />
        <InvestmentGrowthChart />
      </div>
      <div className='mt-4 flex gap-5 items-stretch'>
        <InvestedAMC />
        <TopSellingFunds />
      </div>
    </section >
  )
}

export default Home