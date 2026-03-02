// AdminProducts.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiFetch } from "../../api/apiFetch";
import { useToast } from "../../Context/ToastContext";
import "./AdminProducts.css";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const { confirm: confirmBox, show } = useToast();

  const load = async () => {
    setLoading(true);
    setErr("");
    try {
      // نفس شكل /products: { success: true, data: { data: [...] } }
      const res = await apiFetch("/admin/products");
      const list = res?.data?.data || res?.data || [];
      setProducts(Array.isArray(list) ? list : []);
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
    const ok = await confirmBox("Supprimer ce produit ?");
    if (!ok) return;

    try {
      await apiFetch(`/admin/products/${id}`, { method: "DELETE" });
      // refresh
      await load();
    } catch (e) {
      show(e.message || "Erreur suppression", { type: "error" });
    }
  };

  return (
    <div className="admin-products">
      <div className="admin-products-head">
        <h1 className="admin-title">Products</h1>
        <Link className="admin-add-btn" to="/admin/products/new">
          + Add Product
        </Link>
      </div>

      {loading && <p>Loading...</p>}
      {err && <p className="admin-error">{err}</p>}

      {!loading && !err && products.length === 0 && (
        <p>Aucun produit.</p>
      )}

      {!loading && !err && products.length > 0 && (
        <div className="admin-table">
          <div className="admin-row admin-th">
            <div>ID</div>
            <div>Image</div>
            <div>Name</div>
            <div>Price</div>
            <div>Stock</div>
            <div>Actions</div>
          </div>

          {products.map((p) => (
            <div className="admin-row admin-tr" key={p.id}>
              <div>{p.id}</div>

              <div>
                <img
                  className="admin-img"
                  src={p.image_url || p.image || ""}
                  alt={p.name}
                />
              </div>

              <div className="admin-name">{p.name}</div>
              <div>{p.price} DH</div>
              <div>{p.stock}</div>

              <div className="admin-actions">
                <Link className="admin-edit" to={`/admin/products/${p.id}/edit`}>
                  Edit
                </Link>
                <button
                  className="admin-del"
                  onClick={() => handleDelete(p.id)}
                >
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

export default AdminProducts;