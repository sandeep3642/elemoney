import React from 'react'
import { customerData } from '../../static'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { FiMoreVertical } from "react-icons/fi";
const CustomerGrowthChart = () => {
  return (
    <div className=' flex-1/2'>
      <h3 className="font-bold text-black mb-2">Customer Growth</h3>

      <div className="rounded-lg p-5 border border-[#ddd] ">
        <div className="flex justify-between items-center mb-6">
          <p className="text-sm ">(Monthly customer acquisition)</p>
          <button><FiMoreVertical className=" cursor-pointer" /></button>
        </div>

        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={customerData} barSize={6} barGap={25}>
          <CartesianGrid strokeArray="3 3" strokeOpacity={0.2} vertical={false} />  {/* Light background lines */}
            <XAxis dataKey="month" />
            <YAxis
              domain={[0, 25000]}
              tickCount={8}
              interval="preserveStartEnd"
              tickFormatter={(value) => `${value / 1000}k`} />
            <Tooltip />
            <Bar dataKey="customers" fill="green" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default CustomerGrowthChart