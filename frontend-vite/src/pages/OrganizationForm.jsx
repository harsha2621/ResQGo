// import React, { useState } from "react";
// import axios from "axios";

// export default function OrganizationForm() {
//   const [orgName, setOrgName] = useState("");
//   const [address, setAddress] = useState("");
//   const [contactNo, setContactNo] = useState("");
//   const [registeredAt, setRegisteredAt] = useState("");
//   const [adminId, setAdminId] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const orgData = {
//       orgName,
//       address,
//       contactNo,
//       registeredAt,
//       adminId: adminId.trim() === "" ? null : adminId
//     };

//     try {
//       await axios.post("http://localhost:8080/api/organization/add", orgData);
//       alert("✅ Organization added successfully!");
//       setOrgName("");
//       setAddress("");
//       setContactNo("");
//       setRegisteredAt("");
//       setAdminId("");
//     } catch (err) {
//       console.error("Error adding organization", err);
//       alert("❌ Failed to add organization");
//     }
//   };

//   return (
//     <div className="max-w-lg mx-auto mt-10 p-6 border rounded shadow">
//       <h2 className="text-2xl font-bold mb-4">Add Organization</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         {/* Organization Name */}
//         <input
//           type="text"
//           placeholder="Organization Name"
//           value={orgName}
//           onChange={(e) => setOrgName(e.target.value)}
//           required
//           className="w-full p-2 border rounded"
//         />

//         {/* Address */}
//         <input
//           type="text"
//           placeholder="Address"
//           value={address}
//           onChange={(e) => setAddress(e.target.value)}
//           required
//           className="w-full p-2 border rounded"
//         />

//         {/* Contact No */}
//         <input
//           type="text"
//           placeholder="Contact No"
//           value={contactNo}
//           onChange={(e) => setContactNo(e.target.value)}
//           required
//           className="w-full p-2 border rounded"
//         />

//         {/* Registered Date */}
//         <input
//           type="date"
//           value={registeredAt}
//           onChange={(e) => setRegisteredAt(e.target.value)}
//           required
//           className="w-full p-2 border rounded"
//         />

//         {/* Admin ID (Optional) */}
//         <input
//           type="number"
//           placeholder="Admin ID (optional)"
//           value={adminId}
//           onChange={(e) => setAdminId(e.target.value)}
//           className="w-full p-2 border rounded"
//         />

//         {/* Submit Button */}
//         <button
//           type="submit"
//           className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
//         >
//           Add Organization
//         </button>
//       </form>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../components/layout/AdminLayout";

