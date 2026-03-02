// AdminProductForm.jsx
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { apiFetch } from "../../api/apiFetch";
import "./AdminProductForm.css";

function AdminProductForm({ mode }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = mode === "edit";

  const [categories, setCategories] = useState([]);
  const [loadingCats, setLoadingCats] = useState(true);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category_id: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [currentImageUrl, setCurrentImageUrl] = useState("");

  // categories
  useEffect(() => {
    apiFetch("/categories")
      .then((res) => {
        const list = res?.data || [];
        setCategories(Array.isArray(list) ? list : []);
        if (!isEdit && list.length) {
          setForm((f) => ({ ...f, category_id: String(list[0].id) }));
        }
      })
      .catch((e) => setError(e.message || "Erreur categories"))
      .finally(() => setLoadingCats(false));
  }, [isEdit]);

  // load product for edit
  useEffect(() => {
    if (!isEdit) return;

    apiFetch(`/admin/products/${id}`)
      .then((res) => {
        const p = res?.data ?? res;
        setForm({
          name: p?.name || "",
          description: p?.description || "",
          price: p?.price ?? "",
          stock: p?.stock ?? "",
          category_id: String(p?.category_id || ""),
        });
        setCurrentImageUrl(p?.image_url || "");
      })
      .catch((e) => setError(e.message || "Erreur produit"));
  }, [isEdit, id]);

  const onChange = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name.trim()) return setError("Name obligatoire");
    if (!form.category_id) return setError("Category obligatoire");
    if (form.price === "" || Number(form.price) < 0) return setError("Price غير صحيح");
    if (form.stock === "" || Number(form.stock) < 0) return setError("Stock غير صحيح");

    // فـ create: إذا ما عطاش image ماشي مشكل (nullable)
    // ولكن الأفضل تخليه يختار صورة
    const fd = new FormData();
    fd.append("category_id", String(form.category_id));
    fd.append("name", form.name);
    fd.append("description", form.description || "");
    fd.append("price", String(form.price));
    fd.append("stock", String(form.stock));

    if (imageFile) fd.append("image", imageFile);

    setSaving(true);
    try {
      if (isEdit) {
        // Laravel: _method=PUT و POST
        fd.append("_method", "PUT");
        await apiFetch(`/admin/products/${id}`, { method: "POST", body: fd });
      } else {
        await apiFetch("/admin/products", { method: "POST", body: fd });
      }

      navigate("/admin/products");
    } catch (e2) {
      setError(e2.message || "Erreur save");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="apf">
      <div className="apf-head">
        <div>
          <h1 className="apf-title">{isEdit ? "Edit Product" : "Add Product"}</h1>
          <p className="apf-sub">Admin panel</p>
        </div>
        <Link className="apf-back" to="/admin/products">← Back</Link>
      </div>

      {error && <div className="apf-error">{error}</div>}

      <form className="apf-form" onSubmit={handleSubmit}>
        <div className="apf-grid">
          <div className="apf-field">
            <label>Name</label>
            <input value={form.name} onChange={onChange("name")} />
          </div>

          <div className="apf-field">
            <label>Category</label>
            <select
              value={form.category_id}
              onChange={onChange("category_id")}
              disabled={loadingCats}
            >
              {loadingCats ? (
                <option>Loading...</option>
              ) : (
                categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))
              )}
            </select>
          </div>

          <div className="apf-field">
            <label>Price (DH)</label>
            <input type="number" min="0" value={form.price} onChange={onChange("price")} />
          </div>

          <div className="apf-field">
            <label>Stock</label>
            <input type="number" min="0" value={form.stock} onChange={onChange("stock")} />
          </div>

          <div className="apf-field apf-wide">
            <label>Description</label>
            <textarea rows="5" value={form.description} onChange={onChange("description")} />
          </div>

          <div className="apf-field apf-wide">
            <label>Image (Upload)</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            />
            {isEdit && currentImageUrl && (
              <div className="apf-preview">
                <img className="apf-img" src={currentImageUrl} alt="current" />
              </div>
            )}
          </div>
        </div>

        <div className="apf-actions">
          <button className="apf-save" type="submit" disabled={saving}>
            {saving ? "..." : isEdit ? "Save changes" : "Create product"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AdminProductForm;