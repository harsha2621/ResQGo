// import React, { useEffect, useState } from "react";
// import axios from "axios";

// export default function UserForm() {
//   const [users, setUsers] = useState([]);
//   const [userData, setUserData] = useState({
//     fullName: "",
//     email: "",
//     password: "",
//     contactNo: "",
//     role: "USER"
//   });

//   const [editingId, setEditingId] = useState(null);

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     try {
//       const res = await axios.get("http://localhost:8080/api/user/all");
//       setUsers(res.data);
//     } catch (err) {
//       console.error("Failed to fetch users", err);
//     }
//   };

//   const handleChange = (e) => {
//     setUserData({ ...userData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (editingId) {
//         await axios.put(`http://localhost:8080/api/user/${editingId}`, userData);
//         alert("✅ User updated");
//       } else {
//         await axios.post("http://localhost:8080/api/user/register", userData);
//         alert("✅ User added");
//       }

//       setUserData({ fullName: "", email: "", password: "", contactNo: "", role: "USER" });
//       setEditingId(null);
//       fetchUsers();
//     } catch (err) {
//       console.error("Error saving user", err);
//     }
//   };

//   const handleEdit = (user) => {
//     setUserData({
//       fullName: user.fullName,
//       email: user.email,
//       password: "", // don’t show old password
//       contactNo: user.contactNo,
//       role: user.role
//     });
//     setEditingId(user.id);
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this user?")) {
//       try {
//         await axios.delete(`http://localhost:8080/api/user/${id}`);
//         fetchUsers();
//       } catch (err) {
//         console.error("Delete failed", err);
//       }
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto mt-10">
//       <h2 className="text-2xl font-bold mb-4">{editingId ? "Update" : "Add"} User</h2>
//       <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//         <input type="text" name="fullName" value={userData.fullName} onChange={handleChange} placeholder="Full Name" required className="p-2 border rounded" />
//         <input type="email" name="email" value={userData.email} onChange={handleChange} placeholder="Email" required className="p-2 border rounded" />
//         <input type="password" name="password" value={userData.password} onChange={handleChange} placeholder="Password" className="p-2 border rounded" />
//         <input type="text" name="contactNo" value={userData.contactNo} onChange={handleChange} placeholder="Contact No" required className="p-2 border rounded" />
//         <select name="role" value={userData.role} onChange={handleChange} className="p-2 border rounded">
//           <option value="USER">User</option>
//           <option value="ADMIN">Admin</option>
//         </select>
//         <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded col-span-2">{editingId ? "Update" : "Add"} User</button>
//       </form>

//       {/* User List */}
//       <table className="w-full text-left bg-white shadow rounded">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="p-2 border">Name</th>
//             <th className="p-2 border">Email</th>
//             <th className="p-2 border">Contact</th>
//             <th className="p-2 border">Role</th>
//             <th className="p-2 border">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((u) => (
//             <tr key={u.id} className="border-t">
//               <td className="p-2 border">{u.fullName}</td>
//               <td className="p-2 border">{u.email}</td>
//               <td className="p-2 border">{u.contactNo}</td>
//               <td className="p-2 border">{u.role}</td>
//               <td className="p-2 border flex gap-2">
//                 <button onClick={() => handleEdit(u)} className="bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
//                 <button onClick={() => handleDelete(u.id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
//               </td>
//             </tr>
//           ))}
//           {users.length === 0 && (
//             <tr>
//               <td colSpan="5" className="p-3 text-center">No users found.</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function UserForm() {
  const [users, setUsers] = useState([]);
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    password: "",
    contactNo: "",
    role: "USER"
  });

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/user/all");
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to fetch users", err);
    }
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/api/user/${editingId}`, userData);
      alert("✅ User updated");
      setUserData({ fullName: "", email: "", password: "", contactNo: "", role: "USER" });
      setEditingId(null);
      fetchUsers();
    } catch (err) {
      console.error("Error updating user", err);
    }
  };

  const handleEdit = (user) => {
    setUserData({
      fullName: user.fullName,
      email: user.email,
      password: "", // Do not show existing password
      contactNo: user.contactNo,
      role: user.role
    });
    setEditingId(user.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`http://localhost:8080/api/user/${id}`);
        fetchUsers();
      } catch (err) {
        console.error("Delete failed", err);
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-4">
      {editingId && (
        <>
          <h2 className="text-2xl font-bold mb-4">Update User</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <input type="text" name="fullName" value={userData.fullName} onChange={handleChange} placeholder="Full Name" required className="p-2 border rounded" />
            <input type="email" name="email" value={userData.email} onChange={handleChange} placeholder="Email" required className="p-2 border rounded" />
            <input type="password" name="password" value={userData.password} onChange={handleChange} placeholder="New Password" className="p-2 border rounded" />
            <input type="text" name="contactNo" value={userData.contactNo} onChange={handleChange} placeholder="Contact No" required className="p-2 border rounded" />
            <select name="role" value={userData.role} onChange={handleChange} className="p-2 border rounded">
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
            </select>
            <div className="flex gap-2 col-span-2">
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Update</button>
              <button type="button" onClick={() => { setEditingId(null); setUserData({ fullName: "", email: "", password: "", contactNo: "", role: "USER" }); }} className="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
            </div>
          </form>
        </>
      )}

      <h2 className="text-2xl font-bold mb-4">All Users</h2>
      <table className="w-full text-left bg-white shadow rounded">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Contact</th>
            <th className="p-2 border">Role</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-t">
              <td className="p-2 border">{u.fullName}</td>
              <td className="p-2 border">{u.email}</td>
              <td className="p-2 border">{u.contactNo}</td>
              <td className="p-2 border">{u.role}</td>
              <td className="p-2 border flex gap-2">
                <button onClick={() => handleEdit(u)} className="bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
                <button onClick={() => handleDelete(u.id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
              </td>
            </tr>
          ))}
          {users.length === 0 && (
            <tr>
              <td colSpan="5" className="p-3 text-center">No users found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
