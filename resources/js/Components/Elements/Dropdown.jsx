import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function Dropdown({ label, children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full">
      {/* Trigger */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full px-4 py-2 rounded-lg text-gray-700 hover:bg-purple-100 transition"
      >
        <span>{label}</span>
        {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      {/* Dropdown Content */}
      {open && (
        <div className="mt-1 ml-6 space-y-1">
          {children}
        </div>
      )}
    </div>
  );
}
