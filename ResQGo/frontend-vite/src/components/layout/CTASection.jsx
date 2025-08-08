import React from "react";
import { useNavigate } from "react-router-dom";

export function CTASection() {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-red-500 text-white text-center py-16 px-4">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Ready to Access Emergency Care?
      </h2>
      <p className="text-lg mb-8">
        Join thousands of people who trust ResQGo for their emergency medical transport needs
      </p>
      <button
        onClick={() => navigate("/register")}
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-md transition duration-300"
      >
        Create Your Account
      </button>
    </div>
  );
}
