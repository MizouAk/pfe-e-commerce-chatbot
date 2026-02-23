import './Navbar.css';
import { Link } from 'react-router-dom'; // Import React Router Link

import SearchIcon from '../Component/Icones';
import Button from '../Component/Buttons';
import { navLinks } from '../Component/Links';
import { useState } from 'react';
import { MenuIcon } from '../Component/Icones';
import { PanierIcon } from '../Component/Icones';
import AuthModal from './AuthModal';
import { useCart } from "../Context/CartContex";
import { useNavigate } from "react-router-dom";

function Navbar() {
    const [showMenu, setShowMenu] = useState(false);
    const [showAuth, setShowAuth] = useState(false);
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    const { cartCount } = useCart();
    const navigate = useNavigate();
    return (
        <nav>
            <Link to="/" className="logo">
                <h1>Snow<span className='nav-subtitle'>Games</span></h1>
            </Link>
            <div className="catalog-search">
                <input type="text" placeholder='recherche' className='catalog-input' />
                <button className="catalog-btn">  <SearchIcon /></button>
            </div>
            <div className="user-actions">
                <div className="action-item1">

                    {!token ? (
                        <Button name="SE CONNECTER" onClick={() => setShowAuth(true)} />
                    ) : (
                        <span className="user-name">👋 {user.name}</span>
                    )}

                    {token && (
                        <button className="logout-btn" onClick={() => {
                            localStorage.removeItem("token");
                            localStorage.removeItem("user");
                            window.location.reload();
                        }}>
                            Logout
                        </button>
                    )}

                </div>

                <div className="action-item2" onClick={() => navigate("/cart")}>
                    <Button name={<PanierIcon />} />
                    {cartCount > 0 && (
                        <span className="cart-badge">{cartCount}</span>
                    )}
                </div>
            </div>

            {showMenu &&
                <ul className='ulNavbar'>
                    {navLinks.map(link => (
                        <li key={link.title}>
                            <Link to={link.path}>{link.title}</Link> {/* Navigation m3a Link */}
                        </li>
                    ))}
                </ul>
            }
            <div>
                <Button className="menuIcon" name={<MenuIcon />}
                    onClick={() => {
                        setShowMenu(!showMenu)
                    }}
                />
            </div>
            {showAuth && <AuthModal close={() => setShowAuth(false)} />}

        </nav>

    );
}
export default Navbar;