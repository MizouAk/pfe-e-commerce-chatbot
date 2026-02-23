import { useState } from "react";
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
      const res = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      // 2) إلا فشل login
      if (!res.ok) {
        alert(data.message || "Login failed");
        return;
      }

      // 3) إلا نجح login: نخزن token و نسد modal
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      close();
    } catch (e) {
      setError("Une erreur est survenue lors de la connexion au serveur. Veuillez réessayer plus tard.");
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
      const res = await fetch("http://127.0.0.1:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          password_confirmation: confirmPassword, // ✅ مهم ل Laravel
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Register failed");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      close();
    } catch (e) {
      setError("Une erreur est survenue lors de la connexion au serveur. Veuillez réessayer plus tard.");
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
