import { Portfolio1 } from "../../static";

const Portfolio = () => {

          const filteredData2 = Portfolio1.filter(item =>
            item.DocumentName.toLowerCase()
          );

return (
    <>
    
<h2 className="text-xl font-semibold mb-4">Customer Documents</h2>

<div className="border border-[#ddd] rounded-lg bg-white py-4">
<p className="text-gray-600 mb-4 px-4">KYC and other important documents</p>

<div className="overflow-x-auto">
<table className="w-full border-collapse border-[#ddd] text-sm">
          <thead>
            <tr className="text-left  border-b border-[#ddd]">
              <th className="p-3 font-semibold ">Document Name</th>
              <th className="p-3 font-semibold ">Type</th>
              <th className="p-3 font-semibold ">Status</th>
              <th className="p-3 font-semibold ">Upload Date</th>
              <th className="p-3 font-semibold ">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData2.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50 border-b border-[#ddd] border-dotted">
                <td className="p-3">{item.DocumentName}</td>
                <td className="p-3">{item.Type}</td>
                <td className="p-3"><span className="badge bg-green-600 px-3 py-1 rounded-full text-white">{item.status}</span></td>
                <td className="p-3">{item.UploadDate}</td>
                <td className="p-3">{item.Action}</td>
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