import React from "react";

export default function Button({ children, variant = "primary", className = "", ...props }) {
  const base =
    "inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition focus:outline-none";

  const variants = {
    primary: "bg-[#C8B6FF] text-white hover:bg-[#7D52FF]",
    secondary: "bg-gray-200 text-gray-700 hover:bg-gray-300",
    danger: "bg-pink-200 text-pink-600 hover:bg-pink-300",
    green: "bg-[#A8E6CF] text-white hover:bg-[#8CCFB1]",
    red: "bg-[#F275A1] text-white hover:bg-[#D95C8A]",
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}