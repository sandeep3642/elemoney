import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { FiShare2 } from "react-icons/fi";


const fundData = [
    { date: "Jan", value: 20 },
    { date: "Feb", value: 30 },
    { date: "Mar", value: 50 },
    { date: "Apr", value: 40 },
    { date: "May", value: 60 },
    { date: "Jun", value: 70 },
    { date: "Jul", value: 90 },
    { date: "Aug", value: 100 },
    { date: "Sep", value: 120 },
    { date: "Oct", value: 140 },
    { date: "Nov", value: 160 },
    { date: "Dec", value: 150 },
];

const MutualFundChart = () => {
    
    return (
        <div className="p-4 w-full">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                    <img
                        src="/images/11.svg"
                        alt="Motilal Oswal"
                        className="w-16 h-16 rounded"
                    />
                    <div>
                        <h3 className="text-lg font-semibold">Motilal Oswal Mutual Fund</h3>
                        <div className="flex gap-5 mt-1">
                            <span className="px-2 py-1 text-xs border border-[#8C8C8C] text-[#696969] rounded-full">Equity</span>
                            <span className="px-2 py-1 text-xs border border-[#8C8C8C] text-[#696969] rounded-full">Mid cap</span>
                            <span className="px-2 py-1 text-xs border border-[#8C8C8C] text-[#696969] rounded-full">Very High Risk</span>
                        </div>
                    </div>
                </div>
                <FiShare2 className="text-gray-500 text-xl cursor-pointer" />
            </div>

            {/* Stats */}
            <div className="flex items-center gap-4 mb-4">
                <span className="text-2xl font-bold">29.24%</span>
                <span className="text-gray-500 text-sm">3Y annualised</span>
                <span className="text-green-500 text-sm">+1.47% 1D</span>
            </div>

            {/* Chart */}
            <div className=" bg-white pt-4">

                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={fundData}>
                        <XAxis dataKey="date" hide />
                        <YAxis hide />
                        <Tooltip formatter={(value) => `₹${value}`} />
                        <Line type="monotone" dataKey="value" stroke="#00C49F" strokeWidth={2} dot={false} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
            {/* Footer Info */}
            <div className="flex justify-between mt-4 text-sm text-gray-600">
                <div>
                    <div className="flex gap-10 justify-between mb-2">
                        <p>NAV: 11 Mar 25</p>
                        <p className="font-bold">₹102.01</p>
                    </div>

                    <div className="flex gap-10 justify-between">
                        <p>Min SIP amount</p>
                        <p className="font-bold">₹500</p>
                    </div>
                </div>
                <div>
                    <div className="flex gap-10 justify-between mb-2">
                        <p>Ratings</p>
                        <p className="font-bold">5 ★</p>
                    </div>
                    <div className="flex gap-10 justify-between">
                        <p>Fund Size</p>
                        <p className="font-bold">₹23,703.68 Cr</p>
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default MutualFundChart;
