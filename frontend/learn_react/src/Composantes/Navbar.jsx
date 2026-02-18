import './Navbar.css';
import { Link } from 'react-router-dom'; // Import React Router Link

import SearchIcon from '../Component/Icones';
import Button from '../Component/Buttons';
import { navLinks } from '../Component/Links';
import { useState } from 'react';
import { MenuIcon } from '../Component/Icones';
import { PanierIcon } from '../Component/Icones';
import AuthModal from './AuthModal';

function Navbar() {
    const [showMenu, setShowMenu] = useState(false);
    const [showAuth, setShowAuth] = useState(false);

    return (
        <nav>
            <h1>Snow<span className='nav-subtitle'>Games</span></h1>
            <div className="catalog-search">
                <input type="text" placeholder='recherche' className='catalog-input' />
                <button className="catalog-btn">  <SearchIcon /></button>
            </div>
            <div className="user-actions">
                <div className="action-item1">
                    <Button name="SE CONNECTER" onClick={() => setShowAuth(true)} />
                </div>

                <div className="action-item2">
                    <Button name={<PanierIcon />} />
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
        
    );}
export default Navbar;