import { useState } from "react";
import { apiFetch } from "../api/apiFetch";
import "./Profile.css";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const [name, setName] = useState(user?.name || "");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const res = await apiFetch("/user/settings", {
        method: "PUT",
        body: JSON.stringify({ name, password }),
      });

      setMessage("Informations mises à jour ✔");
      localStorage.setItem("user", JSON.stringify(res.user));
    } catch (err) {
      setMessage("Erreur ❌");
    }
  };

  return (
    <div className="profile-page">
      <h1>Mon Profil</h1>

      <form className="profile-form" onSubmit={handleUpdate}>
        <label>Nom</label>
        <input value={name} onChange={(e) => setName(e.target.value)} />

        <label>Email</label>
        <input value={user?.email} disabled />

        <label>Nouveau mot de passe</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Mettre à jour</button>
      </form>

      {message && <p className="profile-message">{message}</p>}
    </div>
  );
}

export default Profile;