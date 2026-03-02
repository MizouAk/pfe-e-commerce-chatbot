// AdminCategoryForm.jsx
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { apiFetch } from "../../api/apiFetch";
import "./AdminCategoryForm.css";

function AdminCategoryForm({ mode }) {
  const isEdit = mode === "edit";
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    if (!isEdit) return;

    // نجيبو category من GET /categories ثم نلقاوها بالـ id
    apiFetch("/categories")
      .then((res) => {
        const list = res?.data || [];
        const found = list.find((c) => String(c.id) === String(id));
        if (found) setName(found.name || "");
      })
      .catch((e) => setErr(e.message || "Erreur"));
  }, [isEdit, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");

    if (!name.trim()) return setErr("Name obligatoire");

    setSaving(true);
    try {
      if (isEdit) {
        await apiFetch(`/admin/categories/${id}`, {
          method: "PUT",
          body: JSON.stringify({ name }),
        });
      } else {
        await apiFetch("/admin/categories", {
          method: "POST",
          body: JSON.stringify({ name }),
        });
      }

      navigate("/admin/categories");
    } catch (e2) {
      setErr(e2.message || "Erreur save");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="acf">
      <div className="acf-head">
        <div>
          <h1 className="acf-title">{isEdit ? "Edit Category" : "Add Category"}</h1>
          <p className="acf-sub">Admin panel</p>
        </div>
        <Link className="acf-back" to="/admin/categories">← Back</Link>
      </div>

      {err && <div className="acf-error">{err}</div>}

      <form className="acf-form" onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Category name"
        />

        <button className="acf-save" disabled={saving}>
          {saving ? "..." : isEdit ? "Save changes" : "Create category"}
        </button>
      </form>
    </div>
  );
}

export default AdminCategoryForm;