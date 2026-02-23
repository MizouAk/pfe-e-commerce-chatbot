
import './Hero.css';
import { useNavigate } from "react-router-dom";
import Button from '../Component/Buttons';

function Hero() {
    const navigate = useNavigate();
    return (
        <section className="hero">
            <h1>
                Équipez-vous comme un <span className="hero-highlight">PRO</span>
            </h1>
            <p className="hero-subtitle">
                Découvrez notre sélection de PC Gamer et accessoires haut de gamme pour des performances optimales.
            </p>

            <div className="hero-actions">
                <Button name="Voir les produits" className="hero-btn hero-btn-primary" onClick={() => navigate("/shop")} />
                <Button name="contacter-Nous" className="hero-btn hero-btn-secondary" onClick={() => navigate("/contact")} />
            </div>
        </section>
    );
}

export default Hero;
