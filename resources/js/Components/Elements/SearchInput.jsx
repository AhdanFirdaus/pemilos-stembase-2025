import React from "react";
import { Search } from "lucide-react";

export default function SearchInput({ placeholder = "Search", className = "", ...props }) {
  return (
    <div className={`relative ${className}`}>
      <input
        type="text"
        placeholder={placeholder}
        className="border rounded-lg pl-8 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
        {...props}
      />
      <Search
        size={16}
        className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400"
      />
    </div>
  );
}