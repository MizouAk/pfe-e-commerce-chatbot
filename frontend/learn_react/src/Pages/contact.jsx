// contact.jsx
import "./contact.css";
import Navbar from "../Composantes/Navbar";
import Footer from "../Composantes/Footer";

function Contact() {
  return (
    <>
    <Navbar />
    <div className="contact-page">
      <div className="contact-container">

        <div className="contact-info">
          <h1>Contactez-nous</h1>
          <p>
            Une question ? Un problème ?  
            Notre équipe SnowGames est là pour vous aider.
          </p>

          <ul>
            <li>📍 Paris, France</li>
            <li>📞 01 23 45 67 89</li>
            <li>✉️ contact@snowgames.com</li>
          </ul>
        </div>

        <form className="contact-form">
          <input type="text" placeholder="Nom complet" />
          <input type="email" placeholder="Adresse email" />
          <input type="text" placeholder="Sujet" />
          <textarea placeholder="Votre message"></textarea>

          <button type="submit">Envoyer le message</button>
        </form>

      </div>
    </div>
    <Footer />
    </>
  );
}

export default Contact;
