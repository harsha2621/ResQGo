import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AmbulanceForm() {
  const [ambulanceData, setAmbulanceData] = useState({
    vehicleNumber: "",
    driverName: "",
    contactNumber: "",
    location: "",
    status: "",
    organizationId: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [ambulances, setAmbulances] = useState([]);

  // Load ambulances on component mount
  useEffect(() => {
    fetchAmbulances();
  }, []);

  const fetchAmbulances = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/ambulance/all");
      setAmbulances(res.data);
    } catch (err) {
      console.error("Failed to fetch ambulances", err);
    }
  };

  const handleChange = (e) => {
    setAmbulanceData({ ...ambulanceData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...ambulanceData,
      organizationId: ambulanceData.organizationId.trim() === "" ? null : ambulanceData.organizationId,
    };

    try {
      if (editingId) {
        await axios.put(`http://localhost:8080/api/ambulance/${editingId}`, payload);
        alert("✅ Ambulance updated successfully!");
      } else {
        await axios.post("http://localhost:8080/api/ambulance/add", payload);
        alert("✅ Ambulance added successfully!");
      }

      setAmbulanceData({
        vehicleNumber: "",
        driverName: "",
        contactNumber: "",
        location: "",
        status: "",
        organizationId: "",
      });
      setEditingId(null);
      fetchAmbulances();
    } catch (err) {
      console.error("Error saving ambulance", err);
      alert("❌ Failed to save ambulance");
    }
  };

  const handleEdit = (amb) => {
    setAmbulanceData({
      vehicleNumber: amb.vehicleNumber,
      driverName: amb.driverName,
      contactNumber: amb.contactNumber,
      location: amb.location,
      status: amb.status,
      organizationId: amb.organization?.id || "",
    });
    setEditingId(amb.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this ambulance?")) {
      try {
        await axios.delete(`http://localhost:8080/api/ambulance/${id}`);
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
      vehicleNumber: "",
      driverName: "",
      contactNumber: "",
      location: "",
      status: "",
      organizationId: "",
    });
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6">
      <h2 className="text-2xl font-bold mb-4">
        {editingId ? "Update Ambulance" : "Add Ambulance"}
      </h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        <input
          type="text"
          name="vehicleNumber"
          placeholder="Vehicle Number"
          value={ambulanceData.vehicleNumber}
          onChange={handleChange}
          required
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="driverName"
          placeholder="Driver Name"
          value={ambulanceData.driverName}
          onChange={handleChange}
          required
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="contactNumber"
          placeholder="Contact Number"
          value={ambulanceData.contactNumber}
          onChange={handleChange}
          required
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={ambulanceData.location}
          onChange={handleChange}
          required
          className="p-2 border rounded"
        />
        <select
          name="status"
          value={ambulanceData.status}
          onChange={handleChange}
          required
          className="p-2 border rounded"
        >
          <option value="">Select Status</option>
          <option value="AVAILABLE">Available</option>
          <option value="ON_TRIP">On Trip</option>
          <option value="MAINTENANCE">Maintenance</option>
        </select>
        <input
          type="number"
          name="organizationId"
          placeholder="Organization ID"
          value={ambulanceData.organizationId}
          onChange={handleChange}
          className="p-2 border rounded"
        />

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
              <th className="p-3 border">Vehicle No</th>
              <th className="p-3 border">Driver</th>
              <th className="p-3 border">Contact</th>
              <th className="p-3 border">Location</th>
              <th className="p-3 border">Status</th>
              <th className="p-3 border">Organization</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {ambulances.map((amb) => (
              <tr key={amb.id} className="border-t">
                <td className="p-3 border">{amb.vehicleNumber}</td>
                <td className="p-3 border">{amb.driverName}</td>
                <td className="p-3 border">{amb.contactNumber}</td>
                <td className="p-3 border">{amb.location}</td>
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
  );
}
