import { FiMoreVertical } from "react-icons/fi"
import { FundsData } from "../../static"


const TopSellingFunds = () => {
  return (
    <div className="flex-1/2 flex-col flex">
      <h2 className="font-semibold mb-2">Funds with highest AUM</h2>
      <div className="p-4 border border-[#ddd] rounded-lg flex-1">
        <div className="flex justify-between items-center mb-6 w-full">
          <p className="text-sm ">Funds with highest AUM</p>
          <button><FiMoreVertical className=" cursor-pointer" /></button>
        </div>
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-[#ddd] text-xs text-left">
              <th className="p-2">Fund Name</th>
              <th className="p-2">AUM</th>
              <th className="p-2">Returns</th>
              <th className="p-2">Investors</th>
            </tr>
          </thead>
          <tbody>
            {FundsData.slice(0, 5).map((fund, index) => (
              <tr key={index} className="border-b border-dashed border-[#ddd] last:border-none text-sm">
                <td className="p-2 font-semibold">{fund.name}</td>
                <td className="p-2">{fund.aum}</td>
                <td className="p-2 text-green-600 font-semibold">{fund.returns}</td>
                <td className="p-2">{fund.investors}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TopSellingFunds