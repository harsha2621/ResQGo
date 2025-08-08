import React from "react";

export function Card({ children, className = "" }) {
  return (
    <div className={`bg-white border rounded-lg shadow p-4 ${className}`}>
      {children}
    </div>
  );
}
