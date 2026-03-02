// AdminRoute.jsx
import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  if (!token || !user) return <Navigate to="/" />;
  if (user.role !== "admin") return <Navigate to="/" />;

  return children;
}

export default AdminRoute;