const API_BASE_URL = "https://your-cloudflare-workers-url/";

export async function loginAdmin(username, phone, password) {
  const response = await fetch(`${API_BASE_URL}verify-admin-code`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, phone, password }),
  });

  return response.json();
}

export async function registerUser(userData) {
  const response = await fetch(`${API_BASE_URL}register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  return response.json();
}

export async function verifySmsCodeMember(phone, code) {
  const response = await fetch(`${API_BASE_URL}verify-sms-code-member`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone, code }),
  });

  return response.json();
}
