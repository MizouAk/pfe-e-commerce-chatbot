// AuthModal.jsx
import { useState } from "react";
import { apiFetch } from "../api/apiFetch";
import "./AuthModal.css";

function AuthModal({ close }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const login = async () => {
    setError("");
    setLoading(true);

    try {
      const data = await apiFetch("/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      window.dispatchEvent(new Event("auth-changed"));
      close();
    } catch (e) {
      // e.message جاية من apiFetch (message ديال Laravel ولا HTTP status)
      setError(e.message || "Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };




  const register = async () => {
    setError("");

    if (!name || !email || !password || !confirmPassword) {
      setError("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Le mot de passe et sa confirmation ne correspondent pas.");
      return;
    }

    setLoading(true);

    try {
      const data = await apiFetch("/register", {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          password,
          password_confirmation: confirmPassword,
        }),
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      window.dispatchEvent(new Event("auth-changed"));
      close();
    } catch (e) {
      setError(e.message || "Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };




  return (
    <div className="auth-overlay">
      <div className="auth-box">
        <button className="close-btn" onClick={close}>✖</button>

        <h2>{isLogin ? "Se connecter" : "Créer un compte"}</h2>

        {!isLogin && (
          <input type="text" placeholder="Nom complet" onChange={(e) => setName(e.target.value)} />
        )}

        <input type="email" placeholder="Email" onChange={(event) => setEmail(event.target.value)} />
        <input type="password" placeholder="Mot de passe" onChange={(event) => setPassword(event.target.value)} />
        {!isLogin && (
          <input type="password" placeholder="confirmer votre Mot de passe" onChange={(e) => setConfirmPassword(e.target.value)} />
        )}
        {error && <p className="auth-error">{error}</p>}
        <button className="auth-btn" onClick={isLogin ? login : register} disabled={loading}>
          {loading ? "..." : (isLogin ? "Connexion" : "Créer le compte")}
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
