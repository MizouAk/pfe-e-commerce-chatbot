// apiFetch.jsx
// base url is configurable via environment variable
const API_BASE = process.env.REACT_APP_API_BASE || "http://127.0.0.1:8000/api";

export async function apiFetch(path, options = {}) {
  const token = localStorage.getItem("token");

  const headers = {
    Accept: "application/json",
    ...(options.headers || {}),
  };

  // إلا كنصيفط JSON
  if (options.body && !(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  // Authorization إذا كاين token
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  // حاول نقرا JSON إذا كاين
  let data = null;
  const text = await res.text();
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text || null;
  }

  // إلا خطأ
  if (!res.ok) {
    const message =
      (data && data.message) ||
      (typeof data === "string" ? data : null) ||
      `HTTP Error ${res.status}`;
    const error = new Error(message);
    error.status = res.status;
    error.data = data;
    throw error;
  }

  return data;
}