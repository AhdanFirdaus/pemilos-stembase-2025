// Components/Elements/Dropdown.jsx
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function Dropdown({ label, options, value, onChange }) {
  const [open, setOpen] = useState(false);

  const handleSelect = (option) => {
    onChange(option);
    setOpen(false); // tutup dropdown setelah pilih
  };

  return (
    <div className="relative inline-block text-left w-40">
      {/* Trigger */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-700 bg-white hover:bg-purple-50 transition"
      >
        <span>{value || label}</span>
        {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      {/* Dropdown Content */}
      {open && (
        <div className="absolute mt-2 w-full bg-white border rounded-lg shadow-lg z-10">
          {options.map((option, i) => (
            <button
              key={i}
              onClick={() => handleSelect(option)}
              className={`block w-full px-3 py-2 text-left rounded-lg transition ${
                value === option
                  ? "bg-purple-200 text-purple-700 font-medium"
                  : "text-gray-600 hover:bg-purple-50"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
