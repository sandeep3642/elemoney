import { FiMoreVertical } from "react-icons/fi";
import { InvestData } from "../../static"
import { PieChart, Pie, Cell, Tooltip } from "recharts";


// Custom label function to position labels inside the pie slices
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5; // Position inside the slice
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="black"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={12}
      fontWeight="bold"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
const InvestedAMC = () => {

  return (
    <div className="flex-1/2 ">
      <h2 className="font-semibold mb-2">(AMC wise investment)</h2>
      <div className="flex flex-col items-center p-4 rounded-lg border border-[#ddd]">
        <div className="flex justify-between items-center mb-6 w-full">
          <p className="text-sm ">(Monthly customer acquisition)</p>
          <button><FiMoreVertical className=" cursor-pointer" /></button>
        </div>
        <div className="flex items-center">
          <PieChart width={400} height={280}>
            <Pie
              data={InvestData}
              cx="50%"
              cy="50%"
              outerRadius={130}
              dataKey="value"
              label={renderCustomizedLabel}
              labelLine={false}
            >
              {InvestData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
          <div className="mt-4 flex flex-col gap-2">
            {InvestData.map((entry, index) => (
              <div key={index} className="flex items-center gap-2 rounded py-[3px] px-2 text-sm font-medium text-gray-800 justify-center" style={{ backgroundColor: entry.color }}>

                <span>{entry.name}</span>
              </div>

            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default InvestedAMC