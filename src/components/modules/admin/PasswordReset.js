import React, { useState } from "react";

const API_BASE_URL = "https://your-cloudflare-workers-url/";

const resetPassword = async (password, confirmPassword) => {
  const response = await fetch(`${API_BASE_URL}reset-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password, confirmPassword }),
  });

  return response.json();
};

const PasswordResetPopup = ({ closePopup }) => {
  const [passwords, setPasswords] = useState({ password: "", confirmPassword: "" });

  const handleChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwords.password !== passwords.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const result = await resetPassword(passwords.password, passwords.confirmPassword);
    if (result.message === "비밀번호 변경 성공!") {
      alert("Password reset successful!");
      closePopup();
    } else {
      alert("비밀번호 변경 실패: " + result.message);
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <label>
          New Password:
          <input type="password" name="password" onChange={handleChange} required />
        </label>
        <label>
          Confirm Password:
          <input type="password" name="confirmPassword" onChange={handleChange} required />
        </label>
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default PasswordResetPopup;
