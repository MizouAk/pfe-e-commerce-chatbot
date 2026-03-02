// OrdersPage.jsx
import { useEffect, useState } from "react";
import { apiFetch } from "../api/apiFetch";
import Navbar from "../Composantes/Navbar";
import Footer from "../Composantes/Footer";
import { Link } from "react-router-dom";
import "./OrdersPage.css";

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    apiFetch("/orders")
      .then((res) => {
        // ✅ res ممكن يكون: {success:true, data:[...]} أو {success:true, data:{data:[...]}}
        const payload = res?.data ?? res;
        const list = payload?.data ?? payload;
        setOrders(Array.isArray(list) ? list : []);
      })
      .catch((err) => setError(err.message || "Erreur lors du chargement"));
  }, []);

  return (
    <>
      <Navbar />

      <div className="orders-page">
        <div className="orders-header">
          <h1 className="orders-title">Mes commandes</h1>
        </div>

        {error && <p className="orders-error">{error}</p>}

        {!error && orders.length === 0 && (
          <p className="orders-empty">Vous n’avez aucune commande pour le moment.</p>
        )}

        <div className="orders-list">
          {orders.map((order) => {
            const totalValue = order.total_price ?? order.total ?? 0;
            const st = String(order.status || "").trim().toLowerCase();

            return (
              <Link
                to={`/orders/${order.id}`}
                className="order-card"
                key={order.id}
              >
                <div className="order-row">
                  <span className="order-label">ID:</span>
                  <span className="order-value">{order.id}</span>
                </div>

                <div className="order-row">
                  <span className="order-label">Total:</span>
                  <span className="order-value">{totalValue} DH</span>
                </div>

                <div className="order-row">
                  <span className="order-label">Status:</span>
                  <span className={`order-status ${st || "default"}`}>
                    {order.status || "unknown"}
                  </span>
                </div>

                <div className="order-row">
                  <span className="order-label">Date:</span>
                  <span className="order-value">{order.created_at}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default OrdersPage;