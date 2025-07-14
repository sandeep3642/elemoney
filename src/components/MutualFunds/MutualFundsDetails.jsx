import React, { useState } from 'react'
import MutualFundChart from './MutualFundChart'
import Holdings from "./Holdings";
import FundInfo from "./FundInfo";
import ReturnCalculator from "./ReturnCalculator";
import TaxExitLoad from "./TaxExitLoad";

const tabs = [
    { id: "Holdings", label: "Holdings", content: <Holdings /> },
    { id: "FundInfo", label: "Info", content: <FundInfo /> },
    { id: "ReturnCalculator", label: "Return Calculator", content: <ReturnCalculator /> },
    { id: "TaxExitLoad", label: "Tax and Exit Load", content: <TaxExitLoad /> }
];

const MutualFundsDetails = () => {
    const [activeTab, setActiveTab] = useState("Holdings");
    return (
        <div>
            <MutualFundChart />
            <div>
                {/* Tabs Section */}
                <div className='flex items-end justify-between min-h-[64px]'>
                    <div className="flex border-b-2 border-[#dddddd] w-fit">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id} 
                                className={`py-2 px-4  border-b-4 relative bottom-[-2px]  min-w-[102px] ${activeTab === tab.id
                                    ? "font-semibold text-black border-[#1F1F1F] bg-[#F6F6F6]"
                                    : "hover:text-black border-transparent"
                                    }`}
                                onClick={() => setActiveTab(tab.id)}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tab Content Section */}
                <div className="mt-6 text-gray-700">
                    {tabs.find((tab) => tab.id === activeTab)?.content}
                </div>
            </div>
        </div>
    )
}

export default MutualFundsDetails