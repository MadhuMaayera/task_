import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signup.css";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role_id: 1,
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, role_id } = formData;

    const payload = {
      name: name,
      email: email,
      password: password,
      role_id: parseInt(role_id),
    };

    try {
      const response = await fetch("http://localhost:3001/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.error === "Email already exists") {
          navigate("/login"); // Redirect to login if email exists
          return;
        }
        setError(errorData.error || "Registration failed");
        console.error("Error response from server:", errorData);
        return;
      }

      const data = await response.json();
      setSuccess("Registration successful!");
      console.log(data);
      navigate("/login");
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Role:</label>
          <select
            name="role_id"
            value={formData.role_id}
            onChange={handleChange}
          >
            <option value={1}>Employee</option>
            <option value={2}>Manager</option>
          </select>
        </div>
        <button type="submit">Sign Up</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      <p class="footer-text">Employee Leave Management System</p>
    </div>
  );
};

export default SignUp;
