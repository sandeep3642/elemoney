import React from 'react'

const FundInfo = () => {
  return (
    <div className="border border-[#ddd] rounded-lg  bg-white">
      <h2 className="text-lg font-semibold py-3.5 px-6">Motilal Oswal Mutual Fund</h2>

      <div className="border-t border-gray-300">
        <div className="grid grid-cols-3 border-b border-gray-300 py-3.5 px-6">
          <span className="font-medium">Rank (total assets)</span>
          <span className='col-span-2'>#19 in India</span>
        </div>
        <div className="grid grid-cols-3 border-b border-gray-300 py-3.5 px-6">
          <span className="font-medium">Total assets under management</span>
          <span className='col-span-2'>₹61,382 Cr</span>
        </div>
        <div className="grid grid-cols-3 border-b border-gray-300 py-3.5 px-6">
          <span className="font-medium">Date of incorporation</span>
          <span className='col-span-2'>29 December, 2009</span>
        </div>
      </div>

      <div className="py-3.5 px-6">
        <h3 className="font-semibold">Investment Objective</h3>
        <div className="flex items-start mt-2">
          <img src="/images/11.svg" alt="Motilal Oswal Logo" className="w-11 h-11 mr-3" />
          <p className="text-sm">
            The schema seeks to achieve long-term capital appreciation by investing in a maximum of 30 quality mid-cap companies
            having long-term competitive advantages and potential for growth.
          </p>
        </div>
      </div>
    </div>
  )
}

export default FundInfo