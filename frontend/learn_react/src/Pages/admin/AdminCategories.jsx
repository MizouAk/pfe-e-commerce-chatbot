// AdminCategories.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiFetch } from "../../api/apiFetch";
import { useToast } from "../../Context/ToastContext";
import "./AdminCategories.css";

function AdminCategories() {
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const { confirm: confirmBox, show } = useToast();

  const load = async () => {
    setLoading(true);
    setErr("");
    try {
      // public route: GET /api/categories
      const res = await apiFetch("/categories");
      const list = res?.data || res || [];
      setCats(Array.isArray(list) ? list : []);
    } catch (e) {
      setErr(e.message || "Erreur");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id) => {
    const ok = await confirmBox("Supprimer cette catégorie ?");
    if (!ok) return;

    try {
      await apiFetch(`/admin/categories/${id}`, { method: "DELETE" });
      await load();
    } catch (e) {
      show(e.message || "Erreur suppression", { type: "error" });
    }
  };

  return (
    <div className="acats">
      <div className="acats-head">
        <h1 className="acats-title">Categories</h1>
        <Link className="acats-add" to="/admin/categories/new">
          + Add Category
        </Link>
      </div>

      {loading && <p>Loading...</p>}
      {err && <p className="acats-error">{err}</p>}

      {!loading && !err && cats.length === 0 && <p>Aucune catégorie.</p>}

      {!loading && !err && cats.length > 0 && (
        <div className="acats-table">
          <div className="acats-row acats-th">
            <div>ID</div>
            <div>Name</div>
            <div>Actions</div>
          </div>

          {cats.map((c) => (
            <div className="acats-row acats-tr" key={c.id}>
              <div>{c.id}</div>
              <div className="acats-name">{c.name}</div>

              <div className="acats-actions">
                <Link className="acats-edit" to={`/admin/categories/${c.id}/edit`}>
                  Edit
                </Link>
                <button className="acats-del" onClick={() => handleDelete(c.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminCategories;