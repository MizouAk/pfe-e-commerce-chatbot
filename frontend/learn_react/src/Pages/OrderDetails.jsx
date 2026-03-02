// OrderDetails.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { apiFetch } from "../api/apiFetch";
import Navbar from "../Composantes/Navbar";
import Footer from "../Composantes/Footer";
import { useToast } from "../Context/ToastContext";
import "./OrderDetails.css";

function OrderDetails() {
    const { id } = useParams();
    const { confirm: confirmBox } = useToast();

    const [order, setOrder] = useState(null);
    const [error, setError] = useState("");

    const [cancelLoading, setCancelLoading] = useState(false);
    const [cancelError, setCancelError] = useState("");

    // ✅ helper باش نقراو response كيفما كان
    const normalizeOrder = (res) => res?.data ?? res;

    const loadOrder = async () => {
        setError("");
        try {
            const res = await apiFetch(`/orders/${id}`, { method: "GET" });
            setOrder(normalizeOrder(res));
        } catch (err) {
            setError(err.message || "Erreur lors du chargement");
        }
    };

    useEffect(() => {
        loadOrder();
        // eslint-disable-next-line
    }, [id]);

    const handleCancel = async () => {
        setCancelError("");

        const ok = await confirmBox("واش متأكد بغيتي تلغي هاد commande ؟");
        if (!ok) return;

        setCancelLoading(true);
        try {
            await apiFetch(`/orders/${id}/cancel`, { method: "POST" });
            // ✅ نعاودو نجيبو order باش يتبدل status
            await loadOrder();
        } catch (e) {
            setCancelError(e.message || "مشكلة فـ إلغاء الطلب");
        } finally {
            setCancelLoading(false);
        }
    };

    if (error) return <p>{error}</p>;
    if (!order) return <p>Loading...</p>;

    // ✅ status safe باش مايبقاش cancel يختافي بسبب case/space
    const statusSafe = String(order.status || "").trim().toLowerCase();
    const canCancel = statusSafe === "pending";

    // ✅ total safe (backend ممكن يرجع total ولا total_price)
    const totalValue = order.total_price ?? order.total ?? 0;

    return (
        <>
            <Navbar />

            <div className="order-details-page">
                <Link to="/orders" className="back-link">
                     Retour
                </Link>

                <h2>Commande #{order.id}</h2>

                <p>
                    Status:{" "}
                    <span className={`order-status ${statusSafe || "default"}`}>
                        {order.status || "unknown"}
                    </span>
                </p>
                <p>Total: {totalValue} DH</p>
                <p>
                    Date:{" "}
                    {new Date(order.created_at).toLocaleString("fr-FR", {
                        dateStyle: "medium",
                        timeStyle: "short",
                    })}
                </p>

                <h3>Produits:</h3>

                {order.items && order.items.map((item) => (
                    <div className="order-item" key={item.id}>
                        <p>{item.product?.name}</p>
                        <p>Quantité: {item.quantity}</p>
                        <p>Prix: {item.price} DH</p>
                    </div>
                ))}

                {cancelError && <p className="cancel-error">{cancelError}</p>}

                {canCancel && (
                    <button
                        className="cancel-btn"
                        onClick={handleCancel}
                        disabled={cancelLoading}
                    >
                        {cancelLoading ? "..." : "Annuler la commande"}
                    </button>
                )}
            </div>

            <Footer />
        </>
    );
}

export default OrderDetails;