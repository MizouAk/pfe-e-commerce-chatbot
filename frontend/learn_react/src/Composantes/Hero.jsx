
import './Hero.css'
import Button from '../Component/Buttons';

function Hero() {
    return (
        <section className="hero">
            <h1>
                Équipez-vous comme un <span className="hero-highlight">PRO</span>
            </h1>
            <p className="hero-subtitle">
                Découvrez notre sélection de PC Gamer et accessoires haut de gamme pour des performances optimales.
            </p>

            <div className="hero-actions">
                <button className="hero-btn hero-btn-primary">Voir les produits</button>
                <button className="hero-btn hero-btn-secondary">Nous contacter</button>
            </div>
        </section>
    );
}

export default Hero;
