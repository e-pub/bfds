import React, { useState } from "react";

const API_BASE_URL = "https://your-cloudflare-workers-url/";

const verifySmsCode = async (code) => {
  const response = await fetch(`${API_BASE_URL}verify-sms-code-member`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code }),
  });

  return response.json();
};

const SmsVerification = ({ nextStep }) => {
  const [code, setCode] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await verifySmsCode(code);
    result.message === "인증 성공" ? nextStep() : alert("인증 실패. 다시 시도하세요.");
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>SMS Verification</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Enter Code" value={code} onChange={(e) => setCode(e.target.value)} required />
          <button type="submit">Verify</button>
        </form>
      </div>
    </div>
  );
};

export default SmsVerification;
