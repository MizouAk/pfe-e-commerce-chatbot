import { Navigate } from "react-router-dom";

export default function ClientRoute({ children }) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  if (!token || !user) return <Navigate to="/" />;
  if (user.role !== "client") return <Navigate to="/" />; // admin ممنوع
  return children;
}