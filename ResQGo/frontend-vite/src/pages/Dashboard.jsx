import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";

import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Plus, Phone, MapPin, Heart, Clock, History } from "lucide-react";
import { CTASection } from "../components/layout/CTASection";
import { WhyChooseUs } from "../components/layout/WhyChooseUs";
import Hero from "../components/layout/Hero";


export default function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const [recentTrips] = useState([
    {
      id: 1,
      date: "2024-01-15",
      from: "123 Main St",
      to: "City Hospital",
      status: "completed",
      ambulanceType: "ALS",
    },
    {
      id: 2,
      date: "2024-01-10",
      from: "456 Oak Ave",
      to: "Emergency Center",
      status: "cancelled",
      ambulanceType: "BLS",
    },
  ]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      if (userData.role !== "user") {
        navigate("/admin");
        return;
      }
      setUser(userData);
    } else {
      setUser({ name: "Test User", role: "user" });
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  if (!user) return null;

  const stats = [
    {
      title: "Emergency Bookings",
      value: "2",
      icon: <Heart className="text-blue-500" />,
    },
    {
      title: "Response Time",
      value: "6 min",
      icon: <Clock className="text-red-500" />,
    },
    {
      title: "Service Areas",
      value: "3",
      icon: <MapPin className="text-green-500" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar user={user} onLogout={handleLogout} />

      {/* Hero Section
      <div
        className="relative bg-cover bg-center h-64 rounded-xl shadow-lg overflow-hidden mx-4 mt-6"
        style={{ backgroundImage: 'url(/images/emergency-bg.jpg)' }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h2 className="text-3xl text-white font-bold">Welcome to ResQGo</h2>
        </div>
      </div>

      <div className="max-w-6xl mx-auto py-10 px-4">
        <h2 className="text-4xl font-extrabold bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent mb-6">
          Dashboard
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <Card className="hover:shadow-xl transition duration-300 group cursor-pointer">
            <img
              src="/images/ambulance-bg.jpg"
              alt="Ambulance"
              className="w-full h-40 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
            />
            <div className="p-4">
              <div className="flex items-center gap-2 text-blue-600 mb-2">
                <Plus size={20} />
                <h3 className="font-bold">Book Emergency Ambulance</h3>
              </div>
              <p className="text-sm text-gray-500 mb-4">
                Request an ambulance for immediate emergency transport
              </p>
              <Button variant="emergency" onClick={() => navigate("/book")}
                className="hover:scale-105 transition-transform">
                Book Now
              </Button>
            </div>
          </Card>

          <Card className="hover:shadow-xl transition duration-300 group cursor-pointer">
            <img
              src="/images/hotline.jpg"
              alt="Hotline"
              className="w-full h-40 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
            />
            <div className="p-4">
              <div className="flex items-center gap-2 text-red-600 mb-2">
                <Phone size={20} />
                <h3 className="font-bold">Emergency Hotline</h3>
              </div>
              <p className="text-sm text-gray-500 mb-4">
                Call directly for immediate emergency assistance
              </p>
              <Button className="hover:scale-105 transition-transform">Call 911</Button>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {stats.map((stat, i) => (
            <Card
              key={i}
              className="p-4 hover:shadow-md transition duration-300"
            >
              <div className="flex justify-between items-center">
                <p className="text-sm font-medium">{stat.title}</p>
                <div className="bg-blue-100 p-2 rounded-full">{stat.icon}</div>
              </div>
              <p className="text-xl font-bold mt-2">{stat.value}</p>
            </Card>
          ))}
        </div>

        <Card className="hover:shadow-md transition duration-300">
          <div className="flex items-center gap-2 mb-4 p-4">
            <History size={20} />
            <h3 className="text-lg font-semibold">Recent Trips</h3>
          </div>
          <div className="space-y-4 px-4 pb-4">
            {recentTrips.map((trip) => (
              <div
                key={trip.id}
                className="flex justify-between items-center p-3 border rounded hover:bg-gray-50"
              >
                <div>
                  <p className="font-medium">
                    {trip.from} → {trip.to}
                  </p>
                  <p className="text-sm text-gray-500">
                    {trip.date} • {trip.ambulanceType}
                  </p>
                </div>
                <span
                  className={`text-xs px-3 py-1 rounded-full ${
                    trip.status === "completed"
                      ? "bg-green-100 text-green-600"
                      : trip.status === "cancelled"
                      ? "bg-red-100 text-red-600"
                      : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  {trip.status}
                </span>
              </div>
            ))}
          </div>
        </Card>
        
      </div> */}
       <Hero />
      <WhyChooseUs />
      <CTASection />
    </div>
  );
}
