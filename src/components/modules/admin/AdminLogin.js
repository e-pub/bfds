import React, { useState } from "react";

const API_BASE_URL = "https://your-cloudflare-workers-url/";

const loginAdmin = async (username, password) => {
  const response = await fetch(`${API_BASE_URL}verify-admin-code`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  return response.json();
};

const AdminLogin = ({ setIsAdmin }) => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    const result = await loginAdmin(credentials.username, credentials.password);
    if (result.token) {
      localStorage.setItem("adminToken", result.token);
      setIsAdmin(true);
      alert("Logged in successfully!");
    } else {
      setMessage(result.message || "Invalid credentials!");
    }
  };

  return (
    <div>
      <h2>Admin Login</h2>
      <input type="text" name="username" placeholder="Username" value={credentials.username} onChange={handleChange} />
      <input type="password" name="password" placeholder="Password" value={credentials.password} onChange={handleChange} />
      <button onClick={handleLogin}>Login</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AdminLogin;
