import React from 'react'

const TaxExitLoad = () => {
  return (
    <div className="border border-[#ddd] rounded-lg bg-white">
      <h2 className="text-lg font-semibold py-3.5 px-6">Taxes</h2>

      <div className="border-t border-gray-300">
        <div className="grid grid-cols-4 border-b border-gray-300 py-3.5 px-6">
          <span className="font-medium">Units held less than 1Y</span>
          <span className="col-span-3">20.00%</span>
        </div>
        <div className="grid grid-cols-4 border-b border-gray-300 py-3.5 px-6">
          <span className="font-medium">Units held more than 1Y</span>
          <span className="col-span-3">12.00%</span>
        </div>
      </div>

      <h2 className="text-lg font-semibold py-3.5 px-6 border-b border-gray-300">Exit Load</h2>

      <div>
        <div className="grid grid-cols-4 border-b border-gray-300 py-3.5 px-6">
          <span className="font-medium">If units sold before 1Y</span>
          <span className="col-span-3">1%</span>
        </div>
        <div className="grid grid-cols-4 py-3.5 px-6">
          <span className="font-medium">If units sold after 1Y</span>
          <span className="col-span-3">0%</span>
        </div>
      </div>
    </div>
  )
}

export default TaxExitLoad