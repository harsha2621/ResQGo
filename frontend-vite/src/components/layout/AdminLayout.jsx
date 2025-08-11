import React from 'react';
import Sidebar from '../admin/Sidebar';

export default function AdminLayout({ children }) {
  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Sidebar />
      <div className="flex-1 p-8 overflow-y-auto ml-64 transition-all duration-300">
        {children}
      </div>
    </div>
  );
}