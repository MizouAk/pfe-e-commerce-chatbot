/// Footer.jsx
import "./Footer.css";
import { navLinks } from "../Component/Links";
import { navCategory } from "../Component/Links";
import { useCategories } from "../Context/CategoriesContext";
import { Link } from "react-router-dom";
function Footer() {
    const { categories } = useCategories();
    return (
        <footer className="footer">
            <div className="footer-container">


                <div className="footer-col">
                    <h2 className="footer-logo">SnowGames</h2>
                    <p className="footer-desc">
                        Votre boutique spécialisée en accessoires PC Gaming.
                        Équipez-vous comme un pro avec notre sélection haut de gamme.
                    </p>
                </div>

                {/* Liens rapides */}
                <div className="footer-col">
                    <h3>Liens rapides</h3>
                    <ul>
                        {navLinks.map((link) => (
                            <li key={link.title}>
                                <a href={link.path}>{link.title}</a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Catégories */}
                <div className="footer-col footer-cat-col">
                    <h3>Catégories</h3>
                    <ul className="footer-categories">
                        {categories.map((c) => (
                            <li key={c.id}>
                                <Link to={`/shop?category_id=${c.id}`}>{c.name}</Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Contact */}
                <div className="footer-col">
                    <h3>Contact</h3>
                    <ul className="footer-contact">
                        <li>Email : contact@snowgames.com</li>
                        <li>Téléphone : 01 23 45 67 89</li>
                        <li>Adresse : Paris, France</li>
                        <li>Horaires : Lun–Ven 9h–18h</li>
                    </ul>
                </div>

            </div>

            <div className="footer-bottom">
                © {new Date().getFullYear()} SnowGames. Tous droits réservés.
            </div>
        </footer>
    );
}

export default Footer;
