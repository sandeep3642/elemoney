import React from 'react';

const CheckBox = ({ label, name, disabled, checked, className }) => {
  return (
    <label className="flex items-center relative cursor-pointer">
      <input
        type="checkbox"
        id={name} // Add id for accessibility
        disabled={disabled}
        checked={checked}
        onChange={() => {}} // Placeholder for onChange, can be handled in parent
        className={`peer h-5 w-5 cursor-pointer transition-all appearance-none rounded-sm border-2 !border-[#606060] checked:bg-primary-black checked:!border-primary-black ${className}`}
      />
      {/* Checkmark Icon - Only Visible When Checked */}
      <span className="absolute opacity-0 peer-checked:opacity-100 text-white top-1/2 left-[3px] transform -translate-y-1/2 pointer-events-none">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" strokeWidth="1">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
        </svg>
      </span>
      <span>{label}</span>
    </label>
  );
};

export default CheckBox;