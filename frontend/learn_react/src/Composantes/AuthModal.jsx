import { useState } from "react";
import "./AuthModal.css";

function AuthModal({ close }) {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="auth-overlay">
      <div className="auth-box">
        <button className="close-btn" onClick={close}>✖</button>

        <h2>{isLogin ? "Se connecter" : "Créer un compte"}</h2>

        {!isLogin && (
          <input type="text" placeholder="Nom complet" />
        )}

        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Mot de passe" />

        <button className="auth-btn">
          {isLogin ? "Connexion" : "Créer le compte"}
        </button>

        <p className="switch-text">
          {isLogin ? "Pas encore de compte ?" : "Déjà un compte ?"}
          <span onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? " Créer un compte" : " Se connecter"}
          </span>
        </p>
      </div>
    </div>
  );
}

export default AuthModal;
