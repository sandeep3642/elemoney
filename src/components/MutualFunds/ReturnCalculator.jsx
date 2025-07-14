import React, { useState } from "react";

const ReturnCalculator = () => {
  const [investmentType, setInvestmentType] = useState("sip");
  const [amount, setAmount] = useState(500);
  const [years, setYears] = useState(3);
  const [result, setResult] = useState(null);

  const calculateReturns = () => {
    const annualRate = 0.2924; // 29.24% Motilal Oswal return
    const compoundingPeriods = investmentType === "sip" ? 12 : 365;
    const totalMonths = years * 12;
    const totalDays = years * 365;

    let futureValue = 0;

    if (investmentType === "sip") {
      // SIP Future Value Formula with 12 compounding periods per year
      const monthlyRate = annualRate / 12;
      futureValue = amount * (((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) * (1 + monthlyRate));
    } else {
      // Lump Sum Future Value with daily compounding (365 per year)
      const dailyRate = annualRate / 365;
      futureValue = amount * Math.pow(1 + dailyRate, totalDays);
    }

    const totalInvested = investmentType === "sip" ? amount * totalMonths : amount;
    const percentageGain = ((futureValue - totalInvested) / totalInvested) * 100;

    setResult({ futureValue: futureValue.toFixed(2), percentageGain: percentageGain.toFixed(2) });
  };

  return (
    <div className="p-6 bg-white border border-[#ddd] rounded-md">
      {/* Toggle Buttons */}
      <div className="flex space-x-2 mb-4">
        <button
          className={`px-6 py-2 rounded-xl ${investmentType === "sip" ? "bg-black text-white" : "bg-transparent border-black border"}`}
          onClick={() => setInvestmentType("sip")}
        >
          Monthly SIP
        </button>
        <button
          className={`px-6 py-2 rounded-xl ${investmentType === "one-time" ? "bg-black text-white" : "bg-transparent border-black border"}`}
          onClick={() => setInvestmentType("one-time")}
        >
          One-Time
        </button>
      </div>

      {/* Investment Amount */}
      <div className="mb-4">
        <label className="font-semibold text-lg">₹</label>
        <input
          type="number"
          value={amount}
          min="500"
          onChange={(e) => setAmount(Number(e.target.value))}
          className="border-b border-black text-lg outline-none w-1/2 mx-2 mr-4 appearance-none"
        />
        {/* Calculate Button */}
        <button onClick={calculateReturns} className="text-lg font-semibold mb-4">
          Calculate
        </button>
        <span className="text-gray block mt-2">Min. amount ₹500</span>
      </div>

      {/* Year Selection */}
      <div className="flex space-x-2 mb-4">
        {[1, 3, 5, 10].map((yr) => (
          <button
            key={yr}
            className={`px-4 py-2 rounded-md ${years === yr ? "bg-black text-white" : "bg-gray-200"}`}
            onClick={() => setYears(yr)}
          >
            {yr}Y
          </button>
        ))}
      </div>



      {/* Results */}
      {result && (
        <div className="mt-4 border-t pt-4">
          <p className="text-lg">
            Would have become <strong>₹{result.futureValue}</strong>{" "}
            <span className="text-green-500">({result.percentageGain}%)</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default ReturnCalculator;
