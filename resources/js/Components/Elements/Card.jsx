import React from "react";

export default function Card({ children, className = "" }) {
  return (
    <div
      className={`rounded-xl shadow-md p-6 transition hover:shadow-lg ${className}`}
    >
      {children}
    </div>
  );
}
