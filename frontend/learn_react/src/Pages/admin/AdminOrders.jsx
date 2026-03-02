import { useEffect, useState } from "react";
import { apiFetch } from "../../api/apiFetch";
import { useToast } from "../../Context/ToastContext";
import "./AdminOrders.css";

const STATUS = ["pending", "confirmed", "shipped", "delivered", "cancelled"];

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const { show } = useToast();

  const load = () => {
    setLoading(true);
    setError("");
    apiFetch("/admin/orders")
      .then((res) => {
        const payload = res?.data ?? res;
        const list = payload?.data ?? payload;
        setOrders(Array.isArray(list) ? list : []);
      })
      .catch((e) => setError(e.message || "Erreur"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await apiFetch(`/admin/orders/${id}/status`, {
        method: "POST",
        body: JSON.stringify({ status }),
      });
      load();
    } catch (e) {
      show(e.message || "Erreur update status", { type: "error" });
    }
  };

  if (loading) return <p className="admin-loading">Loading...</p>;
  if (error) return <p className="admin-error">{error}</p>;

  return (
    <div>
      <h1 className="admin-h1">Commandes (Admin)</h1>

      {orders.length === 0 ? (
        <p>Aucune commande.</p>
      ) : (
        <div className="admin-orders">
          {orders.map((o) => {
            const st = String(o.status || "").trim().toLowerCase();
            const total = o.total_price ?? o.total ?? 0;

            return (
              <div className="admin-order-card" key={o.id}>
                <div className="admin-order-top">
                  <div>
                    <div className="admin-order-id">Commande #{o.id}</div>
                    <div className="admin-order-sub">
                      User: {o.user?.name || "—"} ({o.user?.email || ""})
                    </div>
                  </div>

                  <div className={`badge ${st || "default"}`}>{st || "unknown"}</div>
                </div>

                <div className="admin-order-row">
                  <span>Total:</span>
                  <strong>{total} DH</strong>
                </div>

                <div className="admin-order-row">
                  <span>Date:</span>
                  <strong>
                    {o.created_at ? new Date(o.created_at).toLocaleString("fr-FR") : "—"}
                  </strong>
                </div>

                <div className="admin-order-row">
                  <span>Changer status:</span>
                  <select
                    value={st}
                    onChange={(e) => updateStatus(o.id, e.target.value)}
                    className="admin-select"
                  >
                    {STATUS.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}