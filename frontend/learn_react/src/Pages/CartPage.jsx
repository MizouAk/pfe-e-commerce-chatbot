//CartPage.jsx
import { Link } from "react-router-dom";
import { useCart } from "../Context/CartContext";
import { useState } from "react";
import { apiFetch } from "../api/apiFetch";
import { useAuthUi } from "../Context/AuthUiContext";
import { getProductImage } from "../api/imageUrl";
import { useToast } from "../Context/ToastContext";

import "./CartPage.css";

function CartPage() {
    const { cart, removeFromCart, updateQty, clearCart } = useCart();
    const { openAuth } = useAuthUi();
    const { show } = useToast();
    const safeCart = Array.isArray(cart) ? cart : [];

    const getQty = (item) => Number(item.qty ?? item.quantity ?? 1);
    const getProduct = (item) => item.product ?? item.Product ?? null;

    const total = safeCart.reduce((sum, item) => {
        const p = getProduct(item);
        const price = Number(p?.price ?? 0);
        return sum + price * getQty(item);
    }, 0);
    const [showCheckout, setShowCheckout] = useState(false);
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [error, setError] = useState("");

    const openCheckout = () => {
        const token = localStorage.getItem("token");

        if (!token) {
            setError("")
            openAuth();   // ✅ يفتح AuthModal مباشرة
            return;
        }

        setError("");
        setShowCheckout(true);
    };

    const closeCheckout = () => {
        setShowCheckout(false);
    };

    const handleConfirm = async (e) => {
        e.preventDefault();

        if (!address.trim() || !phone.trim()) {
            setError("Adresse et Numero sont imporantes");
            return;
        }

        setError("");

        try {
            await apiFetch("/checkout", {
                method: "POST",
                body: JSON.stringify({ address, phone }),
            });

            show("✅ تم تأكيد الطلب!", { type: "success" });
            setShowCheckout(false);
            setAddress("");
            setPhone("");

            // ✅ إلا checkout نجح: نفرغ cart
            await clearCart();
        } catch (err) {
            setError(err.message || "وقع مشكل فـ تأكيد الطلب");
        }
    };

    if (safeCart.length === 0) {
        return (
            <div className="cart-page">
                <h1 className="cart-title">Mon Panier</h1>
                <p className="cart-empty">Votre panier est vide.</p>
                <Link to="/shop" className="cart-back"> Continuer les achats</Link>
            </div>
        );
    }

    return (
        <div className="cart-page">
            <div className="cart-empty-box">
                <h1 className="cart-title">Mon Panier</h1>
                <Link to="/shop" className="cart-back"> Continuer les achats</Link>
            </div>
            <div className="cart-table">
                <div className="cart-row cart-th">
                    <div>REMOVE</div>
                    <div>IMAGE</div>
                    <div>PRODUCT</div>
                    <div>PRICE</div>
                    <div>QUANTITY</div>
                    <div>SUBTOTAL</div>
                </div>

                {safeCart.map((item) => {
                    const product = getProduct(item);
                    const qty = getQty(item);
                    const price = Number(product?.price ?? 0);
                    const subtotal = price * qty;
                    const productId = item.product_id ?? item.productId ?? product?.id ?? item.id;

                    return (
                        <div className="cart-row cart-tr" key={productId}>
                            <div>
                                <button
                                    className="cart-remove"
                                    onClick={() => removeFromCart(productId)}
                                    title="Remove"
                                >
                                    🗑
                                </button>
                            </div>

                            <div>
                                <img className="cart-img" src={getProductImage(product)} alt={product?.name} />
                            </div>

                            <div className="cart-name">{product?.name}</div>

                            <div className="cart-price">{price} DH</div>

                            <div>
                                <input
                                    className="cart-qty"
                                    type="number"
                                    min="1"
                                    max={product?.stock ?? 999}
                                    value={qty}
                                    onChange={(e) => updateQty(productId, Number(e.target.value))}
                                />
                            </div>

                            <div className="cart-subtotal">{subtotal} DH</div>
                        </div>
                    );
                })}
            </div>

            <div className="cart-total">
                <span>Total</span>
                <span>{total} DH</span>
            </div>


            <div className="cart-actions">
                <button className="cart-checkout-btn" onClick={openCheckout}>
                    Confirmer la commande
                </button>
            </div>

            {showCheckout && (
                <div className="checkout-overlay" onClick={closeCheckout}>
                    <div className="checkout-modal" onClick={(e) => e.stopPropagation()}>
                        <h2 className="checkout-title">Confirmation de commande</h2>

                        <form onSubmit={handleConfirm} className="checkout-form">
                            <label className="checkout-label">
                                Adresse *
                                <input
                                    className="checkout-input"
                                    type="text"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    placeholder="ex: Hay ... Rue ... Ville ..."
                                    required
                                />
                            </label>

                            <label className="checkout-label">
                                Numéro (Téléphone) *
                                <input
                                    className="checkout-input"
                                    type="tel"
                                    inputMode="numeric"
                                    maxLength={10}   // ❗ مايفوتش 10
                                    value={phone}
                                    onChange={(e) => {
                                        const onlyNumbers = e.target.value.replace(/\D/g, "").slice(0, 10);
                                        setPhone(onlyNumbers);
                                    }}
                                    placeholder="ex: 06xxxxxxxx"
                                    required
                                />
                            </label>

                            {error && <p className="checkout-error">{error}</p>}

                            <div className="checkout-buttons">
                                <button type="button" className="checkout-cancel" onClick={closeCheckout}>
                                    Annuler
                                </button>
                                <button type="submit" className="checkout-confirm">
                                    Confirmer
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CartPage;