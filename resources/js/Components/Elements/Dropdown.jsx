import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function Dropdown({ label, options, value, onChange }) {
  const [open, setOpen] = useState(false);

  const handleSelect = (val) => {
    onChange(val);
    setOpen(false); // tutup dropdown setelah pilih
  };

  return (
    <div className="relative inline-block text-left w-40">
      {/* Trigger */}
      <button
        onClick={() => setOpen(!open)}
        className="flex cursor-pointer items-center justify-between w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-700 bg-white hover:bg-purple-50 transition"
      >
        <span>
          {
            // tampilkan label dari object, atau langsung value/string
            options.find((opt) =>
              typeof opt === "object" ? opt.value === value : opt === value
            )?.label || value || label
          }
        </span>
        {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      {/* Dropdown Content */}
      {open && (
        <div className="absolute mt-2 w-full bg-white border rounded-lg shadow-lg z-10">
          {options.map((option, i) => {
            const isObject = typeof option === "object";
            const val = isObject ? option.value : option;
            const text = isObject ? option.label : option;

            return (
              <button
                key={i}
                onClick={() => handleSelect(val)}
                className={`block cursor-pointer w-full px-3 py-2 text-left rounded-lg transition ${
                  value === val
                    ? "bg-purple-200 text-purple-700 font-medium"
                    : "text-gray-600 hover:bg-purple-50"
                }`}
              >
                {text}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
