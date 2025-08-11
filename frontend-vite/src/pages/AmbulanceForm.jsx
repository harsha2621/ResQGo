import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../components/layout/AdminLayout";

// Configure axios defaults
const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add auth token to requests
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

export default function AmbulanceForm() {
  const [ambulanceData, setAmbulanceData] = useState({
    ambulanceNumber: "",
    type: "",
    status: "",
    driverId: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [ambulances, setAmbulances] = useState([]);
  const [drivers, setDrivers] = useState([]);

  // Load ambulances and drivers on component mount
  useEffect(() => {
    fetchAmbulances();
    fetchDrivers();
  }, []);

  const fetchAmbulances = async () => {
    try {
      const res = await api.get("/ambulances");
      setAmbulances(res.data);
    } catch (err) {
      console.error("Failed to fetch ambulances", err);
    }
  };

  const fetchDrivers = async () => {
    try {
      const res = await api.get("/api/user?role=DRIVER");
      setDrivers(res.data);
    } catch (err) {
      console.error("Failed to fetch drivers", err);
    }
  };

  const handleChange = (e) => {
    setAmbulanceData({ ...ambulanceData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ambulanceNumber: ambulanceData.ambulanceNumber,
      type: ambulanceData.type,
      status: ambulanceData.status,
      driverId: parseInt(ambulanceData.driverId),
      // Don't send latitude/longitude - that's driver's responsibility
    };

    try {
      if (editingId) {
        await api.put(`/ambulances/${editingId}`, payload);
        alert("✅ Ambulance updated successfully!");
      } else {
        await api.post("/ambulances", payload);
        alert("✅ Ambulance added successfully!");
      }

      setAmbulanceData({
        ambulanceNumber: "",
        type: "",
        status: "",
        driverId: "",
      });
      setEditingId(null);
      fetchAmbulances();
    } catch (err) {
      console.error("Error saving ambulance", err);
      console.error("Error response:", err.response);
      const errorMessage = err.response?.data?.message || "Failed to save ambulance";
      alert(`❌ ${errorMessage}`);
    }
  };

  const handleEdit = (amb) => {
    setAmbulanceData({
      ambulanceNumber: amb.ambulanceNumber,
      type: amb.type,
      status: amb.status,
      driverId: amb.driver?.id || "",
    });
    setEditingId(amb.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this ambulance?")) {
      try {
        await api.delete(`/ambulances/${id}`);
        alert("✅ Deleted successfully");
        fetchAmbulances();
      } catch (err) {
        console.error("Delete failed", err);
        alert("❌ Failed to delete ambulance");
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setAmbulanceData({
      ambulanceNumber: "",
      type: "",
      status: "",
      driverId: "",
    });
  };

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">
          {editingId ? "Update Ambulance" : "Add Ambulance"}
        </h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        <input
          type="text"
          name="ambulanceNumber"
          placeholder="Ambulance Number"
          value={ambulanceData.ambulanceNumber}
          onChange={handleChange}
          required
          className="p-2 border rounded"
        />
        <select
          name="type"
          value={ambulanceData.type}
          onChange={handleChange}
          required
          className="p-2 border rounded"
        >
          <option value="">Select Type</option>
          <option value="BASIC">Basic</option>
          <option value="ICU">ICU</option>
        </select>
        <select
          name="driverId"
          value={ambulanceData.driverId}
          onChange={handleChange}
          required
          className="p-2 border rounded"
        >
          <option value="">Select Driver</option>
          {drivers.map(driver => (
            <option key={driver.id} value={driver.id}>
              {driver.name} - {driver.email}
            </option>
          ))}
        </select>
        <select
          name="status"
          value={ambulanceData.status}
          onChange={handleChange}
          required
          className="p-2 border rounded"
        >
          <option value="">Select Status</option>
          <option value="AVAILABLE">Available</option>
          <option value="BUSY">Busy</option>
          <option value="MAINTENANCE">Maintenance</option>
        </select>

        <div className="col-span-2 flex gap-4 mt-2">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded"
          >
            {editingId ? "Update" : "Add"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <h3 className="text-xl font-semibold mb-2">Ambulances</h3>
      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded shadow text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border">Ambulance No</th>
              <th className="p-3 border">Type</th>
              <th className="p-3 border">Driver</th>
              <th className="p-3 border">Location</th>
              <th className="p-3 border">Status</th>
              <th className="p-3 border">Organization</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {ambulances.map((amb) => (
              <tr key={amb.id} className="border-t">
                <td className="p-3 border">{amb.ambulanceNumber}</td>
                <td className="p-3 border">{amb.type}</td>
                <td className="p-3 border">{amb.driver?.name || "—"}</td>
                <td className="p-3 border">{amb.currentLocation?.name || "—"}</td>
                <td className="p-3 border">{amb.status}</td>
                <td className="p-3 border">{amb.organization?.orgName || "—"}</td>
                <td className="p-3 border flex gap-2">
                  <button
                    onClick={() => handleEdit(amb)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(amb.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {ambulances.length === 0 && (
              <tr>
                <td className="p-3 border text-center" colSpan="7">
                  No ambulances found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    </AdminLayout>
  );
}