export default function OrganizationForm() {
  const [orgData, setOrgData] = useState({
    orgName: "",
    address: "",
    contactNo: "",
    registeredAt: "",
    adminId: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [organizations, setOrganizations] = useState([]);
 const [users, setUsers] = useState([]);
const [selectedOrgId, setSelectedOrgId] = useState("");//added
const [selectedUserId, setSelectedUserId] = useState("");//added

  // Fetch all organizations on load
  useEffect(() => {
    fetchOrganizations();
    fetchUsers();//add this line
  }, []);

  const fetchOrganizations = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/organization/all");
      setOrganizations(res.data);
    } catch (err) {
      console.error("Failed to fetch organizations", err);
    }
  };

  const fetchUsers = async () => {
  try {
    const res = await axios.get("http://localhost:8080/api/user/all");
    setUsers(res.data);
  } catch (err) {
    console.error("Failed to fetch users", err);
  }
};


  const handleChange = (e) => {
    setOrgData({ ...orgData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...orgData,
      adminId: orgData.adminId.trim() === "" ? null : orgData.adminId,
    };

    try {
      if (editingId) {
        // Update
        await axios.put(`http://localhost:8080/api/organization/${editingId}`, payload);
        alert("✅ Organization updated successfully!");
      } else {
        // Add
        await axios.post("http://localhost:8080/api/organization/add", payload);
        alert("✅ Organization added successfully!");
      }

      setOrgData({ orgName: "", address: "", contactNo: "", registeredAt: "", adminId: "" });
      setEditingId(null);
      fetchOrganizations();
    } catch (err) {
      console.error("Error saving organization", err);
      alert("❌ Failed to save organization");
    }
  };

  const handleAssignAdmin = async () => {
  try {
    await axios.put(`http://localhost:8080/api/organization/${selectedOrgId}/assign-admin/${selectedUserId}`);
    alert("✅ Admin assigned successfully");
    fetchOrganizations(); // refresh data
    setSelectedOrgId("");
    setSelectedUserId("");
  } catch (err) {
    console.error("Failed to assign admin", err);
    alert("❌ Failed to assign admin");
  }
};


  const handleEdit = (org) => {
    setOrgData({
      orgName: org.orgName,
      address: org.address,
      contactNo: org.contactNo,
      registeredAt: org.registeredAt.split("T")[0], // format date
      adminId: org.admin?.id || "",
    });
    setEditingId(org.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this organization?")) {
      try {
        await axios.delete(`http://localhost:8080/api/organization/${id}`);
        alert("✅ Deleted successfully");
        fetchOrganizations();
      } catch (err) {
        console.error("Delete failed", err);
        alert("❌ Failed to delete organization");
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setOrgData({ orgName: "", address: "", contactNo: "", registeredAt: "", adminId: "" });
  };

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">
        {editingId ? "Update Organization" : "Add Organization"}
      </h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        <input
          type="text"
          name="orgName"
          placeholder="Organization Name"
          value={orgData.orgName}
          onChange={handleChange}
          required
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={orgData.address}
          onChange={handleChange}
          required
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="contactNo"
          placeholder="Contact No"
          value={orgData.contactNo}
          onChange={handleChange}
          required
          className="p-2 border rounded"
        />
        <input
          type="date"
          name="registeredAt"
          value={orgData.registeredAt}
          onChange={handleChange}
          required
          className="p-2 border rounded"
        />
        <input
          type="number"
          name="adminId"
          placeholder="Admin ID (optional)"
          value={orgData.adminId}
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

      {/* Table */}
      <h3 className="text-xl font-semibold mb-2">Organizations</h3>
      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded shadow text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Address</th>
              <th className="p-3 border">Contact</th>
              <th className="p-3 border">Registered At</th>
              <th className="p-3 border">Admin</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {organizations.map((org) => (
              <tr key={org.id} className="border-t">
                <td className="p-3 border">{org.orgName}</td>
                <td className="p-3 border">{org.address}</td>
                <td className="p-3 border">{org.contactNo}</td>
                <td className="p-3 border">{org.registeredAt?.split("T")[0]}</td>
                <td className="p-3 border">{org.admin?.fullName || "—"}</td>
                <td className="p-3 border flex gap-2">
                  <button
                    onClick={() => handleEdit(org)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(org.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {organizations.length === 0 && (
              <tr>
                <td className="p-3 border text-center" colSpan="6">
                  No organizations found.
                </td>
              </tr>
            )}

          </tbody>
        </table>
        
        {/* Assign Admin Section */}
<div className="mt-10">
  <h3 className="text-xl font-semibold mb-2">Assign Admin to Organization</h3>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    {/* Select Organization */}
    <select
      className="p-2 border rounded"
      value={selectedOrgId}
      onChange={(e) => setSelectedOrgId(e.target.value)}
    >
      <option value="">Select Organization</option>
      {organizations.map((org) => (
        <option key={org.id} value={org.id}>
          {org.orgName}
        </option>
      ))}
    </select>

    {/* Select User */}
    <select
      className="p-2 border rounded"
      value={selectedUserId}
      onChange={(e) => setSelectedUserId(e.target.value)}
    >
      <option value="">Select User</option>
      {users.map((user) => (
        <option key={user.id} value={user.id}>
          {user.fullName}
        </option>
      ))}
    </select>

    {/* Assign Button */}
    <button
      onClick={handleAssignAdmin}
      disabled={!selectedOrgId || !selectedUserId}
      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
    >
      Assign Admin
    </button>
  </div>
</div>

      </div>
    </div>
    </AdminLayout>
  );
}
