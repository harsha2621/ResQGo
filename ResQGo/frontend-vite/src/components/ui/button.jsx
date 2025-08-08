import React from "react";

export function Button({ onClick, children, className = "", variant = "primary" }) {
  const baseStyles =
    variant === "primary"
      ? "bg-blue-600 hover:bg-blue-700 text-white"
      : variant === "emergency"
      ? "bg-red-600 hover:bg-red-700 text-white"
      : "border border-gray-300 text-gray-800";

  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded ${baseStyles} ${className}`}
    >
      {children}
    </button>
  );
}
