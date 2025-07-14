import React from 'react'
import { investmentData } from '../../static'
import { XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area, CartesianGrid } from "recharts";
import { FiMoreVertical } from "react-icons/fi";

const InvestmentGrowthChart = () => {
  return (
    <div className=' flex-1/2'>
      <h3 className="font-bold text-black mb-2">Investment Growth</h3>

      <div className="rounded-lg p-5 border border-[#ddd] ">

        <div className="flex justify-between items-center mb-6">
          <p className="text-sm ">(Monthly investment inflow)</p>
          <button><FiMoreVertical className=" cursor-pointer" /></button>
        </div>

        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={investmentData}>
            <defs>
              <linearGradient id="colorInvestment" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="green" stopOpacity={0.3} />
                <stop offset="95%" stopColor="green" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeArray="3 3" strokeOpacity={0.2} vertical={false} />  {/* Light background lines */}
            <XAxis dataKey="month" />
            <YAxis tickFormatter={(value) => `₹${value / 1000}k`} />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="investment"
              stroke="green"
              fill="url(#colorInvestment)"
              strokeWidth={2}
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default InvestmentGrowthChart