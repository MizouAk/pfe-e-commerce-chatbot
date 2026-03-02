import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { apiFetch } from "../../api/apiFetch";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [products, setProducts] = useState([]);
  const [productsTotal, setProductsTotal] = useState(0);
  const [categories, setCategories] = useState([]);
  const [orders, setOrders] = useState([]);

  const normalizeList = (res) => {
    const payload = res?.data ?? res;
    const list = payload?.data ?? payload;
    // products ممكن يكون pagination: {data:[...]}
    if (list?.data && Array.isArray(list.data)) return list.data;
    return Array.isArray(list) ? list : [];
  };

  const load = async () => {
    setLoading(true);
    setErr("");
    try {
      const [pRes, cRes, oRes] = await Promise.all([
        apiFetch("/admin/products"),
        apiFetch("/categories"),
        apiFetch("/admin/orders"),
      ]);

      setProducts(normalizeList(pRes));
      // Extract total from paginated response: pRes.data.total (or fallback to data array length)
      const pTotal = pRes?.data?.total ?? normalizeList(pRes).length;
      setProductsTotal(pTotal);
      
      setCategories(normalizeList(cRes));
      setOrders(normalizeList(oRes));
    } catch (e) {
      setErr(e.message || "Erreur dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const stats = useMemo(() => {
    const totalOrders = orders.length;
    const pendingOrders = orders.filter(
      (o) => String(o.status || "").toLowerCase().trim() === "pending"
    ).length;

    return {
      totalProducts: productsTotal,
      totalCategories: categories.length,
      totalOrders,
      pendingOrders,
    };
  }, [productsTotal, categories, orders]);

  const latestOrders = useMemo(() => {
    // sort by created_at desc إذا كاين
    const copy = [...orders];
    copy.sort((a, b) => {
      const da = new Date(a.created_at || 0).getTime();
      const db = new Date(b.created_at || 0).getTime();
      return db - da;
    });
    return copy.slice(0, 5);
  }, [orders]);

  if (loading) return <p className="ad-loading">Loading...</p>;
  if (err) return <p className="ad-error">{err}</p>;

  return (
    <div className="ad">
      <div className="ad-head">
        <div>
          <h1 className="ad-title">Admin Dashboard</h1>
          <p className="ad-sub">Résumé rapide de votre boutique</p>
        </div>

        <div className="ad-actions">
          <Link className="ad-btn" to="/admin/products/new">+ Product</Link>
          <Link className="ad-btn" to="/admin/categories/new">+ Category</Link>
          <Link className="ad-btn ghost" to="/admin/orders">View Orders</Link>
        </div>
      </div>

      <div className="ad-grid">
        <div className="ad-card">
          <div className="ad-card-label">Products</div>
          <div className="ad-card-value">{stats.totalProducts}</div>
        </div>

        <div className="ad-card">
          <div className="ad-card-label">Categories</div>
          <div className="ad-card-value">{stats.totalCategories}</div>
        </div>

        <div className="ad-card">
          <div className="ad-card-label">Orders</div>
          <div className="ad-card-value">{stats.totalOrders}</div>
        </div>

        <div className="ad-card warn">
          <div className="ad-card-label">Pending</div>
          <div className="ad-card-value">{stats.pendingOrders}</div>
        </div>
      </div>

      <div className="ad-section">
        <div className="ad-section-head">
          <h2 className="ad-h2">Dernières commandes</h2>
          <Link className="ad-link" to="/admin/orders">Voir tout</Link>
        </div>

        {latestOrders.length === 0 ? (
          <p className="ad-muted">Aucune commande.</p>
        ) : (
          <div className="ad-table">
            <div className="ad-tr ad-th">
              <div>ID</div>
              <div>User</div>
              <div>Total</div>
              <div>Status</div>
              <div>Date</div>
            </div>

            {latestOrders.map((o) => {
              const st = String(o.status || "").trim().toLowerCase();
              const total = o.total_price ?? o.total ?? 0;
              return (
                <div className="ad-tr" key={o.id}>
                  <div>#{o.id}</div>
                  <div className="ad-user">
                    <div className="ad-user-name">{o.user?.name || "—"}</div>
                    <div className="ad-user-email">{o.user?.email || ""}</div>
                  </div>
                  <div>{total} DH</div>
                  <div><span className={`ad-badge ${st || "default"}`}>{st || "unknown"}</span></div>
                  <div>
                    {o.created_at ? new Date(o.created_at).toLocaleString("fr-FR") : "—"}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}