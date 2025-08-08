import React, { useState } from "react";
import axios from "axios";

const UserRegistrationForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    aadhaarNumber: "",
    contactNumber: "",
    organizationId: "",
    role: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (formData.aadhaarNumber && !/^\d{12}$/.test(formData.aadhaarNumber)) {
      alert("Aadhaar number must be exactly 12 digits");
      return;
    }

    try {
      const payload = { ...formData };
      delete payload.confirmPassword;

      const response = await axios.post("http://localhost:8080/api/users", payload);
      alert("✅ User registered successfully!");
      console.log("Success:", response.data);
    } catch (error) {
      console.error("Registration error:", error);
      alert("❌ Registration failed!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>User Registration</h2>

      <input name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} />
      <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} />
      <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />
      <input name="aadhaarNumber" placeholder="Aadhaar Number" value={formData.aadhaarNumber} onChange={handleChange} />
      <input name="contactNumber" placeholder="Contact Number" value={formData.contactNumber} onChange={handleChange} />
      <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} />
      <input name="confirmPassword" type="password" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} />
      <input name="organizationId" placeholder="Organization ID" value={formData.organizationId} onChange={handleChange} />
      <input name="role" placeholder="Role" value={formData.role} onChange={handleChange} />

      <button type="submit">Register</button>
    </form>
  );
};

export default UserRegistrationForm;
