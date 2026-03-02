// Navbar.jsx
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import SearchIcon, { MenuIcon, PanierIcon } from "../Component/Icones";
import Button from "../Component/Buttons";
import { navLinks } from "../Component/Links";
import { useState } from "react";
import AuthModal from "./AuthModal";
import { useCart } from "../Context/CartContext";

function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const isAdmin = user?.role === "admin";
  const isClient = user?.role === "client";

  const [q, setQ] = useState("");
  const { cartCount } = useCart();
  const navigate = useNavigate();

  const closeUserMenu = () => setShowUserMenu(false);

  const goTo = (path) => {
    closeUserMenu();
    navigate(path);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("auth-changed"));
    closeUserMenu();
    navigate("/");
  };

  return (
    <nav>
      <Link to="/" className="logo">
        <h1>
          Snow<span className="nav-subtitle">Games</span>
        </h1>
      </Link>

      <div className="catalog-search">
        <input
          type="text"
          placeholder="recherche"
          className="catalog-input"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter")
              navigate(`/shop?search=${encodeURIComponent(q)}`);
          }}
        />
        <button
          className="catalog-btn"
          onClick={() => navigate(`/shop?search=${encodeURIComponent(q)}`)}
        >
          <SearchIcon />
        </button>
      </div>

      <div className="user-actions">
        <div className="action-item1">
          {!token ? (
            <Button name="SE CONNECTER" onClick={() => setShowAuth(true)} />
          ) : (
            <div className="user-menu">
              <button
                className="user-menu-btn"
                type="button"
                onClick={() => setShowUserMenu((s) => !s)}
              >
                👋 {user?.name} ▾
              </button>

              {showUserMenu && (
                <div className="user-dropdown">
                  {/* ✅ PROFILE: للـ admin و client */}
                  <button type="button" onClick={() => goTo("/profile")}>
                    Mon profil
                  </button>

                  {/* ✅ CLIENT فقط */}
                  {isClient && (
                    <button type="button" onClick={() => goTo("/orders")}>
                      Mes commandes
                    </button>
                  )}

                  {/* ✅ ADMIN فقط */}
                  {isAdmin && (
                    <button type="button" onClick={() => goTo("/admin")}>
                      Admin panel
                    </button>
                  )}

                  <hr />

                  <button type="button" onClick={logout}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ✅ Cart غير للـ CLIENT */}
        {token && isClient && (
          <div className="action-item2" onClick={() => navigate("/cart")}>
            <Button name={<PanierIcon />} />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </div>
        )}
      </div>

      {showMenu && (
        <ul className="ulNavbar">
          {navLinks.map((link) => (
            <li key={link.title}>
              <Link to={link.path}>{link.title}</Link>
            </li>
          ))}
        </ul>
      )}

      <div>
        <Button
          className="menuIcon"
          name={<MenuIcon />}
          onClick={() => setShowMenu(!showMenu)}
        />
      </div>

      {showAuth && <AuthModal close={() => setShowAuth(false)} />}
    </nav>
  );
}

export default Navbar;