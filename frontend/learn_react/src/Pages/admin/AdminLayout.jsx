import { NavLink, Outlet, useNavigate } from "react-router-dom";
import Navbar from "../../Composantes/Navbar";
import Footer from "../../Composantes/Footer";
import "./AdminLayout.css";

export default function AdminLayout() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <div className="admin-wrap">
        <aside className="admin-side">
          <h2 className="admin-title">Admin Panel</h2>

          <NavLink to="/admin" end className="admin-link">
            Dashboard
          </NavLink>
          <NavLink to="/admin/products" className="admin-link">
            Produits
          </NavLink>
          <NavLink to="/admin/categories" className="admin-link">
            Catégories
          </NavLink>
          <NavLink to="/admin/orders" className="admin-link">
            Commandes
          </NavLink>

          <button className="admin-home" onClick={() => navigate("/")}>
            Retour au site
          </button>
        </aside>

        <main className="admin-main">
          <Outlet />
        </main>
      </div>

      <Footer />
    </>
  );
}