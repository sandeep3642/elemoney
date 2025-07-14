import { useState, useRef, useEffect } from "react";

const ActionsDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <td className="p-3 relative flex justify-center" ref={dropdownRef}>
      <button
        className="hover:text-gray-800 px-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        ⋮
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-6 w-40 bg-white border rounded shadow-md z-10">
          <ul className="py-2 text-sm text-gray-700">
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">View Details</li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Edit</li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500">Delete</li>
          </ul>
        </div>
      )}
    </td>
  );
};

export default ActionsDropdown;
