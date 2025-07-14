import React, { useState } from 'react'
import FundList from '../../components/Funds/FundList';
import AMCList from '../../components/Funds/AMCList';
import CategoryList from '../../components/Funds/CategoryList';
import { FaPlus } from 'react-icons/fa';
import MutualFundsList from '../../components/MutualFunds/MutualFundsList';
import MutualFundsDetails from '../../components/MutualFunds/MutualFundsDetails';

const FundsPage = () => {
    const [activeTab, setActiveTab] = useState("FundList");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [screen, setScreen] = useState(1);
    const tabs = [
        { id: "FundList", label: "Fund List", content: <FundList /> },
        { id: "AMC", label: "AMC", content: <AMCList setScreen={setScreen} /> },
        { id: "Category", label: "Category", content: <CategoryList isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} /> }
    ];


    return (
        <>
            {/* screen 1: User Details */}
            {screen === 1 && (
                <div>
                    {/* Tabs */}
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
                        {activeTab === "Category" && (
                            <div className="mt-4">
                                <button className="btn btn-primary flex gap-2 items-center" onClick={() => setIsModalOpen(true)}>   
                                    <FaPlus /> Add Category
                                </button>
                            </div>
                        )}
                    </div>
                    {/* Tab Content */}
                    <div className="mt-4 text-gray-700">
                        {tabs.find((tab) => tab.id === activeTab)?.content}
                    </div>
                </div>)}
            {screen === 2 && <MutualFundsList setScreen={setScreen} />}
            {screen === 3 && <MutualFundsDetails />}
        </>
    )
}

export default FundsPage