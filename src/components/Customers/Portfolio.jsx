import { CustomerData1 } from "../../static";

const Portfolio = () => {

          const filteredData1 = CustomerData1.filter(item =>
            item.Fundname.toLowerCase()
          );

return (
    <>
    
            <h2 className="text-xl font-semibold mb-4">Customer Portfolio</h2>

<div className="border border-[#ddd] rounded-lg bg-white py-4">
<p className="text-gray-600 mb-4 px-4">Overview of customer's investments</p>

<div className="overflow-x-auto">
<table className="w-full border-collapse border-[#ddd] text-sm">
          <thead>
            <tr className="text-left  border-b border-[#ddd]">
              <th className="p-3 font-semibold ">Fund Name</th>
              <th className="p-3 font-semibold ">Invested Amount</th>
              <th className="p-3 font-semibold ">Units</th>
              <th className="p-3 font-semibold ">Current Value</th>
              <th className="p-3 font-semibold ">Growth</th>
            </tr>
          </thead>
          <tbody>
            {filteredData1.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50 border-b border-[#ddd] border-dotted">
                <td className="p-3">{item.Fundname}</td>
                <td className="p-3">{item.Investedamount}</td>
                <td className="p-3">{item.Units}</td>
                <td className="p-3">{item.Currentvalue}</td>
                <td className="p-3 text-green-500">{item.Growth}</td>
              </tr>
            ))}
          </tbody>
</table>
</div>
</div>
</>
)
}

export default Portfolio